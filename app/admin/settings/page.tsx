
"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  Settings as SettingsIcon, 
  Globe, 
  Share2, 
  Search, 
  Phone, 
  User,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useToast } from '@/hooks/use-toast'

interface SettingsData {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    logoUrl: string
    faviconUrl: string
  }
  social: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalyticsId: string
    googleSearchConsoleId: string
  }
  contact: {
    email: string
    phone: string
    address: string
    businessHours: string
    emergencyContact: string
  }
  account: {
    twoFactorEnabled: boolean
    emailNotifications: boolean
    maintenanceMode: boolean
  }
}

export default function AdminSettings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState<SettingsData>({
    general: {
      siteName: '',
      siteDescription: '',
      siteUrl: '',
      logoUrl: '',
      faviconUrl: ''
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      googleAnalyticsId: '',
      googleSearchConsoleId: ''
    },
    contact: {
      email: '',
      phone: '',
      address: '',
      businessHours: '',
      emergencyContact: ''
    },
    account: {
      twoFactorEnabled: false,
      emailNotifications: true,
      maintenanceMode: false
    }
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    fetchSettings()
  }, [session, status, router])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      
      if (response.ok) {
        setSettings(prevSettings => ({
          general: { ...prevSettings.general, ...data.general },
          social: { ...prevSettings.social, ...data.social },
          seo: { ...prevSettings.seo, ...data.seo },
          contact: { ...prevSettings.contact, ...data.contact },
          account: { ...prevSettings.account, ...data.account }
        }))
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch settings',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (category: keyof SettingsData) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          settings: settings[category]
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `${category.charAt(0).toUpperCase() + category.slice(1)} settings updated successfully`,
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update settings',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (category: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your website settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Name</label>
                    <Input
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      placeholder="Your Site Name"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site URL</label>
                    <Input
                      value={settings.general.siteUrl}
                      onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Description</label>
                  <Textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                    placeholder="Brief description of your website"
                    className="bg-white/50 dark:bg-white/10"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input
                      value={settings.general.logoUrl}
                      onChange={(e) => updateSetting('general', 'logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Favicon URL</label>
                    <Input
                      value={settings.general.faviconUrl}
                      onChange={(e) => updateSetting('general', 'faviconUrl', e.target.value)}
                      placeholder="https://example.com/favicon.ico"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('general')}
                    disabled={saving}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save General Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Facebook</label>
                    <Input
                      value={settings.social.facebook}
                      onChange={(e) => updateSetting('social', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Twitter/X</label>
                    <Input
                      value={settings.social.twitter}
                      onChange={(e) => updateSetting('social', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instagram</label>
                    <Input
                      value={settings.social.instagram}
                      onChange={(e) => updateSetting('social', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    <Input
                      value={settings.social.linkedin}
                      onChange={(e) => updateSetting('social', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/yourcompany"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">YouTube</label>
                    <Input
                      value={settings.social.youtube}
                      onChange={(e) => updateSetting('social', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/c/yourchannel"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('social')}
                    disabled={saving}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Social Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input
                    value={settings.seo.metaTitle}
                    onChange={(e) => updateSetting('seo', 'metaTitle', e.target.value)}
                    placeholder="Default page title"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea
                    value={settings.seo.metaDescription}
                    onChange={(e) => updateSetting('seo', 'metaDescription', e.target.value)}
                    placeholder="Default page description"
                    className="bg-white/50 dark:bg-white/10"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Keywords</label>
                  <Input
                    value={settings.seo.metaKeywords}
                    onChange={(e) => updateSetting('seo', 'metaKeywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    className="bg-white/50 dark:bg-white/10"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Google Analytics ID</label>
                    <Input
                      value={settings.seo.googleAnalyticsId}
                      onChange={(e) => updateSetting('seo', 'googleAnalyticsId', e.target.value)}
                      placeholder="GA-XXXXXXXXX-X"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Google Search Console ID</label>
                    <Input
                      value={settings.seo.googleSearchConsoleId}
                      onChange={(e) => updateSetting('seo', 'googleSearchConsoleId', e.target.value)}
                      placeholder="google-site-verification=..."
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('seo')}
                    disabled={saving}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save SEO Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={settings.contact.email}
                      onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                      placeholder="contact@example.com"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={settings.contact.phone}
                      onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    value={settings.contact.address}
                    onChange={(e) => updateSetting('contact', 'address', e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    className="bg-white/50 dark:bg-white/10"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Hours</label>
                    <Input
                      value={settings.contact.businessHours}
                      onChange={(e) => updateSetting('contact', 'businessHours', e.target.value)}
                      placeholder="Mon-Fri 9AM-5PM"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <Input
                      value={settings.contact.emergencyContact}
                      onChange={(e) => updateSetting('contact', 'emergencyContact', e.target.value)}
                      placeholder="+1 (555) 987-6543"
                      className="bg-white/50 dark:bg-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('contact')}
                    disabled={saving}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Contact Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-500 dark:text-yellow-400">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.account.twoFactorEnabled}
                      onChange={(e) => updateSetting('account', 'twoFactorEnabled', e.target.checked)}
                      className="w-4 h-4 text-yellow-500 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.account.emailNotifications}
                      onChange={(e) => updateSetting('account', 'emailNotifications', e.target.checked)}
                      className="w-4 h-4 text-yellow-500 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Put site in maintenance mode</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.account.maintenanceMode}
                      onChange={(e) => updateSetting('account', 'maintenanceMode', e.target.checked)}
                      className="w-4 h-4 text-yellow-500 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('account')}
                    disabled={saving}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
