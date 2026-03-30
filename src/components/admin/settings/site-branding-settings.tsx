"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2, Save } from "lucide-react"

import { ImageUploader } from "@/components/admin/image-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { getOptimizedImageUrl } from "@/lib/image-url"

interface BrandingState {
  ownerProfileImage: string
  siteLogoUrl: string
}

const defaultState: BrandingState = {
  ownerProfileImage: "",
  siteLogoUrl: "",
}

export function SiteBrandingSettings() {
  const { toast } = useToast()

  const [formState, setFormState] = React.useState<BrandingState>(defaultState)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)

  const fetchConfig = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/site-config")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengambil konfigurasi")
      }

      const config = (data.data || {}) as Record<string, string>
      setFormState({
        ownerProfileImage: config.ownerProfileImage || "",
        siteLogoUrl: config.siteLogoUrl || "",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memuat data branding",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const saveConfig = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerProfileImage: formState.ownerProfileImage.trim(),
          siteLogoUrl: formState.siteLogoUrl.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal menyimpan konfigurasi")
      }

      toast({
        title: "Berhasil disimpan",
        description: "Foto profil dan logo sudah diperbarui.",
      })

      const config = (data.data || {}) as Record<string, string>
      setFormState({
        ownerProfileImage: config.ownerProfileImage || "",
        siteLogoUrl: config.siteLogoUrl || "",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan data branding",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Foto Profil</CardTitle>
          <CardDescription>
            Gambar ini dipakai di bagian About pada halaman publik.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border bg-muted">
              {formState.ownerProfileImage ? (
                <Image
                  src={getOptimizedImageUrl(formState.ownerProfileImage, 300, 80)}
                  alt="Foto profil"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <ImageUploader
              onUpload={(url) =>
                setFormState((prev) => ({
                  ...prev,
                  ownerProfileImage: url,
                }))
              }
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">URL Foto Profil</p>
            <Input
              value={formState.ownerProfileImage}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  ownerProfileImage: event.target.value,
                }))
              }
              placeholder="https://..."
              disabled={isSaving}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Situs</CardTitle>
          <CardDescription>
            Logo ini ditampilkan di header publik dan sidebar admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-muted">
              {formState.siteLogoUrl ? (
                <Image
                  src={getOptimizedImageUrl(formState.siteLogoUrl, 180, 80)}
                  alt="Logo situs"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  Logo
                </div>
              )}
            </div>
            <ImageUploader
              onUpload={(url) =>
                setFormState((prev) => ({
                  ...prev,
                  siteLogoUrl: url,
                }))
              }
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">URL Logo</p>
            <Input
              value={formState.siteLogoUrl}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  siteLogoUrl: event.target.value,
                }))
              }
              placeholder="https://..."
              disabled={isSaving}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveConfig} disabled={isLoading || isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
