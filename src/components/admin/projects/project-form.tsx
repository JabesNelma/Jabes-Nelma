"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "@/components/admin/image-uploader"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  content: z.string().optional(),
  images: z.array(z.string().url("Invalid URL")).optional(),
  techStack: z.array(z.string()).optional(),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

interface Project {
  id: string
  title: string
  description: string
  content: string | null
  images: string | null
  techStack: string | null
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  status: string
}

interface ProjectFormProps {
  project?: Project
  isEditing?: boolean
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [techInput, setTechInput] = React.useState("")

  // Parse existing data
  const existingImages = project?.images ? JSON.parse(project.images) : []
  const existingTechStack = project?.techStack ? JSON.parse(project.techStack) : []

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      content: project?.content || "",
      images: existingImages,
      techStack: existingTechStack,
      githubUrl: project?.githubUrl || "",
      liveUrl: project?.liveUrl || "",
      featured: project?.featured || false,
      status: (project?.status as "draft" | "published") || "draft",
    },
  })

  const techStack = form.watch("techStack") || []
  const images = form.watch("images") || []

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      form.setValue("techStack", [...techStack, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    form.setValue(
      "techStack",
      techStack.filter((t) => t !== tech)
    )
  }

  const addUploadedImage = (url: string) => {
    if (!images.includes(url)) {
      form.setValue("images", [...images, url], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const removeImage = (index: number) => {
    form.setValue(
      "images",
      images.filter((_, i) => i !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    )
  }

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true)

    try {
      const url = isEditing
        ? `/api/admin/projects/${project?.id}`
        : "/api/admin/projects"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to save project")
      }

      // Redirect to projects list
      router.push("/internal-portal-xyz/projects")
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the project details below."
            : "Fill in the details below to create a new project."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your project..."
                      className="min-h-[100px]"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary that appears in project cards (max 500 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content (Markdown) */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed project description in markdown..."
                      className="min-h-[200px] font-mono"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Full project description with markdown support.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="techStack"
              render={() => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="React, Node.js, etc."
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTech()
                          }
                        }}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTech}
                        disabled={isLoading || !techInput.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="gap-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTech(tech)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormDescription>
                    Technologies used in this project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="space-y-3">
                    <ImageUploader onUpload={addUploadedImage} disabled={isLoading} />

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {images.map((url, index) => (
                          <div
                            key={`${url}-${index}`}
                            className="group relative overflow-hidden rounded-md border"
                          >
                            <img
                              src={url}
                              alt={`Project image ${index + 1}`}
                              className="h-28 w-full object-cover"
                            />

                            <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                              {index === 0 ? "Cover" : `Image ${index + 1}`}
                            </div>

                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute right-2 top-2 h-7 w-7"
                              onClick={() => removeImage(index)}
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    Upload images from your computer. The first image becomes the cover image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URLs */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/repo"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://myproject.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status and Featured */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                      <FormDescription>
                        Show this project prominently on your portfolio.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Project"
                ) : (
                  "Create Project"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
