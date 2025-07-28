"use client"
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Logo from "@/public/logo.png"
import Image from "next/image"

export function Footer() {
  const footerLinks = {
    services: [
      { name: "Digital Marketing", href: "/services#digital-marketing" },
      { name: "Web Development", href: "/services#web-development" },
      { name: "Branding & Design", href: "/services#branding" },
      { name: "UI/UX Design", href: "/services#ui-ux" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "FAQs", href: "/faqs" },
      { name: "Support Center", href: "/contact" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  }

  const socialIcons = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-xl border-t border-yellow-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={80}
                className="inline-block mr-2"
              />
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Innovating Growth. Building Brands.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Founded in 2020, delivering digital excellence for 4+ years. We help businesses scale, transform, and
              stand out in the digital space.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
              >
                <Mail className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm">info.levicdigital@gmail.com</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
              >
                <Phone className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm">+2348074947146</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
              >
                <MapPin className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm">Suite D9 HCR Plaza, Opp. Police Pension Office, Sylvester U. Ugoh Crescent, Jabi, Abuja</span>
              </motion.div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-yellow-500 dark:text-yellow-400 mb-6 text-lg">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, color: "#eab308" }}
                      className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer text-sm block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-yellow-500 dark:text-yellow-400 mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, color: "#eab308" }}
                      className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer text-sm block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-yellow-500 dark:text-yellow-400 mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, color: "#eab308" }}
                      className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer text-sm block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-gray-500 dark:text-gray-400 text-sm"
            >
              &copy; {new Date().getFullYear()} Levic Digital Agency. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-yellow-500/10 dark:bg-yellow-400/10 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300 border border-yellow-500/20"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
