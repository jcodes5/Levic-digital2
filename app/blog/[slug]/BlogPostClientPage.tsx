"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { SocialShare } from "@/components/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[] | string; // Either array or JSON string
  image?: string;
  readTime: string;
};

interface BlogPostPageProps {
  post: BlogPost;
}

const getDefaultImage = () => "/placeholder.svg?height=400&width=800";

export default function BlogPostClientPage({ post }: BlogPostPageProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const postImage = post.image ?? getDefaultImage();

  // ✅ Ensure tags is always an array
  const tags: string[] = Array.isArray(post.tags)
    ? post.tags
    : JSON.parse(post.tags || "[]");

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-yellow-500 hover:text-yellow-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <div className="bg-white/30 dark:bg-black/30 rounded-3xl border border-white/40 dark:border-white/10 p-8 md:p-12 shadow-2xl">
              <Badge className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400 mb-4">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center"><User className="h-4 w-4 mr-2" />{post.author}</div>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{post.date}</div>
                <span>{post.readTime}</span>
              </div>

              <p className="text-xl text-gray-600 dark:text-gray-300">{post.excerpt}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img
                  src={postImage}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
                />

                <div
                  className="prose prose-lg max-w-none prose-headings:text-yellow-500 dark:prose-headings:text-yellow-400 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <div key={i} className="flex items-center text-sm bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-yellow-500/20">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <SocialShare url={currentUrl} title={post.title} description={post.excerpt} />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="sticky top-24"
              >
                <Card className="bg-white/60 dark:bg-white/5 mb-8">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">Share this article</h3>
                    <SocialShare url={currentUrl} title={post.title} description={post.excerpt} layout="vertical" />
                  </CardContent>
                </Card>

                <Card className="bg-white/60 dark:bg-white/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">About the Author</h3>
                    <div className="flex items-center mb-4">
                      <img src="/placeholder.svg?height=60&width=60" alt={post.author} className="w-12 h-12 rounded-full mr-3" />
                      <div>
                        <h4 className="font-semibold text-yellow-500 dark:text-yellow-400">{post.author}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Digital Marketing Expert</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Passionate about helping businesses grow through innovative digital strategies.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
     <RelatedPosts
  currentPost={{
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags),
    image: post.image ?? "/placeholder.svg", // ✅ ensure image is defined
  }}
  allPosts={[]}
/>



      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Let's discuss how we can help you achieve similar results.
            </p>
            <Link href="/contact">
              <Button className="bg-yellow-500/90 text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black shadow-lg">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
