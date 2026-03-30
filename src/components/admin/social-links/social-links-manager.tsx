"use client"

import * as React from "react"
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  ExternalLink,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { fallbackSocialIcon, socialIconMap, getSocialLabel } from "@/lib/social-icon-map"
import { socialPlatforms, type SocialPlatform } from "@/lib/social-platforms"

interface SocialLink {
  id: string
  platform: SocialPlatform
  url: string
  isActive: boolean
  order: number
}

interface SocialLinkFormState {
  platform: SocialPlatform
  url: string
  isActive: boolean
}

const defaultFormState: SocialLinkFormState = {
  platform: "github",
  url: "",
  isActive: true,
}

function SortableSocialLinkItem({
  link,
  onEdit,
  onToggle,
  onDelete,
  actionLoadingId,
}: {
  link: SocialLink
  onEdit: (link: SocialLink) => void
  onToggle: (link: SocialLink, isActive: boolean) => void
  onDelete: (id: string) => void
  actionLoadingId: string | null
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Icon = socialIconMap[link.platform] || fallbackSocialIcon

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-card px-3 py-3 shadow-xs transition ${
        isDragging ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
            aria-label="Drag to reorder"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{getSocialLabel(link.platform)}</p>
              <Badge variant={link.isActive ? "default" : "secondary"}>
                {link.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="max-w-[220px] truncate">{link.url}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Shown</span>
            <Switch
              checked={link.isActive}
              onCheckedChange={(checked) => onToggle(link, checked)}
              disabled={actionLoadingId === link.id}
            />
          </div>

          <Button variant="ghost" size="icon" onClick={() => onEdit(link)}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(link.id)}
            disabled={actionLoadingId === link.id}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SocialLinksManager() {
  const { toast } = useToast()

  const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [actionLoadingId, setActionLoadingId] = React.useState<string | null>(null)

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [editingLink, setEditingLink] = React.useState<SocialLink | null>(null)
  const [formState, setFormState] = React.useState<SocialLinkFormState>(defaultFormState)

  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const fetchSocialLinks = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/social-links")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch social links")
      }

      setSocialLinks(data.socialLinks || [])
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch social links",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    fetchSocialLinks()
  }, [fetchSocialLinks])

  const resetForm = () => {
    setEditingLink(null)
    setFormState(defaultFormState)
  }

  const openCreateDialog = () => {
    resetForm()
    setDialogOpen(true)
  }

  const openEditDialog = (link: SocialLink) => {
    setEditingLink(link)
    setFormState({
      platform: link.platform,
      url: link.url,
      isActive: link.isActive,
    })
    setDialogOpen(true)
  }

  const handleSubmit = async () => {
    const trimmedUrl = formState.url.trim()

    if (!trimmedUrl || !URL.canParse(trimmedUrl)) {
      toast({
        variant: "destructive",
        title: "URL tidak valid",
        description: "Masukkan URL lengkap seperti https://github.com/username",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const endpoint = editingLink
        ? `/api/admin/social-links/${editingLink.id}`
        : "/api/admin/social-links"
      const method = editingLink ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: formState.platform,
          url: trimmedUrl,
          isActive: formState.isActive,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save social link")
      }

      toast({
        title: editingLink ? "Social link updated" : "Social link created",
        description: editingLink
          ? "Perubahan berhasil disimpan."
          : "Social link baru berhasil ditambahkan.",
      })

      setDialogOpen(false)
      resetForm()
      fetchSocialLinks()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save social link",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggle = async (link: SocialLink, isActive: boolean) => {
    setActionLoadingId(link.id)
    try {
      const response = await fetch(`/api/admin/social-links/${link.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status")
      }

      setSocialLinks((prev) =>
        prev.map((item) => (item.id === link.id ? { ...item, isActive } : item))
      )
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update social link",
      })
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setActionLoadingId(deleteId)
    try {
      const response = await fetch(`/api/admin/social-links/${deleteId}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete social link")
      }

      setSocialLinks((prev) => prev.filter((item) => item.id !== deleteId))
      toast({
        title: "Social link deleted",
        description: "Link berhasil dihapus.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete social link",
      })
    } finally {
      setActionLoadingId(null)
      setDeleteId(null)
    }
  }

  const persistReorder = async (reordered: SocialLink[]) => {
    try {
      const response = await fetch("/api/admin/social-links/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: reordered.map((item) => item.id) }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to reorder social links")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reorder social links",
      })
      fetchSocialLinks()
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = socialLinks.findIndex((item) => item.id === active.id)
    const newIndex = socialLinks.findIndex((item) => item.id === over.id)

    if (oldIndex < 0 || newIndex < 0) {
      return
    }

    const reordered = arrayMove(socialLinks, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index,
    }))

    setSocialLinks(reordered)
    persistReorder(reordered)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Drag item untuk atur urutan tampilan di footer dan contact section.
        </p>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Social Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLink ? "Edit Social Link" : "Add Social Link"}
              </DialogTitle>
              <DialogDescription>
                Pilih platform sosial, masukkan URL, lalu atur status aktif.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Platform</p>
                <Select
                  value={formState.platform}
                  onValueChange={(value: SocialPlatform) =>
                    setFormState((prev) => ({ ...prev, platform: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialPlatforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {getSocialLabel(platform)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">URL</p>
                <Input
                  type="url"
                  placeholder="https://"
                  value={formState.url}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, url: event.target.value }))
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <p className="text-sm font-medium">Active</p>
                <Switch
                  checked={formState.isActive}
                  onCheckedChange={(checked) =>
                    setFormState((prev) => ({ ...prev, isActive: checked }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex h-28 items-center justify-center rounded-lg border">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : socialLinks.length === 0 ? (
        <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          Belum ada social link. Klik Add Social Link untuk menambahkan.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={socialLinks.map((link) => link.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <SortableSocialLinkItem
                  key={link.id}
                  link={link}
                  onEdit={openEditDialog}
                  onToggle={handleToggle}
                  onDelete={(id) => setDeleteId(id)}
                  actionLoadingId={actionLoadingId}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <AlertDialog open={Boolean(deleteId)} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete social link?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Link sosial akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(actionLoadingId)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={Boolean(actionLoadingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
