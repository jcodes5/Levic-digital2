"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import Image from "next/image"
import Contact from "@/public/contact.jpg"

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const navigation = [
  { name: "FAQs", href: "/faqs" },
]

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
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
                <span className="text-yellow-500 dark:text-yellow-400 text-sm font-medium">
                  📞 Let's Start a Conversation
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
                  Get In
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent"
                >
                  Touch
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
                Ready to <span className="text-yellow-500 dark:text-yellow-400 font-semibold">transform</span> your
                digital presence? Let's discuss your project and{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">create something amazing</span>{" "}
                together.
              </motion.p>

              {/* Contact Methods */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  { icon: Mail, text: "info.levicdigital@gmail.com", label: "Email us directly" },
                  { icon: Phone, text: "+2348074947146", label: "Call us anytime" },
                  { icon: MapPin, text: "Jabi, Abuja, Nigeria", label: "Visit our office" },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-yellow-500/10 dark:bg-yellow-400/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <contact.icon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{contact.text}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{contact.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Response Time */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  <span className="font-semibold text-yellow-500 dark:text-yellow-400">Quick Response Time</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We typically respond within 24 hours during business days
                </p>
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
                    src={Contact}
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Contact Cards */}
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
                        <div className="font-bold text-green-600 dark:text-green-400">24h Response</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Quick Support</div>
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
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Send className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">Free Consultation</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Project Discussion</div>
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
        <FloatingElement size="md" color="yellow" position={{ top: "20%", right: "12%" }} animation="float" delay={0} />
        <FloatingElement
          size="lg"
          color="blue"
          position={{ bottom: "25%", left: "8%" }}
          animation="pulse"
          delay={1.5}
        />
        <FloatingElement size="sm" color="green" position={{ top: "60%", right: "25%" }} animation="bounce" delay={2} />
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Send us a message</h2>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <p className="text-green-700 dark:text-green-300">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <p className="text-red-700 dark:text-red-300">
                        Sorry, there was an error sending your message. Please try again or contact us directly.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                          className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                          className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234 800 000 0000"
                        className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Inquiry"
                        required
                        className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project..."
                        required
                        rows={5}
                        className="bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500 backdrop-blur-sm"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 group shadow-lg shadow-yellow-500/25"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Contact Information</h3>
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-yellow-500/10 dark:bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                        <Mail className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-500 dark:text-yellow-400">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300">info.levicdigital@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-yellow-500/10 dark:bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                        <Phone className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-500 dark:text-yellow-400">Phone</h4>
                        <p className="text-gray-600 dark:text-gray-300">+2348074947146</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="bg-yellow-500/10 dark:bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                        <MapPin className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-500 dark:text-yellow-400">Location</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Suite D9 HCR Plaza, Opp. Police Pension Office,
                          <br />
                          Sylvester U. Ugoh Crescent, Jabi, Abuja
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-yellow-500/10 dark:bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                        <Clock className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-500 dark:text-yellow-400">Business Hours</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Mon - Fri: 9:00 AM - 6:00 PM
                          <br />
                          Sat: 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Map */}
              <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9876543210123!2d7.4123456789!3d9.0876543210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDUnMTUuNiJOIDfCsDI0JzQ0LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Have Questions?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Check out our frequently asked questions or get in touch with our team.
            </p>
            <Link href= "/faqs">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 shadow-lg shadow-yellow-500/25">
                View FAQs
              </Button>
            </motion.div>
          </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
