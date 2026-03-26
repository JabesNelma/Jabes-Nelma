"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleUrlChange = (url: string) => {
    onChange(url)
    setPreview(null)
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter image URL or upload below"
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </>
          )}
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview */}
      {(preview || value) && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
          <img
            src={preview || value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => {
              onChange("")
              setPreview(null)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
