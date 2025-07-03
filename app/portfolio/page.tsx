"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, Tag, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectModal } from "@/components/project-modal"
import { EnhancedHappyClients } from "@/components/enhanced-happy-clients"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import Image from "next/image"
import Portfolio from "@/public/portfolio.jpg"


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

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = [
    {
      title: "E-commerce Platform for Fashion Brand",
      category: "Web Development",
      description: "Complete e-commerce solution with custom design, payment integration, and inventory management.",
      fullDescription:
        "We developed a comprehensive e-commerce platform for a leading fashion brand, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      date: "2024",
      client: "Fashion Forward Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Brand Identity for Tech Startup",
      category: "Branding",
      description: "Comprehensive brand identity including logo, color palette, typography, and brand guidelines.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Logo Design", "Brand Identity", "Print Design"],
      date: "2024",
      client: "Tech Startup Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Mobile App UI/UX Design",
      category: "UI/UX Design",
      description: "User-centered design for a fitness tracking mobile application with intuitive navigation.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Mobile Design", "Prototyping", "User Research"],
      date: "2023",
      client: "Mobile App Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Digital Marketing Campaign",
      category: "Digital Marketing",
      description: "Multi-platform marketing campaign that increased brand awareness by 300% and conversions by 150%.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Social Media", "PPC", "Content Marketing"],
      date: "2023",
      client: "Digital Marketing Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Corporate Website Redesign",
      category: "Web Development",
      description: "Modern, responsive website redesign for a consulting firm with improved user experience.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["WordPress", "SEO", "Responsive Design"],
      date: "2023",
      client: "Corporate Website Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Restaurant Brand Package",
      category: "Branding",
      description: "Complete branding package including logo, menu design, signage, and marketing materials.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Restaurant Branding", "Menu Design", "Signage"],
      date: "2022",
      client: "Restaurant Brand Ltd.",
      duration: "3 months",
      challenges: [
        "Complex product variations and sizing",
        "High-traffic handling during sales",
        "Multi-currency payment processing",
      ],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "SaaS Dashboard Design",
      category: "UI/UX Design",
      description: "Clean and intuitive dashboard design for a project management SaaS platform.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Dashboard Design", "Data Visualization", "SaaS"],
      date: "2022",
      client: "SaaS Dashboard Ltd.",
      duration: "3 months",
      challenges: ["Complex product variations and sizing", "High-traffic handling during sales"],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Cybersecurity Audit",
      category: "Cybersecurity",
      description:
        "Comprehensive security audit and implementation of security measures for a financial services company.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Security Audit", "Compliance", "Risk Assessment"],
      date: "2022",
      client: "Cybersecurity Ltd.",
      duration: "3 months",
      challenges: ["Complex product variations and sizing", "High-traffic handling during sales"],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
    {
      title: "Residential Architecture Project",
      category: "Architecture",
      description: "Modern residential design with sustainable features and innovative space planning.",
      fullDescription:
        "We developed a comprehensive brand identity for a tech startup, featuring a modern design, seamless user experience, and robust backend functionality. The platform includes advanced product filtering, wishlist functionality, secure payment processing, and real-time inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Residential Design", "3D Modeling", "Sustainable Design"],
      date: "2022",
      client: "Residential Architecture Ltd.",
      duration: "3 months",
      challenges: ["Complex product variations and sizing", "High-traffic handling during sales"],
      solutions: [
        "Implemented dynamic product configuration",
        "Optimized database queries and caching",
        "Integrated multiple payment gateways",
      ],
      results: [
        "300% increase in online sales",
        "50% reduction in cart abandonment",
        "99.9% uptime during peak seasons",
      ],
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      link: "#",
    },
  ]

  const categories = [
    "All",
    "Web Development",
    "Branding",
    "UI/UX Design",
    "Digital Marketing",
    "Cybersecurity",
    "Architecture",
  ]

  const openProject = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

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
                  🎨 100+ Successful Projects
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
                  Portfolio
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
                Explore our diverse range of{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">successful projects</span> and see
                how we've helped businesses{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">transform</span> their digital
                presence.
              </motion.p>

              {/* Project Categories */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  "Web Development & E-commerce",
                  "Branding & Visual Identity",
                  "UI/UX Design & Mobile Apps",
                  "Digital Marketing Campaigns",
                ].map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{category}</span>
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
                  { number: "100+", label: "Projects Completed" },
                  { number: "50+", label: "Happy Clients" },
                  { number: "98%", label: "Client Satisfaction" },
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
                    src={Portfolio}
                    alt="Our Portfolio"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Project Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-purple-600 dark:text-purple-400">UI/UX Design</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">User-Centered</div>
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
                        <ExternalLink className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-green-600 dark:text-green-400">Web Development</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Modern Solutions</div>
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
      </section>

      {/* Filter Categories */}
      <section className="py-10 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/60 dark:to-black/60 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-8 shadow-xl">
            <div className="flex flex-wrap justify-center gap-4">
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
                    variant={category === activeFilter ? "default" : "outline"}
                    onClick={() => setActiveFilter(category)}
                    className={
                      category === activeFilter
                        ? "bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black shadow-lg shadow-yellow-500/25 border border-yellow-400/30"
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
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border-yellow-500/30 overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
                          onClick={() => openProject(project)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400"
                        >
                          {project.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.date}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-yellow-500 dark:text-yellow-400">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/60 dark:to-black/60 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10 p-8 shadow-xl inline-block">
              <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Project Success Metrics</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <EnhancedHappyClients />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's create something amazing together. Contact us to discuss your project requirements.
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
            >
              Start Your Project Today
            </Button>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
