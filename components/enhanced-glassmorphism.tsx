"use client"

import { motion } from "framer-motion"
import type React from "react"

interface GlassmorphismContainerProps {
  children: React.ReactNode
  className?: string
  intensity?: "light" | "medium" | "heavy" | "ultra"
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  border?: boolean
  shadow?: boolean
  hover?: boolean
  animated?: boolean
}

export function GlassmorphismContainer({
  children,
  className = "",
  intensity = "medium",
  rounded = "xl",
  border = true,
  shadow = true,
  hover = false,
  animated = false,
}: GlassmorphismContainerProps) {
  const intensityClasses = {
    light: "bg-white/10 dark:bg-black/10 backdrop-blur-sm",
    medium: "bg-white/20 dark:bg-black/20 backdrop-blur-md",
    heavy: "bg-white/30 dark:bg-black/30 backdrop-blur-xl",
    ultra: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl",
  }

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  }

  const baseClasses = [
    intensityClasses[intensity],
    roundedClasses[rounded],
    border && "border border-white/20 dark:border-white/10",
    shadow && "shadow-xl shadow-black/5",
    hover && "hover:shadow-2xl hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-500",
    animated && "animate-pulse",
    "relative z-10", // Ensure content is above floating elements
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const Component = hover ? motion.div : "div"
  const motionProps = hover
    ? {
        whileHover: { scale: 1.02, y: -2 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }
    : {}

  return (
    <Component className={baseClasses} {...motionProps}>
      {children}
    </Component>
  )
}

interface FloatingElementProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  color?: "yellow" | "blue" | "purple" | "green" | "pink" | "orange"
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  animation?: "float" | "pulse" | "rotate" | "bounce" | "swing" | "none"
  delay?: number
  zIndex?: number
}

export function FloatingElement({
  size = "md",
  color = "yellow",
  position,
  animation = "float",
  delay = 0,
  zIndex = 0,
}: FloatingElementProps) {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
    "2xl": "w-64 h-64",
  }

  const colorClasses = {
    yellow: "bg-yellow-400/15 border-yellow-400/25",
    blue: "bg-blue-400/15 border-blue-400/25",
    purple: "bg-purple-400/15 border-purple-400/25",
    green: "bg-green-400/15 border-green-400/25",
    pink: "bg-pink-400/15 border-pink-400/25",
    orange: "bg-orange-400/15 border-orange-400/25",
  }

  const animations = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
    },
    rotate: {
      rotate: 360,
      transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay },
    },
    bounce: {
      y: [0, -30, 0],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay },
    },
    swing: {
      rotate: [-10, 10, -10],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
    },
    none: {},
  }

  const positionStyle = {
    position: "absolute" as const,
    zIndex: zIndex || -1, // Default to behind content
    ...position,
  }

  return (
    <motion.div
      animate={animations[animation]}
      style={positionStyle}
      className={`${sizeClasses[size]} ${colorClasses[color]} backdrop-blur-md rounded-full border shadow-lg`}
    />
  )
}

// New Glassmorphism Modal Component
interface GlassmorphismModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function GlassmorphismModal({ isOpen, onClose, children, title, size = "md" }: GlassmorphismModalProps) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="p-6 border-b border-white/20 dark:border-white/10">
            <h2 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  )
}
