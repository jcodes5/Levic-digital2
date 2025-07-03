import type { Metadata } from "next"
import BlogPostClientPage from "./BlogPostClientPage"

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClientPage params={params} />
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Levic Digital Agency Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}
