import { getPostBySlug, getAllPostSlugs } from "@/lib/prisma/blog"
import type { Metadata } from "next"
import BlogPostClientPage from "./BlogPostClientPage"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const slug = await params
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image ?? ""],
    },
  }
}




export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) return <div>Post not found</div>

  // 👇 map DB post to frontend-friendly shape
  const mappedPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author?.name || "Unknown",
    date: post.publishedAt?.toDateString() || post.createdAt.toDateString(),
    category: post.category,
    tags: Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags),
    image: post.image ?? "/placeholder.svg",
    readTime: post.readTime,
  }

  return <BlogPostClientPage post={mappedPost} />
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.map((post) => ({ slug: post.slug }))
}
