"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  ArrowRight,
  Smartphone,
  Palette,
  Monitor,
  Target,
  ImageIcon,
  Shield,
  Building,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import Services from "@/public/services.jpg"
import { FloatingElement } from "@/components/enhanced-glassmorphism"

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

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const serviceCategories = [
    "All",
    "Digital Marketing",
    "Branding & Creative Design",
    "Web Design & Development",
    "UI/UX Design",
    "Graphics Design",
    "Cybersecurity Solutions",
    "Architectural Design",
  ]

  const services = [
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to boost your online presence and drive growth.",
      services: [
        "Social Media Marketing",
        "Email Campaigns",
        "Search Engine Optimization (SEO)",
        "Paid Ads (Google, Facebook, Instagram)",
        "Content Marketing",
        "Analytics & Reporting",
      ],
      icon: Smartphone,
      features: [
        "Data-driven strategies",
        "ROI-focused campaigns",
        "Multi-platform expertise",
        "Continuous optimization",
      ],
    },
    {
      title: "Branding & Creative Design",
      description: "Create a memorable brand identity that resonates with your target audience.",
      services: [
        "Logo Design",
        "Brand Identity Development",
        "Corporate Stationery",
        "Marketing Collateral",
        "Brand Guidelines",
        "Rebranding Services",
      ],
      icon: Palette,
      features: [
        "Unique brand concepts",
        "Professional execution",
        "Comprehensive guidelines",
        "Market research-based",
      ],
    },
    {
      title: "Web Design & Development",
      description: "Modern, responsive websites that convert visitors into customers.",
      services: [
        "Responsive Websites",
        "E-commerce Platforms",
        "Landing Pages",
        "Website Management",
        "CMS Development",
        "Website Optimization",
      ],
      icon: Monitor,
      features: ["Mobile-first design", "SEO optimized", "Fast loading speeds", "Secure & scalable"],
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience and engagement.",
      services: [
        "App & Web Interfaces",
        "Prototyping & Wireframes",
        "User Experience Strategy",
        "Usability Testing",
        "Design Systems",
        "Interaction Design",
      ],
      icon: Target,
      features: ["User research-driven", "Intuitive interfaces", "Accessibility focused", "Conversion optimized"],
    },
    {
      title: "Graphics Design",
      description: "Eye-catching visual content that communicates your message effectively.",
      services: [
        "Social Media Content",
        "Print Designs",
        "Promotional Materials",
        "Infographics",
        "Presentation Design",
        "Digital Illustrations",
      ],
      icon: ImageIcon,
      features: ["Creative concepts", "Brand consistency", "High-quality output", "Quick turnaround"],
    },
    {
      title: "Cybersecurity Solutions",
      description: "Protect your digital assets with comprehensive security measures.",
      services: [
        "Website Security",
        "Data Protection Strategy",
        "Vulnerability Assessments",
        "Security Audits",
        "Compliance Consulting",
        "Incident Response",
      ],
      icon: Shield,
      features: ["Proactive monitoring", "Risk assessment", "Compliance ready", "24/7 support"],
    },
    {
      title: "Architectural Design",
      description: "Innovative architectural solutions for residential and commercial projects.",
      services: [
        "2D & 3D Designs",
        "Space Planning",
        "Visualization & Rendering",
        "Construction Documentation",
        "Interior Design",
        "Project Management",
      ],
      icon: Building,
      features: ["Sustainable design", "Cost-effective solutions", "Detailed planning", "Modern aesthetics"],
    },
  ]

  const filteredServices =
    selectedCategory === "All" ? services : services.filter((service) => service.title === selectedCategory)

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
                  🚀 Comprehensive Digital Solutions
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
                  Services
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
                Comprehensive digital solutions tailored to help your business{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">grow</span>,{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">transform</span>, and{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">succeed</span> in the digital
                landscape.
              </motion.p>

              {/* Service Categories */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  "Digital Marketing & SEO",
                  "Web Design & Development",
                  "Branding & Creative Design",
                  "UI/UX & Graphics Design",
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{service}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 group shadow-lg shadow-yellow-500/25 px-8 py-4 text-lg"
                    >
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
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
                    src={Services}
                    alt="Our Services"
                    className="w-full h-full object-cover mt-8"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Service Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Monitor className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">Web Development</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Modern Solutions</div>
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
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-green-600 dark:text-green-400">Digital Marketing</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Growth Focused</div>
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

      {/* Filter Categories */}
      <section className="py-10 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category, index) => (
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
                      ? "bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black shadow-lg shadow-yellow-500/25"
                      : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white dark:border-yellow-400 dark:text-yellow-400 backdrop-blur-sm bg-white/50 dark:bg-white/5"
                  }
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 h-full hover:border-yellow-500/40 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="p-3 bg-yellow-500/10 dark:bg-yellow-400/10 rounded-xl backdrop-blur-sm"
                      >
                        <service.icon className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Services Include:</h4>
                        <ul className="space-y-2">
                          {service.services.map((item, i) => (
                            <li key={i} className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <CheckCircle className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mr-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold mb-3 text-yellow-500 dark:text-yellow-400">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <CheckCircle className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-yellow-500/20">
                      <Link href="/contact">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 group shadow-lg shadow-yellow-500/25">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss your project requirements and create a customized solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25"
                  >
                    Start Your Project
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white dark:border-yellow-400 dark:text-yellow-400 bg-transparent backdrop-blur-sm"
                  >
                    View Our Work
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
