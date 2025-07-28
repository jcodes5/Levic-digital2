"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import Image from "next/image"
import Faq from "@/public/faq.jpg"

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

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "What services does Levic Digital Agency offer?",
      answer:
        "We offer a comprehensive range of digital services including Digital Marketing, Branding & Creative Design, Web Design & Development, UI/UX Design, Graphics Design, Cybersecurity Solutions, and Architectural Design. Each service is tailored to meet your specific business needs and goals.",
    },
    {
      question: "How long does it typically take to complete a project?",
      answer:
        "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a comprehensive branding project could take 6-8 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
    },
    {
      question: "Do you work with businesses of all sizes?",
      answer:
        "Yes! We work with startups, small businesses, medium enterprises, and large corporations. Our scalable solutions are designed to grow with your business, whether you're just starting out or looking to expand your digital presence.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on the scope, complexity, and timeline of your project. We offer competitive rates and provide detailed quotes after understanding your requirements. We also offer flexible payment plans to accommodate different budgets.",
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer:
        "We offer ongoing support and maintenance packages for websites, digital marketing campaigns, and other services. Our support includes regular updates, security monitoring, performance optimization, and technical assistance.",
    },
    {
      question: "Can you help with rebranding an existing business?",
      answer:
        "Yes, we specialize in rebranding projects. We help businesses refresh their brand identity, update their visual elements, and realign their messaging to better connect with their target audience while maintaining brand recognition.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes, while we're based in Abuja, Nigeria, we work with clients globally. We use modern communication tools and project management systems to ensure seamless collaboration regardless of location and time zones.",
    },
    {
      question: "What makes Levic Digital Agency different from other agencies?",
      answer:
        "Our unique combination of creativity, technical expertise, and personalized service sets us apart. We take a client-centric approach, offer affordable scalable solutions, and have a proven track record of delivering results that drive business growth.",
    },
    {
      question: "How do you ensure the security of client data and projects?",
      answer:
        "We take data security seriously. We implement industry-standard security measures, use secure communication channels, sign NDAs when required, and follow best practices for data protection throughout all our projects.",
    },
    {
      question: "Can you help with digital marketing strategy and implementation?",
      answer:
        "Yes, we provide comprehensive digital marketing services including strategy development, social media marketing, SEO, paid advertising, email campaigns, and analytics. We create data-driven strategies tailored to your business goals.",
    },
    {
      question: "Do you offer training or consultation services?",
      answer:
        "Yes, we offer training sessions and consultation services to help your team understand and manage digital tools, platforms, and strategies. We believe in empowering our clients with knowledge and skills.",
    },
    {
      question: "How do I get started with Levic Digital Agency?",
      answer:
        "Getting started is easy! Contact us through our website, email, or phone. We'll schedule a free consultation to discuss your needs, provide recommendations, and create a customized proposal for your project.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

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
                className="inline-flex items-center mt-9 px-4 py-2 bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-500/20"
              >
                <span className="text-yellow-500  dark:text-yellow-400 text-sm font-medium">
                  ❓ Common Questions Answered
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
                  Frequently
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent"
                >
                  Asked
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="block bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                  Questions
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
                Find answers to{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">common questions</span> about our
                services, processes, and how we can help your{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">business grow</span>.
              </motion.p>

              {/* FAQ Categories */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  "Services & Pricing Information",
                  "Project Timeline & Process",
                  "Support & Maintenance",
                  "Getting Started Guide",
                ].map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{category}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
              >
                <h3 className="font-semibold text-yellow-500 dark:text-yellow-400 mb-2">Still have questions?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Can't find what you're looking for? Get in touch with our team.
                </p>
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
                  >
                    Contact Us
                  </Button>
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
                  src={Faq} 
                  alt="FAQs" 
                  className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating FAQ Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Q&A</span>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">Quick Answers</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Common Questions</div>
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
                        <span className="text-white font-bold text-xs">24/7</span>
                      </div>
                      <div>
                        <div className="font-bold text-green-600 dark:text-green-400">Support Available</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Always Here to Help</div>
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

      {/* FAQs Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-gray-50/30 dark:from-black/30 dark:to-gray-900/30 backdrop-blur-xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-yellow-500/10 backdrop-blur-sm transition-colors rounded-t-lg"
                      >
                        <h3 className="text-lg font-semibold text-yellow-500 dark:text-yellow-400 pr-4">
                          {faq.question}
                        </h3>
                        {openFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        )}
                      </button>

                      {openFAQ === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm"
                        >
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/60 dark:to-black/60 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-2xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Can't find the answer you're looking for? Our team is here to help. Get in touch with us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-yellow-500/90 backdrop-blur-sm text-white hover:bg-yellow-600 dark:bg-yellow-400/90 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25 border border-yellow-400/30"
                  >
                    Contact Us
                  </Button>
                </Link>
                <Button
                      size="lg" 
                      onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2FER4kZW_w8w1w8w2w8w3w8w4w8w5w6w7w8w9w?gv=true', '_blank')}
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-600 dark:border-yellow-400/50 dark:text-yellow-400 bg-white/30 dark:bg-black/30 backdrop-blur-sm"
                    >
                      Schedule a Call
                    </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📧", title: "Email Us", info: "info.levicdigital@gmail.com" },
              { icon: "📞", title: "Call Us", info: "+2348074947146" },
              { icon: "📍", title: "Visit Us", info: "Jabi, Abuja, Nigeria" },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="bg-yellow-500/20 dark:bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-yellow-500/30">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">{contact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact.info}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}