import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolios = await prisma.portfolio.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(portfolios)
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Safely look up the user from DB using session email
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
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

    // Check for duplicate slug
    const existing = await prisma.portfolio.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const portfolio = await prisma.portfolio.create({
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
        status: status || 'PUBLISHED',
        order: order || 0,
        authorId: dbUser.id, // ✅ This is now always valid
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

    return NextResponse.json(portfolio, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
