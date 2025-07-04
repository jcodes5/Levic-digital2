
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { 
        slug: params.slug,
        status: "PUBLISHED"
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags),
      author: post.author.name || post.author.email
    })
  } catch (error) {
    console.error("Get blog post error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
