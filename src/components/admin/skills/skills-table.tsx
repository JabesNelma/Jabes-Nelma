"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

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

interface SkillsTableProps {
  initialSkills?: Skill[]
}

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
  Backend: "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
  Database: "bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20",
  DevOps: "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20",
  Tools: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20",
  Other: "bg-gray-500/10 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20",
}

const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools", "Other"]

export function SkillsTable({ initialSkills = [] }: SkillsTableProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [skills, setSkills] = React.useState<Skill[]>(initialSkills)
  const [isLoading, setIsLoading] = React.useState(!initialSkills.length)
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")
  const [sortBy, setSortBy] = React.useState<"order" | "proficiency" | "name">("order")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Fetch skills on mount
  const fetchSkills = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (categoryFilter !== "All") params.set("category", categoryFilter)
      params.set("sortBy", sortBy)
      params.set("sortOrder", sortOrder)

      const response = await fetch(`/api/admin/skills?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setSkills(data.skills)
      } else {
        throw new Error(data.error || "Failed to fetch skills")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch skills",
      })
    } finally {
      setIsLoading(false)
    }
  }, [search, categoryFilter, sortBy, sortOrder, toast])

  React.useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const handleSort = (column: "order" | "proficiency" | "name") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/skills/${deleteId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete skill")
      }

      toast({
        title: "Skill deleted",
        description: "The skill has been deleted successfully.",
      })

      setSkills((prev) => prev.filter((s) => s.id !== deleteId))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete skill",
      })
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const getProficiencyLabel = (value: number) => {
    if (value >= 90) return "Expert"
    if (value >= 70) return "Advanced"
    if (value >= 50) return "Intermediate"
    if (value >= 30) return "Beginner"
    return "Novice"
  }

  const getProficiencyColor = (value: number) => {
    if (value >= 90) return "bg-green-500"
    if (value >= 70) return "bg-blue-500"
    if (value >= 50) return "bg-yellow-500"
    if (value >= 30) return "bg-orange-500"
    return "bg-red-500"
  }

  const SortIcon = ({ column }: { column: "order" | "proficiency" | "name" }) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Add Button */}
        <Button asChild>
          <Link href="/internal-portal-xyz/skills/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <SortIcon column="name" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => handleSort("proficiency")}
                >
                  Proficiency
                  <SortIcon column="proficiency" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => handleSort("order")}
                >
                  Order
                  <SortIcon column="order" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading skills...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="text-muted-foreground">
                    No skills found.{" "}
                    {search || categoryFilter !== "All"
                      ? "Try adjusting your filters."
                      : "Add your first skill to get started."}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {skill.icon && (
                        <span className="text-muted-foreground">{skill.icon}</span>
                      )}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={categoryColors[skill.category] || categoryColors.Other}
                    >
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <Progress
                        value={skill.proficiency}
                        className="h-2 w-20"
                      />
                      <span className="text-sm text-muted-foreground w-20">
                        {skill.proficiency}% ({getProficiencyLabel(skill.proficiency)})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{skill.order}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/internal-portal-xyz/skills/${skill.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(skill.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this skill? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
