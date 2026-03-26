"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { ImageUpload } from "@/components/admin/ImageUpload"

interface AboutData {
  id: string
  bio: string
  avatarUrl: string | null
  email: string
  phone: string | null
  location: string | null
  resumeUrl: string | null
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    bio: "",
    avatarUrl: "",
    email: "",
    phone: "",
    location: "",
    resumeUrl: "",
  })

  useEffect(() => {
    fetch("/api/admin/about")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setFormData({
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          resumeUrl: data.resumeUrl || "",
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save")
      toast.success("About section updated")
    } catch (error) {
      toast.error("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <Card>
        <CardHeader>
          <CardTitle>About Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUpload
            value={formData.avatarUrl}
            onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
            label="Avatar"
          />

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={5}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
