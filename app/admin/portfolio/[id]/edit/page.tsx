"use client"

import { useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Save,
  ArrowLeft,
  Upload,
  X,
  Plus,
  Minus,
  ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  image?: string
  category: string
  tags: string[]
  client?: string
  duration?: string
  date: string
  link?: string
  challenges: string[]
  solutions: string[]
  results: string[]
  gallery: string[]
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  order: number
}

export default function EditPortfolioItem({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = React.use(params)
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [portfolio, setPortfolio] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    fullDescription: '',
    image: '',
    category: '',
    tags: [''],
    client: '',
    duration: '',
    date: '',
    link: '',
    challenges: [''],
    solutions: [''],
    results: [''],
    gallery: [''],
    technologies: [''],
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    order: 0
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      router.push('/admin/login')
      return
    }

    fetchPortfolio()
  }, [session, status, router, resolvedParams.id])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/admin/portfolio/${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        const parsedData = {
          ...data,
          tags: JSON.parse(data.tags || '[]'),
          challenges: JSON.parse(data.challenges || '[]'),
          solutions: JSON.parse(data.solutions || '[]'),
          results: JSON.parse(data.results || '[]'),
          gallery: JSON.parse(data.gallery || '[]'),
          technologies: JSON.parse(data.technologies || '[]'), // <-- add this line
        }
        setPortfolio(parsedData)
        setFormData({
          title: parsedData.title,
          slug: parsedData.slug,
          description: parsedData.description,
          fullDescription: parsedData.fullDescription,
          image: parsedData.image || '',
          category: parsedData.category,
          tags: parsedData.tags.length > 0 ? parsedData.tags : [''],
          client: parsedData.client || '',
          duration: parsedData.duration || '',
          date: parsedData.date,
          link: parsedData.link || '',
          challenges: parsedData.challenges.length > 0 ? parsedData.challenges : [''],
          solutions: parsedData.solutions.length > 0 ? parsedData.solutions : [''],
          results: parsedData.results.length > 0 ? parsedData.results : [''],
          gallery: parsedData.gallery.length > 0 ? parsedData.gallery : [''],
          technologies: parsedData.technologies && parsedData.technologies.length > 0 ? parsedData.technologies : [''], // <-- add this line
          status: parsedData.status,
          order: parsedData.order
        })
      } else {
        toast({
          title: 'Error',
          description: 'Portfolio item not found',
          variant: 'destructive',
        })
        router.push('/admin/portfolio')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio item',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleArrayFieldChange = (
    field: 'tags' | 'challenges' | 'solutions' | 'results' | 'gallery' | 'technologies',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) =>
        i === index ? value : item
      ),
    }))
  }

  const addArrayField = (
    field: 'tags' | 'challenges' | 'solutions' | 'results' | 'gallery' | 'technologies'
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  const removeArrayField = (
    field: 'tags' | 'challenges' | 'solutions' | 'results' | 'gallery' | 'technologies',
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_: string, i: number) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        tags: formData.tags.filter(tag => tag.trim()),
        challenges: formData.challenges.filter(challenge => challenge.trim()),
        solutions: formData.solutions.filter(solution => solution.trim()),
        results: formData.results.filter(result => result.trim()),
        gallery: formData.gallery.filter(url => url.trim()),
      }

      const response = await fetch(`/api/admin/portfolio/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Portfolio item updated successfully',
        })
        router.push('/admin/portfolio')
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to update portfolio item',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update portfolio item',
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

  if (!portfolio) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Portfolio item not found</h3>
          <Link href="/admin/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
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
            <Link href="/admin/portfolio">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Project</h1>
              <p className="text-gray-600 dark:text-gray-300">Update portfolio project details</p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Updating...' : 'Update Project'}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title"
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
                    placeholder="project-url-slug"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Short Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description for portfolio cards"
                    className="bg-white/50 dark:bg-white/10"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Description *
                  </label>
                  <Textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Detailed description for project modal"
                    className="bg-white/50 dark:bg-white/10"
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Featured Image URL
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Arrays */}
            {/* Technologies Used */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies Used
              </label>
              {formData.technologies && formData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={tech}
                    onChange={(e) => handleArrayFieldChange('technologies', index, e.target.value)}
                    placeholder="e.g. React, Node.js"
                    className="bg-white/50 dark:bg-white/10"
                  />
                  <Button
                    type="button"
                    onClick={() => removeArrayField('technologies', index)}
                    variant="outline"
                    size="sm"
                    disabled={formData.technologies.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayField('technologies')}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Technology
              </Button>
            </div>
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                        placeholder="Enter tag"
                        className="bg-white/50 dark:bg-white/10"
                      />
                      <Button
                        type="button"
                        onClick={() => removeArrayField('tags', index)}
                        variant="outline"
                        size="sm"
                        disabled={formData.tags.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addArrayField('tags')}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>

                {/* Challenges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Challenges
                  </label>
                  {formData.challenges.map((challenge, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={challenge}
                        onChange={(e) => handleArrayFieldChange('challenges', index, e.target.value)}
                        placeholder="Describe a challenge"
                        className="bg-white/50 dark:bg-white/10"
                      />
                      <Button
                        type="button"
                        onClick={() => removeArrayField('challenges', index)}
                        variant="outline"
                        size="sm"
                        disabled={formData.challenges.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addArrayField('challenges')}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Challenge
                  </Button>
                </div>

                {/* Solutions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Solutions
                  </label>
                  {formData.solutions.map((solution, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={solution}
                        onChange={(e) => handleArrayFieldChange('solutions', index, e.target.value)}
                        placeholder="Describe a solution"
                        className="bg-white/50 dark:bg-white/10"
                      />
                      <Button
                        type="button"
                        onClick={() => removeArrayField('solutions', index)}
                        variant="outline"
                        size="sm"
                        disabled={formData.solutions.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addArrayField('solutions')}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Solution
                  </Button>
                </div>

                {/* Results */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Results
                  </label>
                  {formData.results.map((result, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={result}
                        onChange={(e) => handleArrayFieldChange('results', index, e.target.value)}
                        placeholder="Describe a result"
                        className="bg-white/50 dark:bg-white/10"
                      />
                      <Button
                        type="button"
                        onClick={() => removeArrayField('results', index)}
                        variant="outline"
                        size="sm"
                        disabled={formData.results.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addArrayField('results')}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Result
                  </Button>
                </div>

                {/* Gallery */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gallery Images
                  </label>
                  {formData.gallery.map((url, index) => (
                     <div key={index} className="space-y-2 mb-4 p-4 border rounded-lg bg-white/30 dark:bg-white/5">
                      <div className="flex gap-2">
                        <Input
                          value={url}
                          onChange={(e) => handleArrayFieldChange('gallery', index, e.target.value)}
                          placeholder="Image URL"
                          className="bg-white/50 dark:bg-white/10"
                        />
                        <Button
                          type="button"
                          onClick={() => removeArrayField('gallery', index)}
                          variant="outline"
                          size="sm"
                          disabled={formData.gallery.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">or</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setImageUploading(true)
                              try {
                                const formData = new FormData()
                                formData.append('file', file)

                                const response = await fetch('/api/upload/cloudinary', {
                                  method: 'POST',
                                  body: formData,
                                })

                                if (response.ok) {
                                  const data = await response.json()
                                  handleArrayFieldChange('gallery', index, data.secure_url)
                                  toast({
                                    title: 'Success',
                                    description: 'Image uploaded successfully',
                                  })
                                } else {
                                  toast({
                                    title: 'Error',
                                    description: 'Failed to upload image',
                                    variant: 'destructive',
                                  })
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
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                          disabled={imageUploading}
                        />
                        {imageUploading && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                        )}
                      </div>
                      
                      {url && (
                        <div className="mt-2">
                          <img
                            src={url}
                            alt={`Gallery image ${index + 1}`}
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addArrayField('gallery')}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Project Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web Development"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client
                  </label>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Client name"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 3 months"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year *
                  </label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2024"
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Live URL
                  </label>
                  <Input
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.com"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

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
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Order
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="bg-white/50 dark:bg-white/10"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}