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
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon: string | null
  order: number
}

const categories = ["Frontend", "Backend", "Database", "DevOps", "Language", "Other"]
const iconOptions = ["Code", "Server", "Database", "Globe", "FileCode", "Container", "Palette", "Wrench"]

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend",
    level: 3,
    icon: "Code",
  })

  useEffect(() => {
    fetch("/api/admin/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    if (!newSkill.name) {
      toast.error("Please enter a skill name")
      return
    }

    try {
      const response = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      })

      const data = await response.json()
      setSkills([...skills, data])
      setNewSkill({ name: "", category: "Frontend", level: 3, icon: "Code" })
      toast.success("Skill added")
    } catch (error) {
      toast.error("Failed to add skill")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
      setSkills(skills.filter((s) => s.id !== id))
      toast.success("Skill deleted")
    } catch (error) {
      toast.error("Failed to delete skill")
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
      <h1 className="text-3xl font-bold">Skills</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="React"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level (1-5)</Label>
              <Select
                value={String(newSkill.level)}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SelectItem key={level} value={String(level)}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={newSkill.icon}
                onValueChange={(value) => setNewSkill({ ...newSkill, icon: value })}
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
          <CardTitle>Your Skills</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.level * 20} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground">{skill.level}/5</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {skills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No skills yet
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
