
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = {
      status: "PUBLISHED"
    }
    
    if (category && category !== "All") {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { tags: { contains: search, mode: "insensitive" } }
      ]
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { publishedAt: "desc" },
    })

    return NextResponse.json({
      posts: posts.map(post => ({
        ...post,
        tags: JSON.parse(post.tags),
        author: post.author.name || post.author.email
      }))
    })
  } catch (error) {
    console.error("Get blog posts error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
