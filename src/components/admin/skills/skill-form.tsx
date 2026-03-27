"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

const skillCategories = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Database", label: "Database" },
  { value: "DevOps", label: "DevOps" },
  { value: "Tools", label: "Tools" },
  { value: "Other", label: "Other" },
] as const

const skillFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().max(100, "Icon must be less than 100 characters").optional().or(z.literal("")),
  proficiency: z.number().min(0).max(100),
  order: z.number().int().min(0).optional(),
})

type SkillFormValues = z.infer<typeof skillFormSchema>

interface Skill {
  id: string
  name: string
  category: string
  icon: string | null
  proficiency: number
  order: number
  createdAt: string
  updatedAt: string
}

interface SkillFormProps {
  skill?: Skill
  isEditing?: boolean
}

export function SkillForm({ skill, isEditing = false }: SkillFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const defaultValues: Partial<SkillFormValues> = React.useMemo(() => {
    if (skill) {
      return {
        name: skill.name,
        category: skill.category,
        icon: skill.icon || "",
        proficiency: skill.proficiency,
        order: skill.order,
      }
    }
    return {
      name: "",
      category: "",
      icon: "",
      proficiency: 80,
      order: 0,
    }
  }, [skill])

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues,
  })

  const proficiency = form.watch("proficiency")

  const getProficiencyLabel = (value: number) => {
    if (value >= 90) return "Expert"
    if (value >= 70) return "Advanced"
    if (value >= 50) return "Intermediate"
    if (value >= 30) return "Beginner"
    return "Novice"
  }

  const getProficiencyColor = (value: number) => {
    if (value >= 90) return "text-green-600 dark:text-green-400"
    if (value >= 70) return "text-blue-600 dark:text-blue-400"
    if (value >= 50) return "text-yellow-600 dark:text-yellow-400"
    if (value >= 30) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  async function onSubmit(data: SkillFormValues) {
    setIsSubmitting(true)
    try {
      const url = isEditing && skill
        ? `/api/admin/skills/${skill.id}`
        : "/api/admin/skills"
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
        throw new Error(result.error || "Failed to save skill")
      }

      toast({
        title: isEditing ? "Skill updated" : "Skill created",
        description: isEditing
          ? "The skill has been updated successfully."
          : "The skill has been created successfully.",
      })

      router.push("/internal-portal-xyz/skills")
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., React, Node.js, PostgreSQL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Icon Field */}
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., react, node-js, database" {...field} />
                </FormControl>
                <FormDescription>
                  Optional icon name or identifier
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Field */}
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
                  />
                </FormControl>
                <FormDescription>
                  Display order (lower appears first)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Proficiency Field */}
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Proficiency</FormLabel>
                <span className={`text-sm font-medium ${getProficiencyColor(proficiency)}`}>
                  {proficiency}% - {getProficiencyLabel(proficiency)}
                </span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Set your skill level from 0 (Novice) to 100 (Expert)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/internal-portal-xyz/skills")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Skill" : "Create Skill"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
