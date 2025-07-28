"use client"

import { motion } from "framer-motion"
import { Target, Award, Users, Lightbulb, Shield, Star, Handshake, Twitter, Linkedin, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FloatingElement } from "@/components/enhanced-glassmorphism"
import Image from "next/image"
import About from "@/public/about.jpg"
import CEO from "@/public/CEO.png"

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

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Promise Levi",
      role: "CEO & Founder",
      image: "/CEO.jpg?width=100&height=100",
      bio: "Visionary leader with 10+ years in digital marketing and business strategy.",
      social: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        instagram: "https://instagram.com/johndoe",
      },
    },
    {
      name: "Babatunde Oluwatobi",
      role: "Creative Director",
      image: "/creative.jpg?width=100&height=100",
      bio: "Award-winning designer specializing in brand identity and visual storytelling.",
      social: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        instagram: "https://instagram.com/janesmith",
      },
    },
    {
      name: "Overcomer Jatto",
      role: "Lead Software Developer",
      image: "/me.png",
      bio: "A Software developer with expertise in modern web technologies and architecture.",
      social: {
        twitter: "https://twitter.com/mikejohnson",
        linkedin: "https://linkedin.com/in/mikejohnson",
        instagram: "https://instagram.com/mikejohnson",
      },
    },
    {
      name: "Rosemary Ojochenemi L.",
      role: "Digital Marketing Manager",
      image: "/digital.png",
      bio: "Data-driven marketer with proven track record in SEO, SEM, and social media.",
      social: {
        twitter: "https://twitter.com/sarahwilson",
        linkedin: "https://linkedin.com/in/sarahwilson",
        instagram: "https://instagram.com/sarahwilson",
      },
    },
    {
      name: "Victoria Samuel",
      role: "Executive Secretary",
      image: "/secetary.png",
      bio: "Experienced Executive Secretary ensuring smooth office operations, effective communication, and high-level administrative support to enhance organizational efficiency and client satisfaction.",
      social: {
        twitter: "https://twitter.com/davidbrown",
        linkedin: "https://linkedin.com/in/davidbrown",
        instagram: "https://instagram.com/davidbrown",
      },
    },
    {
      name: "Anthony Chigbo",
      role: "WordPress Expert",
      image: "/wordpress.jpg",
      bio: "Experienced WordPress expert ensuring seamless website development and client satisfaction through efficient execution, customization, and ongoing support.",
      social: {
        twitter: "https://twitter.com/lisadavis",
        linkedin: "https://linkedin.com/in/lisadavis",
        instagram: "https://instagram.com/lisadavis",
      },
    },
    {
      name: "Barnabas C. Ogbor",
      role: "Fullstack Developer",
      image: "/fullstack.png",
      bio: "Experienced Fullstack Developer delivering robust, scalable web applications through expertise in both frontend and backend technologies, ensuring seamless user experiences and high-quality code.",
      social: {
        twitter: "https://twitter.com/lisadavis",
        linkedin: "https://linkedin.com/in/lisadavis",
        instagram: "https://instagram.com/lisadavis",
      },
    },
  ]

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
                  🏢 Founded in 2020 • 4+ Years of Excellence
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
                  About
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent"
                >
                  Levic Digital
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="block bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                  Agency
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
                We are a full-service creative and tech-driven agency helping businesses{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">scale</span>,{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">transform</span>, and{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-semibold">stand out</span> in a highly
                competitive digital space.
              </motion.p>

              {/* Key Points */}
              <motion.div
                variants={fadeInLeft}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="space-y-4"
              >
                {[
                  "Creative professionals and problem-solvers",
                  "Committed to excellence and innovation",
                  "Trusted by 50+ clients across various industries",
                ].map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{point}</span>
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
                    src={About}
                    alt="About Levic Digital Agency"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-600 dark:text-yellow-400">Our Vision</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Digital Leadership</div>
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
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 dark:text-blue-400">Expert Team</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Creative Professionals</div>
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

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/50 dark:bg-white/5 backdrop-blur-lg border-yellow-500/20 h-full">
                <CardContent className="p-8 text-center">
                  <Target className="h-16 w-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    To be the go-to digital partner for African and global brands seeking to grow, thrive, and lead in
                    the digital era.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/50 dark:bg-white/5 backdrop-blur-lg border-yellow-500/20 h-full">
                <CardContent className="p-8 text-center">
                  <Award className="h-16 w-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    To deliver top-tier digital services that blend creativity, strategy, and innovation — empowering
                    businesses to succeed with ease.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/50 dark:bg-white/5 backdrop-blur-lg border-yellow-500/20 h-full">
                <CardContent className="p-8 text-center">
                  <Users className="h-16 w-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">Our Team</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Creative professionals, developers, strategists, and problem-solvers committed to excellence and
                    innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-12 text-yellow-500 dark:text-yellow-400">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Lightbulb, title: "Creativity", desc: "We think beyond the ordinary" },
                { icon: Shield, title: "Integrity", desc: "We build with honesty and transparency" },
                { icon: Star, title: "Excellence", desc: "We strive for the highest standards" },
                { icon: Handshake, title: "Collaboration", desc: "We grow with our clients and partners" },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-yellow-500/10 dark:bg-yellow-400/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-yellow-500 dark:text-yellow-400">{value.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The talented individuals behind Levic Digital Agency's success
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border-yellow-500/30 overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
          <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      {/* Social Media Overlay */}
                      <div className="team-card-overlay">
                        <div className="flex space-x-4">
                          <motion.a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="social-icon"
                          >
                            <Twitter className="h-5 w-5" />
                          </motion.a>
                          <motion.a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="social-icon"
                          >
                            <Linkedin className="h-5 w-5" />
                          </motion.a>
                          <motion.a
                            href={member.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="social-icon"
                          >
                            <Instagram className="h-5 w-5" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white/60 dark:bg-black/60 backdrop-blur-sm">
                      <h3 className="text-xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-white/30 dark:from-gray-900/30 dark:to-black/30 backdrop-blur-xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10 p-8 shadow-xl inline-block">
              <h2 className="text-4xl font-bold mb-6 text-yellow-500 dark:text-yellow-400">Our Journey So Far</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "4+", label: "Years of Excellence" },
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
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
    </div>
  )
}
