
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      description,
      fullDescription,
      image,
      category,
      tags,
      client,
      duration,
      date,
      link,
      challenges,
      solutions,
      results,
      gallery,
      status,
      order
    } = body

    // Check if slug already exists (excluding current item)
    if (slug) {
      const existingProject = await prisma.portfolio.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      })

      if (existingProject) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
      }
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        fullDescription,
        image,
        category,
        tags: JSON.stringify(tags || []),
        client,
        duration,
        date,
        link,
        challenges: JSON.stringify(challenges || []),
        solutions: JSON.stringify(solutions || []),
        results: JSON.stringify(results || []),
        gallery: JSON.stringify(gallery || []),
        status,
        order
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error updating portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.portfolio.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Portfolio item deleted successfully' })
  } catch (error) {
    console.error('Error deleting portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
  