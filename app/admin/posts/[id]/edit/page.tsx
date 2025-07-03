"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save,
  Eye,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPost({ params }: EditPostPageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
    readTime: ''
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      router.push('/admin/login')
      return
    }

    fetchPost()
  }, [session, status, router, params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      if (response.ok) {
        const post = await response.json()
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image || '',
          category: post.category,
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
          status: post.status,
          readTime: post.readTime
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch post',
          variant: 'destructive',
        })
        router.push('/admin/posts')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch post',
        variant: 'destructive',
      })
      router.push('/admin/posts')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select a valid image file',
        variant: 'destructive',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    setImageUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url }))
        toast({
          title: 'Success',
          description: 'Image uploaded successfully',
        })
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      const response = await fetch(`/api/admin/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        })
        router.push('/admin/posts')
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to update post',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
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
          <div className="flex items-center gap-4">
            <Link href="/admin/posts">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
              <p className="text-gray-600 dark:text-gray-300">Update your blog post</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-yellow-500 text-white hover:bg-yellow-600"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Update Post'}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter post title"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug *
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="post-url-slug"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Excerpt *
                  </label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post"
                    className="bg-white/50 dark:bg-white/10"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your post content here... (HTML supported)"
                    className="bg-white/50 dark:bg-white/10"
                    rows={15}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Featured image"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Upload a featured image for your post
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imageUploading}
                      />
                      <Button
                        type="button"
                        disabled={imageUploading}
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                        asChild
                      >
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          {imageUploading ? 'Uploading...' : 'Choose Image'}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
                    required
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Digital Marketing"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Read Time *
                  </label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}