"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Calendar, Tag } from "lucide-react"
import { GlassmorphismContainer } from "./enhanced-glassmorphism"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ClientProject {
  id: string
  clientName: string
  logo: string
  projectTitle: string
  description: string
  image: string
  category: string
  completedDate: string
  tags: string[]
  results: string[]
}

const clientProjects: ClientProject[] = [
  {
    id: "techstart-ecommerce",
    clientName: "TechStart Inc.",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "E-commerce Platform Development",
    description:
      "Complete e-commerce solution with modern design, payment integration, and inventory management system.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Web Development",
    completedDate: "2024",
    tags: ["React", "Node.js", "E-commerce", "Payment Integration"],
    results: ["300% increase in online sales", "50% reduction in cart abandonment", "99.9% uptime"],
  },
  {
    id: "fashion-forward-branding",
    clientName: "Fashion Forward",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "Complete Brand Identity Redesign",
    description: "Comprehensive rebranding including logo design, brand guidelines, and marketing materials.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Branding",
    completedDate: "2024",
    tags: ["Logo Design", "Brand Identity", "Marketing Materials"],
    results: ["200% increase in brand recognition", "150% growth in social media engagement"],
  },
  {
    id: "green-solutions-website",
    clientName: "Green Solutions",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "Sustainable Business Website",
    description: "Modern, eco-friendly website design with focus on sustainability and environmental impact.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Web Design",
    completedDate: "2023",
    tags: ["Sustainable Design", "WordPress", "SEO"],
    results: ["400% increase in organic traffic", "60% improvement in conversion rate"],
  },
  {
    id: "buildright-digital",
    clientName: "BuildRight Construction",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "Digital Marketing Campaign",
    description: "Comprehensive digital marketing strategy including SEO, social media, and paid advertising.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Digital Marketing",
    completedDate: "2023",
    tags: ["SEO", "Social Media", "PPC", "Content Marketing"],
    results: ["250% increase in leads", "180% growth in online visibility"],
  },
  {
    id: "fusion-bistro-app",
    clientName: "Fusion Bistro",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "Restaurant Mobile App",
    description: "Custom mobile app for online ordering, table reservations, and loyalty program management.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Mobile App",
    completedDate: "2023",
    tags: ["Mobile App", "UI/UX", "Restaurant Tech"],
    results: ["300% increase in online orders", "85% customer retention rate"],
  },
  {
    id: "securenet-audit",
    clientName: "SecureNet Systems",
    logo: "/placeholder.svg?height=60&width=120",
    projectTitle: "Cybersecurity Audit & Implementation",
    description: "Comprehensive security audit and implementation of advanced cybersecurity measures.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Cybersecurity",
    completedDate: "2022",
    tags: ["Security Audit", "Compliance", "Risk Assessment"],
    results: ["100% security compliance", "Zero security incidents post-implementation"],
  },
]

export function EnhancedHappyClients() {
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/60 dark:to-black/60 backdrop-blur-xl relative">
      <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-2xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlassmorphismContainer intensity="ultra" rounded="3xl" className="inline-block p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              Our Happy Clients
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trusted by leading brands and growing businesses worldwide. Click on any logo to see their project.
            </p>
          </GlassmorphismContainer>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {clientProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlassmorphismContainer
                intensity="medium"
                rounded="xl"
                hover
                className="p-6 flex items-center justify-center h-24 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.logo || "/placeholder.svg"}
                  alt={project.clientName}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </GlassmorphismContainer>
            </motion.div>
          ))}
        </div>

        {/* Project Preview Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.projectTitle}
                    className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedProject.logo || "/placeholder.svg"}
                      alt={selectedProject.clientName}
                      className="h-12 w-auto object-contain"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                        {selectedProject.clientName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedProject.projectTitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400">
                      {selectedProject.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedProject.completedDate}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="flex items-center text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/20"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Key Results:</h4>
                      <ul className="space-y-2">
                        {selectedProject.results.map((result, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                            • {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Project
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white bg-transparent backdrop-blur-sm"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
