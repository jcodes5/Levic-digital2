"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save,
  Settings as SettingsIcon,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'

interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
}

export default function AdminSettings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Levic Digital Agency',
    siteDescription: 'Full-service creative and tech-driven agency helping businesses scale, transform, and stand out in the digital space.',
    contactEmail: 'info.levicdigital@gmail.com',
    contactPhone: '+2348074947146',
    address: 'Suite D9 HCR Plaza, Opp. Police Pension Office, Sylvester U. Ugoh Crescent, Jabi, Abuja',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    seo: {
      metaTitle: 'Levic Digital Agency - Innovating Growth. Building Brands.',
      metaDescription: 'Full-service creative and tech-driven agency helping businesses scale, transform, and stand out in the digital space.',
      keywords: 'digital marketing, web design, branding, UI/UX design, cybersecurity, architecture'
    }
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    // In a real app, you would fetch settings from the database
    setLoading(false)
  }, [session, status, router])

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      // In a real app, you would save to the database
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Password changed successfully',
        })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setShowPasswordForm(false)
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to change password',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change password',
        variant: 'destructive',
      })
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage site settings and configuration</p>
          </div>
          <Button 
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-500 dark:text-yellow-400">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Name
                </label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Description
                </label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="bg-white/50 dark:bg-white/10"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-500 dark:text-yellow-400">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Contact Phone
                </label>
                <Input
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Address
                </label>
                <Textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="bg-white/50 dark:bg-white/10"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-500 dark:text-yellow-400">Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Facebook className="inline h-4 w-4 mr-1" />
                  Facebook URL
                </label>
                <Input
                  value={settings.socialMedia.facebook}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Twitter className="inline h-4 w-4 mr-1" />
                  Twitter URL
                </label>
                <Input
                  value={settings.socialMedia.twitter}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Instagram className="inline h-4 w-4 mr-1" />
                  Instagram URL
                </label>
                <Input
                  value={settings.socialMedia.instagram}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Linkedin className="inline h-4 w-4 mr-1" />
                  LinkedIn URL
                </label>
                <Input
                  value={settings.socialMedia.linkedin}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-500 dark:text-yellow-400">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Title
                </label>
                <Input
                  value={settings.seo.metaTitle}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    seo: { ...settings.seo, metaTitle: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                </label>
                <Textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    seo: { ...settings.seo, metaDescription: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keywords (comma separated)
                </label>
                <Input
                  value={settings.seo.keywords}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    seo: { ...settings.seo, keywords: e.target.value }
                  })}
                  className="bg-white/50 dark:bg-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Settings */}
        <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-500 dark:text-yellow-400">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Change Password</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Update your account password</p>
              </div>
              <Button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                variant="outline"
                className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
              >
                {showPasswordForm ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {showPasswordForm ? 'Hide' : 'Change Password'}
              </Button>
            </div>

            {showPasswordForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handlePasswordChange}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="bg-white/50 dark:bg-white/10"
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordForm(false)
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.form>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}