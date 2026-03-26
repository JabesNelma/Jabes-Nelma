"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface ConfigData {
  siteTitle: string
  siteDescription: string
  siteKeywords: string
}

export default function AdminSiteConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<ConfigData>({
    siteTitle: "",
    siteDescription: "",
    siteKeywords: "",
  })

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          siteTitle: data.siteTitle || "",
          siteDescription: data.siteDescription || "",
          siteKeywords: data.siteKeywords || "",
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save")
      toast.success("Site config updated")
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
      <h1 className="text-3xl font-bold">Site Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>SEO & Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              value={formData.siteTitle}
              onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              placeholder="Your Name - Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              rows={3}
              value={formData.siteDescription}
              onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
              placeholder="A brief description of your portfolio..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteKeywords">Keywords (comma separated)</Label>
            <Input
              id="siteKeywords"
              value={formData.siteKeywords}
              onChange={(e) => setFormData({ ...formData, siteKeywords: e.target.value })}
              placeholder="developer, portfolio, react, next.js"
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
