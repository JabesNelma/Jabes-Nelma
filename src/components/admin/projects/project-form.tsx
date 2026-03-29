"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, Plus, Star, X } from "lucide-react"

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

const projectSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(200, "Title is too long"),
    description: z.string().min(1, "Description is required").max(500, "Description is too long"),
    content: z.string().optional(),
    coverImage: z.string().url("Cover image must be a valid URL"),
    images: z.array(z.string().url("Invalid URL")),
    techStack: z.array(z.string()).optional(),
    githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    featured: z.boolean().optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.images.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["images"],
        message: "Minimal satu gambar dibutuhkan.",
      })
    }

    if (!value.images.includes(value.coverImage)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coverImage"],
        message: "Cover image harus termasuk dalam daftar images.",
      })
    }
  })

export type ProjectFormValues = z.infer<typeof projectSchema>

interface Project {
  id: string
  title: string
  description: string
  content: string | null
  coverImage: string | null
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

function parseStringArray(value: string | null): string[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    }
  } catch {
    // Ignore malformed JSON and fallback to empty list.
  }

  return []
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [techInput, setTechInput] = React.useState("")

  const existingImages = parseStringArray(project?.images || null)
  const existingTechStack = parseStringArray(project?.techStack || null)
  const existingCoverImage = project?.coverImage || existingImages[0] || ""
  const normalizedExistingImages = existingCoverImage && !existingImages.includes(existingCoverImage)
    ? [existingCoverImage, ...existingImages]
    : existingImages

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      content: project?.content || "",
      coverImage: existingCoverImage,
      images: normalizedExistingImages,
      techStack: existingTechStack,
      githubUrl: project?.githubUrl || "",
      liveUrl: project?.liveUrl || "",
      featured: project?.featured || false,
      status: (project?.status as "draft" | "published") || "draft",
    },
  })

  const techStack = form.watch("techStack") || []
  const images = form.watch("images") || []
  const coverImage = form.watch("coverImage") || ""

  React.useEffect(() => {
    if (images.length === 0 && coverImage) {
      form.setValue("coverImage", "", {
        shouldDirty: true,
        shouldValidate: true,
      })
      return
    }

    if (images.length > 0 && (!coverImage || !images.includes(coverImage))) {
      form.setValue("coverImage", images[0], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }, [coverImage, form, images])

  const addTech = () => {
    const value = techInput.trim()
    if (value && !techStack.includes(value)) {
      form.setValue("techStack", [...techStack, value], {
        shouldDirty: true,
        shouldValidate: true,
      })
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    form.setValue(
      "techStack",
      techStack.filter((t) => t !== tech),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    )
  }

  const addUploadedImage = (url: string) => {
    if (!images.includes(url)) {
      const nextImages = [...images, url]
      form.setValue("images", nextImages, {
        shouldDirty: true,
        shouldValidate: true,
      })

      if (!coverImage) {
        form.setValue("coverImage", url, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    }
  }

  const setAsCover = (url: string) => {
    const normalizedImages = images.includes(url) ? images : [url, ...images]

    form.setValue("images", normalizedImages, {
      shouldDirty: true,
      shouldValidate: true,
    })

    form.setValue("coverImage", url, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const removeImage = (url: string) => {
    const nextImages = images.filter((image) => image !== url)

    form.setValue("images", nextImages, {
      shouldDirty: true,
      shouldValidate: true,
    })

    if (coverImage === url) {
      form.setValue("coverImage", nextImages[0] || "", {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true)

    try {
      const url = isEditing ? `/api/admin/projects/${project?.id}` : "/api/admin/projects"
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
          {isEditing ? "Update the project details below." : "Fill in the details below to create a new project."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormDescription>Full project description with markdown support.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription>Technologies used in this project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Project Images *</FormLabel>
                  <div className="space-y-3">
                    <ImageUploader onUpload={addUploadedImage} disabled={isLoading} />

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {images.map((url, index) => {
                          const isCover = url === coverImage

                          return (
                            <div
                              key={`${url}-${index}`}
                              className={`group relative overflow-hidden rounded-md border ${
                                isCover ? "border-primary ring-2 ring-primary/40" : "border-border"
                              }`}
                            >
                              <img
                                src={url}
                                alt={`Project image ${index + 1}`}
                                className="h-28 w-full object-cover"
                              />

                              {isCover && (
                                <div className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                  Cover
                                </div>
                              )}

                              <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                                <Button
                                  type="button"
                                  variant={isCover ? "secondary" : "default"}
                                  size="sm"
                                  className="h-7 flex-1 text-xs"
                                  onClick={() => setAsCover(url)}
                                  disabled={isLoading || isCover}
                                >
                                  {isCover ? (
                                    <>
                                      <Check className="mr-1 h-3.5 w-3.5" />
                                      Cover
                                    </>
                                  ) : (
                                    <>
                                      <Star className="mr-1 h-3.5 w-3.5" />
                                      Set as Cover
                                    </>
                                  )}
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => removeImage(url)}
                                  disabled={isLoading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {images.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Upload minimal satu gambar untuk menentukan cover image.
                      </p>
                    )}

                    {coverImage && (
                      <p className="text-xs text-muted-foreground">
                        Cover aktif: <span className="font-medium">{coverImage}</span>
                      </p>
                    )}

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormDescription>
                    Upload multiple images, pilih salah satu sebagai cover, dan kelola gallery dari sini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} disabled={isLoading} />
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
                      <Input placeholder="https://myproject.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                      <FormDescription>Show this project prominently on your portfolio.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

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
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
