"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  type: string
  featured: boolean
  year?: number
  isPinned?: boolean
  createdAt: string
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      setProjects(projects.filter((p) => p.id !== id))
      toast.success("Project deleted")
    } catch (error) {
      toast.error("Failed to delete project")
    }
  }

  const handleTogglePin = async (id: string, currentPin: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !currentPin }),
      })

      if (!response.ok) throw new Error("Failed to update")

      setProjects(
        projects.map((p) =>
          p.id === id ? { ...p, isPinned: !currentPin } : p
        )
      )
      toast.success(!currentPin ? "Project pinned" : "Project unpinned")
    } catch (error) {
      toast.error("Failed to update project")
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[60px]">Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Pinned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.year || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={project.type === "client" ? "default" : "secondary"}>
                      {project.type === "client" ? "Client" : "Learning"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {project.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleTogglePin(project.id, project.isPinned || false)}
                      className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: project.isPinned ? "#3b82f6" : "#e5e7eb",
                        color: project.isPinned ? "#ffffff" : "#000000",
                      }}
                    >
                      {project.isPinned ? "Pinned" : "Pin"}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;{project.title}&quot;? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No projects yet. Create your first project!
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
