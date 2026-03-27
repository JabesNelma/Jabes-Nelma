import imageCompression from "browser-image-compression"

const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
}

export async function compressImage(file: File): Promise<File> {
  try {
    return await imageCompression(file, IMAGE_COMPRESSION_OPTIONS)
  } catch {
    throw new Error("Gagal mengompresi gambar. Coba gunakan file lain.")
  }
}
