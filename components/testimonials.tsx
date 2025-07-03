"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { GlassmorphismContainer } from "./enhanced-glassmorphism"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Levic Digital Agency transformed our online presence completely. Their creative approach and technical expertise helped us increase our conversion rate by 300%. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Fashion Forward",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Working with Levic was a game-changer for our brand. They delivered a stunning website and comprehensive digital marketing strategy that exceeded our expectations.",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Green Solutions",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The team at Levic Digital Agency is incredibly professional and creative. They understood our vision and brought it to life with exceptional design and functionality.",
  },
  {
    name: "David Thompson",
    role: "Operations Manager",
    company: "BuildRight Construction",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Levic helped us establish a strong digital presence in the construction industry. Their architectural design services and web development skills are top-notch.",
  },
  {
    name: "Lisa Wang",
    role: "Restaurant Owner",
    company: "Fusion Bistro",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "From branding to digital marketing, Levic covered all our needs. Our restaurant's online orders increased by 250% after their campaign launch.",
  },
  {
    name: "James Miller",
    role: "CTO",
    company: "SecureNet Systems",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Their cybersecurity solutions and web development services provided us with a secure, scalable platform. Excellent work and ongoing support.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlassmorphismContainer intensity="heavy" rounded="3xl" className="inline-block p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </GlassmorphismContainer>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-white/30 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 h-full hover:border-yellow-500/40 transition-all duration-500 shadow-lg hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 dark:text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-500/20"
                    />
                    <div>
                      <h4 className="font-bold text-yellow-500 dark:text-yellow-400">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
