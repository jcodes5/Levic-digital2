"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Facebook, Twitter, Linkedin, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
  url: string
  title: string
  description: string
  layout?: "horizontal" | "vertical"
}

export function SocialShare({ url, title, description, layout = "horizontal" }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes")
  }

  const containerClass = layout === "vertical" ? "flex flex-col space-y-3" : "flex items-center space-x-4"

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="flex items-center mb-4">
        <Share2 className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
        <h4 className="font-semibold text-yellow-500 dark:text-yellow-400">Share this article</h4>
      </div>

      <div className={containerClass}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.facebook)}
            className="border-blue-500/50 text-blue-600 hover:bg-blue-500/10 dark:text-blue-400"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.twitter)}
            className="border-sky-500/50 text-sky-600 hover:bg-sky-500/10 dark:text-sky-400"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.linkedin)}
            className="border-blue-700/50 text-blue-700 hover:bg-blue-700/10 dark:text-blue-300"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="border-gray-500/50 text-gray-600 hover:bg-gray-500/10 dark:text-gray-400 bg-transparent"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
