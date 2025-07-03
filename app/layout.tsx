import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { UniversalPreloader } from "@/components/universal-preloader"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { PerformanceMonitor } from "@/components/performance-monitor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Levic Digital Agency - Innovating Growth. Building Brands.",
  description:
    "Full-service creative and tech-driven agency helping businesses scale, transform, and stand out in the digital space.",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <UniversalPreloader>
              <Preloader />
              <Header />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
              <Analytics />
              <PerformanceMonitor />
            </UniversalPreloader>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
