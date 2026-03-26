"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/admin/ProjectForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string | null
  repoUrl: string | null
  type: string
  tags: string
  featured: boolean
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/admin/projects/${params.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found")
          return res.json()
        })
        .then((data) => {
          setProject(data)
          setLoading(false)
        })
        .catch(() => {
          router.push("/admin/projects")
        })
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Project</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          {project && <ProjectForm project={project} isEdit />}
        </CardContent>
      </Card>
    </div>
  )
}
