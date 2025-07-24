// lib/prisma/blog.ts
import { prisma } from '@/lib/prisma'

export async function getPostBySlug(slug: string) {
 if (!slug) return null;
  return  prisma.post.findUnique({
    where: { slug },
    include: {
      author: true, // optional: if you want to show author name
    },
  })
}

export async function getAllPostSlugs() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
