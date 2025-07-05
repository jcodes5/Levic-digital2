
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const whereCondition: any = {
      status: 'PUBLISHED'
    }

    if (category && category !== 'All') {
      whereCondition.category = category
    }

    const portfolio = await prisma.portfolio.findMany({
      where: whereCondition,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        fullDescription: true,
        image: true,
        category: true,
        tags: true,
        client: true,
        duration: true,
        date: true,
        link: true,
        challenges: true,
        solutions: true,
        results: true,
        gallery: true,
        order: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    })

    // Parse JSON fields
    const formattedPortfolio = portfolio.map(item => ({
      ...item,
      tags: JSON.parse(item.tags || '[]'),
      challenges: JSON.parse(item.challenges || '[]'),
      solutions: JSON.parse(item.solutions || '[]'),
      results: JSON.parse(item.results || '[]'),
      gallery: JSON.parse(item.gallery || '[]'),
    }))

    return NextResponse.json(formattedPortfolio)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
