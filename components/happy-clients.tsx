"use client"

import { motion } from "framer-motion"
import { GlassmorphismContainer } from "./enhanced-glassmorphism"

const clients = [
  { name: "TechStart Inc.", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Fashion Forward", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Green Solutions", logo: "/placeholder.svg?height=60&width=120" },
  { name: "BuildRight Construction", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Fusion Bistro", logo: "/placeholder.svg?height=60&width=120" },
  { name: "SecureNet Systems", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Digital Dynamics", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Creative Studios", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Smart Solutions", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Innovation Labs", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Future Tech", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Global Ventures", logo: "/placeholder.svg?height=60&width=120" },
]

export function HappyClients() {
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
              Trusted by leading brands and growing businesses worldwide
            </p>
          </GlassmorphismContainer>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <GlassmorphismContainer
                intensity="medium"
                rounded="xl"
                hover
                className="p-6 flex items-center justify-center h-24"
              >
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </GlassmorphismContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
