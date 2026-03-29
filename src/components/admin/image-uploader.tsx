"use client"

import * as React from "react"
import { Loader2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { compressImage } from "@/lib/image-compression"
import { uploadImageToImageKit } from "@/lib/imagekit-upload"

interface ImageUploaderProps {
  onUpload: (url: string) => void
  disabled?: boolean
  maxFileSizeMB?: number
}

export function ImageUploader({
  onUpload,
  disabled = false,
  maxFileSizeMB = 10,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) {
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          throw new Error("File tidak valid. Pilih file gambar (JPG, PNG, WEBP, dll).")
        }

        if (file.size > maxFileSizeMB * 1024 * 1024) {
          throw new Error(`Ukuran file terlalu besar. Maksimal ${maxFileSizeMB}MB.`)
        }

        // Required flow: select file -> compress -> upload -> receive URL -> send to parent.
        const compressedFile = await compressImage(file)
        const uploadedUrl = await uploadImageToImageKit(compressedFile)
        onUpload(uploadedUrl)
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Terjadi kesalahan saat upload gambar."
      )
    } finally {
      setIsUploading(false)
      event.target.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengunggah...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 h-4 w-4" />
              Pilih Gambar
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">JPG, PNG, WEBP (maks. {maxFileSizeMB}MB)</p>
      </div>

      {isUploading && (
        <p className="text-sm text-muted-foreground">
          Mengompresi dan mengunggah gambar ke ImageKit...
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
