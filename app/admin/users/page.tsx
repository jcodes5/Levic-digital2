"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  User,
  Mail,
  Shield,
  UserPlus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: string
  name?: string
  email: string
  role: 'USER' | 'ADMIN' | 'EDITOR'
  createdAt: string
  updatedAt: string
  _count?: {
    posts: number
  }
}

export default function AdminUsers() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' as 'USER' | 'ADMIN' | 'EDITOR'
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    fetchUsers()
  }, [session, status, router])

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (roleFilter !== 'all') params.append('role', roleFilter)

      const response = await fetch(`/api/admin/users?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingUser ? `/api/admin/users/${editingUser.id}` : '/api/admin/users'
      const method = editingUser ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `User ${editingUser ? 'updated' : 'created'} successfully`,
        })
        setShowCreateModal(false)
        setEditingUser(null)
        setFormData({ name: '', email: '', password: '', role: 'USER' })
        fetchUsers()
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || `Failed to ${editingUser ? 'update' : 'create'} user`,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingUser ? 'update' : 'create'} user`,
        variant: 'destructive',
      })
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
        toast({
          title: 'Success',
          description: 'User deleted successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete user',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      })
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'EDITOR':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'USER':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      email: user.email,
      password: '',
      role: user.role
    })
    setShowCreateModal(true)
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage system users and permissions</p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-white/10"
                  />
                </div>
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
              >
                <option value="all">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="USER">User</option>
              </select>
              <Button onClick={fetchUsers} className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {user.name || 'No Name'}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        {user._count && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {user._count.posts} posts
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(user)}
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.id !== session?.user?.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteUser(user.id)}
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {users.length === 0 && !loading && (
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
            <CardContent className="p-12 text-center">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No users match your current filters.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl max-w-md w-full border border-yellow-500/20 shadow-2xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-6">
                  {editingUser ? 'Edit User' : 'Create New User'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="bg-white/50 dark:bg-white/10"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password {editingUser && '(leave blank to keep current)'}
                    </label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter password"
                      className="bg-white/50 dark:bg-white/10"
                      required={!editingUser}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
                    >
                      <option value="USER">User</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      {editingUser ? 'Update User' : 'Create User'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowCreateModal(false)
                        setEditingUser(null)
                        setFormData({ name: '', email: '', password: '', role: 'USER' })
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}