import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PostStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@levicdigital.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@levicdigital.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin)

  // Create sample blog posts
  const samplePosts = [
    {
      title: 'Top Digital Marketing Trends to Watch in 2024',
      slug: 'digital-marketing-trends-2024',
      excerpt: 'Discover the latest digital marketing trends that will shape the industry in 2024, from AI-powered campaigns to voice search optimization.',
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
      category: 'Digital Marketing',
      tags: JSON.stringify(['Marketing', 'Trends', 'AI', 'SEO']),
      status: PostStatus.PUBLISHED,
      readTime: '5 min read',
      authorId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: 'Modern Web Design Best Practices for 2024',
      slug: 'web-design-best-practices-2024',
      excerpt: 'Learn about the essential web design principles that create engaging user experiences and drive conversions.',
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
      category: 'Web Design',
      tags: JSON.stringify(['Design', 'UX', 'UI', 'Best Practices']),
      status: PostStatus.PUBLISHED,
      readTime: '7 min read',
      authorId: admin.id,
      publishedAt: new Date(),
    },
  ]

  for (const postData of samplePosts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }

  console.log('Sample posts created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })