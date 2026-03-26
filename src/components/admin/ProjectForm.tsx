"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"
import { toast } from "sonner"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  projectUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  repoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  type: z.enum(["client", "learning"]),
  tags: z.string(),
  featured: z.boolean(),
  year: z.number().min(2000).max(9999),
  isPinned: z.boolean(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface Project {
  id?: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string | null
  repoUrl: string | null
  type: string
  tags: string
  featured: boolean
  year?: number
  isPinned?: boolean
}

interface ProjectFormProps {
  project?: Project
  isEdit?: boolean
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<string[]>(
    project?.tags ? JSON.parse(project.tags) : []
  )
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      projectUrl: project?.projectUrl || "",
      repoUrl: project?.repoUrl || "",
      type: (project?.type as "client" | "learning") || "client",
      tags: project?.tags || "[]",
      featured: project?.featured || false,
      year: project?.year || new Date().getFullYear(),
      isPinned: project?.isPinned || false,
    },
  })

  const imageUrl = watch("imageUrl")
  const featured = watch("featured")
  const type = watch("type")
  const year = watch("year")
  const isPinned = watch("isPinned")

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()]
      setTags(newTags)
      setValue("tags", JSON.stringify(newTags))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove)
    setTags(newTags)
    setValue("tags", JSON.stringify(newTags))
  }

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true)
    try {
      const url = isEdit && project?.id
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects"
      
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          projectUrl: data.projectUrl || null,
          repoUrl: data.repoUrl || null,
          year: data.year,
          isPinned: data.isPinned,
        }),
      })

      if (!response.ok) throw new Error("Failed to save project")

      toast.success(isEdit ? "Project updated" : "Project created")
      router.push("/admin/projects")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <ImageUpload
        value={imageUrl}
        onChange={(url) => setValue("imageUrl", url)}
        label="Project Image"
      />
      {errors.imageUrl && (
        <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectUrl">Project URL</Label>
          <Input
            id="projectUrl"
            placeholder="https://example.com"
            {...register("projectUrl")}
          />
          {errors.projectUrl && (
            <p className="text-sm text-destructive">{errors.projectUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input
            id="repoUrl"
            placeholder="https://github.com/user/repo"
            {...register("repoUrl")}
          />
          {errors.repoUrl && (
            <p className="text-sm text-destructive">{errors.repoUrl.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Project Type</Label>
        <Select
          value={type}
          onValueChange={(value) => setValue("type", value as "client" | "learning")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">Client Work</SelectItem>
            <SelectItem value="learning">Learning Project</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-muted rounded-md text-sm flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={featured}
          onCheckedChange={(checked) => setValue("featured", checked)}
        />
        <Label htmlFor="featured">Featured Project</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Project Year</Label>
          <Input
            id="year"
            type="number"
            min="2000"
            max="9999"
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && (
            <p className="text-sm text-destructive">{errors.year.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-7">
          <Switch
            id="isPinned"
            checked={isPinned}
            onCheckedChange={(checked) => setValue("isPinned", checked)}
          />
          <Label htmlFor="isPinned">Pin Project</Label>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEdit ? "Update Project" : "Create Project"}
      </Button>
    </form>
  )
}
