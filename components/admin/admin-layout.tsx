"use client"

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Mail,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
  { name: 'Messages', href: '/admin/contacts', icon: Mail },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-r border-yellow-500/20 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={`flex h-16 items-center justify-between border-b border-yellow-500/20 ${sidebarCollapsed ? 'px-2' : 'px-6'}`}>
            <Link href="/admin/dashboard" className="flex items-center justify-center">
              <h1 className={`font-bold text-yellow-500 dark:text-yellow-400 transition-all duration-300 ${sidebarCollapsed ? 'text-lg' : 'text-2xl'}`}>
                {sidebarCollapsed ? 'L' : 'LEVIC'}
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSidebar}
                className="hidden lg:block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center text-sm font-medium rounded-lg transition-colors group ${
                      isActive
                        ? 'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                    {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className={`border-t border-yellow-500/20 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {session?.user?.name?.[0] || session?.user?.email?.[0] || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {session?.user?.name || session?.user?.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {session?.user?.role}
                  </p>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {session?.user?.name?.[0] || session?.user?.email?.[0] || 'A'}
                  </span>
                </div>
              </div>
            )}
            <Button
              onClick={handleSignOut}
              variant="outline"
              size={sidebarCollapsed ? "icon" : "sm"}
              className={`border-red-500/50 text-red-500 hover:bg-red-500/10 w-full`}
              title={sidebarCollapsed ? 'Sign Out' : undefined}
            >
              <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-2'}`} />
              {!sidebarCollapsed && 'Sign Out'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-yellow-500/20">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Search Box */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/50 dark:bg-white/10 border-yellow-500/20 focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {pathname === '/admin/posts' && (
                <Link href="/admin/posts/new">
                  <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </Link>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}