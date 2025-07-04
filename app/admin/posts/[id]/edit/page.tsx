"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  category: string
  tags: string[]
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  readTime: string
}

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = React.use(params)
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: [] as string[],
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    readTime: ''
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      router.push('/admin/login')
      return
    }

    fetchPost()
  }, [session, status, router, resolvedParams.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`)
      const data = await response.json()

      if (response.ok) {
        setPost(data)
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image || '',
          category: data.category,
          tags: Array.isArray(data.tags) ? data.tags : JSON.parse(data.tags || '[]'),
          status: data.status,
          readTime: data.readTime
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        })
        router.push('/admin/posts')
      } else {
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }))
  }

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, tags }))
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

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Link href="/admin/posts">
            <Button>Back to Posts</Button>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
              <p className="text-gray-600 dark:text-gray-300">Update your blog post</p>
            </div>
          </div>
          <Badge className="bg-yellow-500/10 text-yellow-500">
            {formData.status}
          </Badge>
        </div>

        <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-500 dark:text-yellow-400">Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-slug"
                    required
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post"
                  required
                  className="bg-white/50 dark:bg-white/10"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your post content here..."
                  required
                  className="bg-white/50 dark:bg-white/10"
                  rows={15}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
                  >
                    <option value="">Select category</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Case Study">Case Study</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/50 dark:bg-white/10"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Read Time</label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="5 min read"
                    required
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="marketing, trends, ai, seo"
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Featured Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Update Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}