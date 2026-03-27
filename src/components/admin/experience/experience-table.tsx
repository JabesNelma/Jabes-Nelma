"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Edit, Trash2, ArrowUpDown, Search, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Experience {
  id: string
  role: string
  company: string
  location: string | null
  description: string
  startDate: string
  endDate: string | null
  current: boolean
  technologies: string | null
  order: number
  createdAt: string
  updatedAt: string
}

type SortDirection = "asc" | "desc"

export function ExperienceTable() {
  const [experiences, setExperiences] = React.useState<Experience[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentFilter, setCurrentFilter] = React.useState<string>("all")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const fetchExperiences = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/experience")
      if (!response.ok) throw new Error("Failed to fetch experiences")
      const data = await response.json()
      setExperiences(data.experiences || [])
    } catch {
      toast.error("Failed to load experiences")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/experience/${deleteId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete experience")
      }
      toast.success("Experience deleted successfully")
      setExperiences(experiences.filter((exp) => exp.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete experience")
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDateRange = (startDate: string, endDate: string | null, current: boolean) => {
    const start = format(new Date(startDate), "MMM yyyy")
    if (current || !endDate) {
      return `${start} - Present`
    }
    const end = format(new Date(endDate), "MMM yyyy")
    return `${start} - ${end}`
  }

  // Filter and sort experiences
  const filteredExperiences = React.useMemo(() => {
    let result = [...experiences]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (exp) =>
          exp.role.toLowerCase().includes(query) ||
          exp.company.toLowerCase().includes(query)
      )
    }

    // Current filter
    if (currentFilter === "current") {
      result = result.filter((exp) => exp.current)
    } else if (currentFilter === "past") {
      result = result.filter((exp) => !exp.current)
    }

    // Sort by start date
    result.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [experiences, searchQuery, currentFilter, sortDirection])

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Work Experience</span>
          <Button asChild>
            <Link href="/internal-portal-xyz/experience/new">Add Experience</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={currentFilter} onValueChange={setCurrentFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || currentFilter !== "all"
                ? "No experiences found matching your criteria."
                : "No experiences yet. Click \"Add Experience\" to create one."}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3"
                      onClick={toggleSort}
                    >
                      Date Range
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExperiences.map((experience) => (
                  <TableRow key={experience.id}>
                    <TableCell className="font-medium">
                      {experience.role}
                    </TableCell>
                    <TableCell>{experience.company}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {experience.location || "-"}
                    </TableCell>
                    <TableCell>
                      {experience.current ? (
                        <Badge variant="default">Current</Badge>
                      ) : (
                        <Badge variant="secondary">Past</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateRange(
                        experience.startDate,
                        experience.endDate,
                        experience.current
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/internal-portal-xyz/experience/${experience.id}/edit`}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(experience.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this experience at{" "}
                                <strong>{experience.company}</strong>? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={isDeleting}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
