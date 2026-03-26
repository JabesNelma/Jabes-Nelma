"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface FocusData {
  id: string
  title: string
  description: string
  icon: string | null
}

export default function AdminCurrentFocusPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  })

  useEffect(() => {
    fetch("/api/admin/current-focus")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          icon: data.icon || "",
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/current-focus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save")
      toast.success("Current focus updated")
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
      <h1 className="text-3xl font-bold">Current Focus</h1>
      <Card>
        <CardHeader>
          <CardTitle>What are you working on?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Building AI Applications"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you're currently working on..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon Name (Lucide)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., Sparkles, Code, Rocket"
            />
            <p className="text-xs text-muted-foreground">
              Use icon names from{" "}
              <a
                href="https://lucide.dev/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Lucide Icons
              </a>
            </p>
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
