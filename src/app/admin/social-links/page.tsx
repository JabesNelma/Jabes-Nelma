"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
  order: number
}

const iconOptions = [
  "Github",
  "Linkedin",
  "Twitter",
  "Mail",
  "Globe",
  "Instagram",
  "Youtube",
  "Facebook",
]

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)

  const [newLink, setNewLink] = useState({
    platform: "",
    url: "",
    icon: "Globe",
  })

  useEffect(() => {
    fetch("/api/admin/social-links")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    if (!newLink.platform || !newLink.url) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const response = await fetch("/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLink),
      })

      const data = await response.json()
      setLinks([...links, data])
      setNewLink({ platform: "", url: "", icon: "Globe" })
      toast.success("Social link added")
    } catch (error) {
      toast.error("Failed to add link")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/social-links/${id}`, { method: "DELETE" })
      setLinks(links.filter((l) => l.id !== id))
      toast.success("Link deleted")
    } catch (error) {
      toast.error("Failed to delete link")
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
      <h1 className="text-3xl font-bold">Social Links</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Input
                placeholder="GitHub"
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://github.com/username"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={newLink.icon}
                onValueChange={(value) => setNewLink({ ...newLink, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAdd} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell className="font-medium">{link.platform}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{link.url}</TableCell>
                  <TableCell>{link.icon}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {links.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No social links yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
