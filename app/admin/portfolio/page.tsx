
"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  category: string
  tags: string[]
  client?: string
  date: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  order: number
  author: {
    name: string
  }
  createdAt: string
  link?: string
}

export default function PortfolioManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      router.push('/admin/login')
      return
    }

    fetchPortfolio()
  }, [session, status, router])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/admin/portfolio')
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.map((item: any) => ({
          ...item,
          tags: JSON.parse(item.tags || '[]')
        }))
        setPortfolio(formattedData)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio items',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Portfolio item deleted successfully',
        })
        fetchPortfolio()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete portfolio item',
        variant: 'destructive',
      })
    }
  }

  const filteredPortfolio = portfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(portfolio.map(item => item.category))]

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your portfolio projects</p>
          </div>
          <Link href="/admin/portfolio/new">
            <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white/50 dark:bg-white/10"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
              >
                <option value="All">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
                <CardContent className="p-0">
                  {item.image && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={item.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className={
                            item.status === 'PUBLISHED'
                              ? 'bg-green-500 text-white'
                              : item.status === 'DRAFT'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-500 text-white'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white/90">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/portfolio/${item.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {item.link && (
                              <DropdownMenuItem asChild>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Live
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the portfolio item.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {item.client && (
                      <p className="text-xs text-gray-500 mb-3">Client: {item.client}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/admin/portfolio/${item.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      {item.link && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No portfolio items found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first portfolio project'
              }
            </p>
            <Link href="/admin/portfolio/new">
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
