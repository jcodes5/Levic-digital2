"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { OptimizedImage } from "@/components/optimized-image"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  readTime: string
}

interface BlogPostCardProps {
  post: BlogPost
  index: number
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border-yellow-500/30 overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full cursor-pointer">
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <OptimizedImage
                src={post.image || "/placeholder.svg?height=200&width=400"}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-500/90 text-white backdrop-blur-sm">{post.category}</Badge>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-yellow-500 dark:text-yellow-400 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <div key={i} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
