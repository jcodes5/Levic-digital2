"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import Image from "next/image"
import Blog from "@/public/blog.jpg"

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const blogPosts = [
  {
    id: "digital-marketing-trends-2024",
    title: "Top Digital Marketing Trends to Watch in 2024",
    excerpt:
      "Discover the latest digital marketing trends that will shape the industry in 2024, from AI-powered campaigns to voice search optimization.",
    content: "Full blog content here...",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    category: "Digital Marketing",
    tags: ["Marketing", "Trends", "AI", "SEO"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "5 min read",
  },
  {
    id: "web-design-best-practices",
    title: "Modern Web Design Best Practices for 2024",
    excerpt:
      "Learn about the essential web design principles that create engaging user experiences and drive conversions.",
    content: "Full blog content here...",
    author: "Mike Johnson",
    date: "Dec 12, 2024",
    category: "Web Design",
    tags: ["Design", "UX", "UI", "Best Practices"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "7 min read",
  },
  {
    id: "client-success-techstart",
    title: "Client Success Story: TechStart Inc. 300% Growth",
    excerpt:
      "How we helped TechStart Inc. achieve 300% growth through comprehensive digital marketing and web development.",
    content: "Full blog content here...",
    author: "John Doe",
    date: "Dec 10, 2024",
    category: "Case Study",
    tags: ["Success Story", "Growth", "Client", "Results"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "6 min read",
  },
  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity Essentials for Small Businesses",
    excerpt: "Protect your business with these essential cybersecurity measures every small business should implement.",
    content: "Full blog content here...",
    author: "David Brown",
    date: "Dec 8, 2024",
    category: "Cybersecurity",
    tags: ["Security", "Business", "Protection", "Tips"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "8 min read",
  },
  {
    id: "branding-guide-2024",
    title: "Complete Guide to Brand Identity Design",
    excerpt:
      "Everything you need to know about creating a memorable brand identity that resonates with your target audience.",
    content: "Full blog content here...",
    author: "Jane Smith",
    date: "Dec 5, 2024",
    category: "Branding",
    tags: ["Branding", "Identity", "Design", "Guide"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "10 min read",
  },
  {
    id: "mobile-first-design",
    title: "Why Mobile-First Design is Crucial in 2024",
    excerpt: "Understanding the importance of mobile-first design approach and how it impacts user experience and SEO.",
    content: "Full blog content here...",
    author: "Lisa Davis",
    date: "Dec 3, 2024",
    category: "Web Design",
    tags: ["Mobile", "Design", "UX", "SEO"],
    image: "/placeholder.svg?height=200&width=400",
    readTime: "6 min read",
  },
]

const categories = ["All", "Digital Marketing", "Web Design", "Branding", "Cybersecurity", "Case Study"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-left space-y-8">
              {/* Badge */}
              <motion.div
                variants={fadeInLeft}
                className="inline-flex items-center px-4 py-2 bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-500/20"
              >
                <span className="text-yellow-500 dark:text-yellow-400 text-sm font-medium">
                  📝 Industry Insights & Success Stories
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInLeft}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="block bg-gradient-to-r from-black to-yellow-500 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent"
                >
                  Our
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent"
                >
                  Blog
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInLeft}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
              >
                Industry insights, company news, and{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">success stories</span> to help you
                stay ahead in the{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">digital world</span>.
              </motion.p>

              {/* Blog Categories */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  "Digital Marketing Strategies",
                  "Web Design & Development Tips",
                  "Client Success Stories",
                  "Industry Best Practices",
                ].map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-wrap gap-6 sm:gap-8 pt-4"
              >
                {[
                  { number: "50+", label: "Articles Published" },
                  { number: "10K+", label: "Monthly Readers" },
                  { number: "Weekly", label: "New Content" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-500 dark:text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              variants={fadeInRight}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative lg:h-[600px] xl:h-[700px]"
            >
              <div className="relative h-full">
                <div className="absolute inset-4 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl"></div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative h-full rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={Blog}
                    alt="Our Blog"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Blog Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">NEW</span>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">Latest Article</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Marketing Trends</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                    className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">10K+</span>
                      </div>
                      <div>
                        <div className="font-bold text-green-600 dark:text-green-400">Monthly Readers</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Growing Community</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/30"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400/20 backdrop-blur-md rounded-full border border-blue-400/30"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <FloatingElement size="lg" color="yellow" position={{ top: "15%", right: "8%" }} animation="float" delay={0} />
        <FloatingElement size="md" color="blue" position={{ bottom: "20%", left: "10%" }} animation="pulse" delay={1} />
        <FloatingElement size="sm" color="purple" position={{ top: "50%", left: "5%" }} animation="bounce" delay={2} />
        <FloatingElement
          size="xl"
          color="green"
          position={{ bottom: "30%", right: "15%" }}
          animation="swing"
          delay={0.5}
        />
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="w-full lg:w-1/2">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search articles, topics, or tags..."
                  className="w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={category === selectedCategory ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        category === selectedCategory
                          ? "bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black shadow-lg shadow-yellow-500/25"
                          : "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-600 dark:border-yellow-400/50 dark:text-yellow-400 backdrop-blur-sm bg-white/40 dark:bg-white/10"
                      }
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10 p-12 shadow-xl inline-block">
                <h3 className="text-2xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or category filter.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                  className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-2xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Stay Updated</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter and never miss our latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/50 dark:bg-white/10 border border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
              />
              <Button className="bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
