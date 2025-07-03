"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SocialShare } from "@/components/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"

// Blog posts data (in a real app, this would come from a CMS or API)
const blogPosts = [
  {
    id: "digital-marketing-trends-2024",
    slug: "digital-marketing-trends-2024",
    title: "Top Digital Marketing Trends to Watch in 2024",
    excerpt:
      "Discover the latest digital marketing trends that will shape the industry in 2024, from AI-powered campaigns to voice search optimization.",
    content: `
      <h2>The Digital Marketing Landscape is Evolving</h2>
      <p>As we move through 2024, the digital marketing landscape continues to evolve at an unprecedented pace. Businesses that want to stay competitive must adapt to new technologies, changing consumer behaviors, and emerging platforms.</p>
      
      <h3>1. AI-Powered Marketing Automation</h3>
      <p>Artificial Intelligence is revolutionizing how we approach marketing automation. From predictive analytics to personalized content creation, AI is enabling marketers to deliver more targeted and effective campaigns.</p>
      
      <h3>2. Voice Search Optimization</h3>
      <p>With the growing popularity of voice assistants, optimizing for voice search has become crucial. This means focusing on conversational keywords and local SEO strategies.</p>
      
      <h3>3. Interactive Content</h3>
      <p>Interactive content such as polls, quizzes, and augmented reality experiences are driving higher engagement rates and providing valuable data insights.</p>
      
      <h3>4. Privacy-First Marketing</h3>
      <p>With increasing privacy regulations and the phase-out of third-party cookies, marketers are shifting towards first-party data strategies and privacy-compliant marketing practices.</p>
      
      <h2>Conclusion</h2>
      <p>Staying ahead of these trends will be crucial for businesses looking to maintain their competitive edge in 2024. The key is to remain adaptable and continuously test new strategies while maintaining a focus on providing value to your audience.</p>
    `,
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    category: "Digital Marketing",
    tags: ["Marketing", "Trends", "AI", "SEO"],
    image: "/placeholder.svg?height=400&width=800",
    readTime: "5 min read",
  },
  {
    id: "web-design-best-practices",
    slug: "web-design-best-practices",
    title: "Modern Web Design Best Practices for 2024",
    excerpt:
      "Learn about the essential web design principles that create engaging user experiences and drive conversions.",
    content: `
      <h2>Creating Exceptional User Experiences</h2>
      <p>Modern web design goes beyond aesthetics. It's about creating intuitive, accessible, and performant experiences that serve both users and business objectives.</p>
      
      <h3>1. Mobile-First Design</h3>
      <p>With mobile traffic accounting for over 50% of web usage, designing for mobile devices first ensures optimal experiences across all screen sizes.</p>
      
      <h3>2. Performance Optimization</h3>
      <p>Page speed directly impacts user experience and SEO rankings. Optimize images, minimize code, and leverage modern web technologies for faster loading times.</p>
      
      <h3>3. Accessibility Standards</h3>
      <p>Designing for accessibility ensures your website is usable by everyone, including users with disabilities. This includes proper color contrast, keyboard navigation, and screen reader compatibility.</p>
      
      <h3>4. Micro-Interactions</h3>
      <p>Subtle animations and feedback mechanisms enhance user engagement and provide visual cues that guide user behavior.</p>
      
      <h2>Implementation Tips</h2>
      <p>Start with user research, create wireframes, prototype interactions, and continuously test with real users to ensure your design decisions are data-driven.</p>
    `,
    author: "Mike Johnson",
    date: "Dec 12, 2024",
    category: "Web Design",
    tags: ["Design", "UX", "UI", "Best Practices"],
    image: "/placeholder.svg?height=400&width=800",
    readTime: "7 min read",
  },
  {
    id: "client-success-techstart",
    slug: "client-success-techstart",
    title: "Client Success Story: TechStart Inc. 300% Growth",
    excerpt:
      "How we helped TechStart Inc. achieve 300% growth through comprehensive digital marketing and web development.",
    content: `
      <h2>The Challenge</h2>
      <p>TechStart Inc. came to us with a promising product but limited online presence. They needed a complete digital transformation to reach their target audience and scale their business.</p>
      
      <h3>Initial Situation</h3>
      <p>When TechStart first approached us, they had:</p>
      <ul>
        <li>An outdated website with poor user experience</li>
        <li>Minimal social media presence</li>
        <li>Low search engine visibility</li>
        <li>No clear digital marketing strategy</li>
      </ul>
      
      <h3>Our Approach</h3>
      <p>We developed a comprehensive strategy that included:</p>
      <ul>
        <li>Complete website redesign and development</li>
        <li>SEO optimization and content strategy</li>
        <li>Social media marketing campaigns</li>
        <li>Paid advertising on Google and social platforms</li>
        <li>Email marketing automation</li>
      </ul>
      
      <h3>Results Achieved</h3>
      <p>Within 6 months of implementation, TechStart saw remarkable results:</p>
      <ul>
        <li>300% increase in website traffic</li>
        <li>250% growth in qualified leads</li>
        <li>180% increase in conversion rates</li>
        <li>400% growth in social media engagement</li>
      </ul>
      
      <h2>Key Takeaways</h2>
      <p>This success story demonstrates the power of a holistic digital marketing approach. By addressing all aspects of their online presence simultaneously, we were able to create synergies that amplified results across all channels.</p>
    `,
    author: "John Doe",
    date: "Dec 10, 2024",
    category: "Case Study",
    tags: ["Success Story", "Growth", "Client", "Results"],
    image: "/placeholder.svg?height=400&width=800",
    readTime: "6 min read",
  },
  // Add more blog posts here...
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostClientPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 backdrop-blur-xl relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-yellow-500 hover:text-yellow-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 p-8 md:p-12 shadow-2xl">
              <Badge className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400 mb-4">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                </div>
                <span>{post.readTime}</span>
              </div>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
                  />

                  <div
                    className="prose prose-lg max-w-none prose-headings:text-yellow-500 dark:prose-headings:text-yellow-400 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/20"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Share */}
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
                  <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 mb-8">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">Share this article</h3>
                      <SocialShare url={currentUrl} title={post.title} description={post.excerpt} layout="vertical" />
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4 text-yellow-500 dark:text-yellow-400">About the Author</h3>
                      <div className="flex items-center mb-4">
                        <img
                          src="/placeholder.svg?height=60&width=60"
                          alt={post.author}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-semibold text-yellow-500 dark:text-yellow-400">{post.author}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Digital Marketing Expert</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Passionate about helping businesses grow through innovative digital marketing strategies.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts currentPost={post} allPosts={blogPosts} />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-2xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 p-12 shadow-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25"
              >
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
