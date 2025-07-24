"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Calendar, Tag, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ProjectModalProps {
  project: {
    title: string
    category: string
    description: string
    fullDescription: string
    image: string
    tags: string[]
    link: string
    date: string
    client: string
    duration: string
    challenges: string[]
    solutions: string[]
    results: string[]
    gallery: string[]
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>

              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400 backdrop-blur-sm">
                  {project.category}
                </Badge>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {project.date}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  {project.client}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {project.duration}
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">{project.fullDescription}</p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-yellow-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Challenges</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                          • {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-yellow-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Solutions</h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                          • {solution}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-yellow-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Results</h3>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                          • {result}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
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

              {project.gallery.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Project Gallery</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.gallery.map((image, i) => (
                      <img
                        key={i}
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} gallery ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-yellow-500/20"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
               <a
  href={
    project.link.startsWith("http")
      ? project.link
      : `https://${project.link}`
  }
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
    <ExternalLink className="h-4 w-4 mr-2" />
    View Live Project
  </Button>
</a>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white bg-transparent backdrop-blur-sm"
                  >
                    Contact Us About This Project
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
