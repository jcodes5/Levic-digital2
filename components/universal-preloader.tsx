"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logo from "@/public/logo.png"

interface UniversalPreloaderProps {
  children: React.ReactNode
}

export function UniversalPreloader({ children }: UniversalPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    setLoadingProgress(0)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [pathname])

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/":
        return "Home"
      case "/about":
        return "About Us"
      case "/services":
        return "Our Services"
      case "/portfolio":
        return "Portfolio"
      case "/blog":
        return "Blog"
      case "/contact":
        return "Contact"
      case "/faqs":
        return "FAQs"
      default:
        return "Loading"
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-white via-yellow-50 to-white dark:from-black dark:via-gray-900 dark:to-black"
          >
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 p-12 shadow-2xl text-center max-w-md w-full mx-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                 <Image
                                  src={logo}
                                  alt="Logo"
                                  width={80}
                                  height={80}
                                  className="inline-block mr-2"
                                />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Loading {getPageTitle(pathname)}...</p>
              </motion.div>

              {/* Animated Loading Dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{Math.round(loadingProgress)}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
