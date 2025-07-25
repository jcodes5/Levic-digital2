"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Award, Target, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Testimonials } from "@/components/testimonials"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import image from "next/image"  
import  Hero  from "@/public/hero.png"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

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

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-left space-y-8">
              {/* Badge */}
              <motion.div
                variants={fadeInLeft}
                className="inline-flex items-center px-4 py-2 mt-9 bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-500/20"
              >
                <span className="text-yellow-500 dark:text-yellow-400 text-sm font-medium">
                  🚀 Innovating Digital Excellence Since 2020
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
                  Innovating
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent"
                >
                  Growth.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="block bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                  Building Brands.
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInLeft}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
              >
                Full-service creative and tech-driven agency helping businesses{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">scale</span>,{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">transform</span>, and{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">stand out</span> in the digital
                space.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap gap-6 sm:gap-8"
              >
                {[
                  { number: "4+", label: "Years Experience" },
                  { number: "100+", label: "Projects Completed" },
                  { number: "50+", label: "Happy Clients" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-500 dark:text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 group shadow-lg shadow-yellow-500/25 px-8 py-4 text-lg"
                    >
                      Start Your Project
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/portfolio">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500 dark:border-yellow-400/50 dark:text-yellow-400 dark:hover:bg-yellow-400/10 dark:hover:border-yellow-400 bg-transparent backdrop-blur-sm px-8 py-4 text-lg group"
                    >
                      <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      View Our Work
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 border-2 border-white dark:border-black flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-semibold text-yellow-500 dark:text-yellow-400">Trusted by 50+ clients</div>
                  <div>across various industries</div>
                </div>
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
              {/* Main Image Container */}
              <div className="relative h-full">
                {/* Background Glassmorphism Card */}
                <div className="absolute inset-4 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl"></div>

                {/* Hero Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative h-full rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={Hero}
                    alt="Levic Digital Agency Team"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Achievement Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-green-600 dark:text-green-400">300% Growth</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Client Success</div>
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
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-600 dark:text-yellow-400">Award Winning</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Digital Agency</div>
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

        {/* Enhanced Floating Elements */}
        <FloatingElement
          size="sm"
          color="yellow"
          position={{ top: "10%", right: "5%" }}
          animation="float"
          delay={0}
          zIndex={1}
        />
        <FloatingElement
          size="md"
          color="blue"
          position={{ bottom: "20%", left: "3%" }}
          animation="pulse"
          delay={1}
          zIndex={1}
        />
        <FloatingElement
          size="xs"
          color="purple"
          position={{ top: "30%", left: "8%" }}
          animation="bounce"
          delay={2}
          zIndex={1}
        />
        <FloatingElement
          size="lg"
          color="green"
          position={{ bottom: "40%", right: "8%" }}
          animation="swing"
          delay={0.5}
          zIndex={1}
        />
      </section>

      {/* Quick About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Who We Are</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Founded in 2020, Levic Digital Agency has spent four years partnering with clients to deliver tailored
              digital solutions that drive real results in today's competitive digital landscape.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Vision",
                desc: "To be the go-to digital partner for African and global brands seeking to grow, thrive, and lead in the digital era.",
              },
              {
                icon: Award,
                title: "Our Mission",
                desc: "To deliver top-tier digital services that blend creativity, strategy, and innovation — empowering businesses to succeed with ease.",
              },
              {
                icon: Users,
                title: "Our Team",
                desc: "Creative professionals, developers, strategists, and problem-solvers committed to excellence and innovation.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 h-full hover:border-yellow-500/40 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <item.icon className="h-12 w-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
                  Learn More About Us
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Marketing",
                services: ["Social Media Marketing", "SEO", "Paid Advertising", "Email Campaigns"],
                icon: "📱",
              },
              {
                title: "Web Development",
                services: ["Responsive Websites", "E-commerce", "Web Applications", "Maintenance"],
                icon: "💻",
              },
              {
                title: "Branding & Design",
                services: ["Logo Design", "Brand Identity", "Marketing Materials", "Corporate Design"],
                icon: "🎨",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 h-full hover:border-yellow-500/40 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">{service.title}</h3>
                    <ul className="space-y-2">
                      {service.services.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
                  View All Services
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <Testimonials /> */}

      {/* CTA Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25 border border-yellow-400/30"
                  >
                    Get Started Today
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-600 dark:border-yellow-400/50 dark:text-yellow-400 bg-white/30 dark:bg-black/30 backdrop-blur-sm"
                  >
                    View Our Portfolio
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
