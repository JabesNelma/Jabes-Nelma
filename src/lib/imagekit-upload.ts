interface ImageKitAuthResponse {
  signature: string
  token: string
  expire: number
  publicKey: string
}

interface ImageKitUploadResponse {
  url?: string
  message?: string
  help?: string
  status?: string
  reason?: string
  error?: {
    message?: string
  }
}

async function parseJsonResponse<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function uploadImageToImageKit(file: File): Promise<string> {
  const authResponse = await fetch("/api/admin/imagekit-auth", {
    method: "GET",
  })

  const auth = (await parseJsonResponse<Partial<ImageKitAuthResponse> & {
    error?: string
  }>(authResponse)) || {}

  if (!authResponse.ok || !auth.signature || !auth.token || !auth.expire || !auth.publicKey) {
    throw new Error(auth.error || "Gagal mengambil kredensial upload ImageKit.")
  }

  if (!auth.publicKey.startsWith("public_")) {
    throw new Error("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY tidak valid. Pastikan memakai key yang diawali 'public_'.")
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("fileName", file.name)
  formData.append("useUniqueFileName", "true")
  formData.append("folder", "/projects")
  formData.append("signature", auth.signature)
  formData.append("expire", String(auth.expire))
  formData.append("token", auth.token)
  formData.append("publicKey", auth.publicKey)

  const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  })

  const uploadResult = (await parseJsonResponse<ImageKitUploadResponse>(uploadResponse)) || {}

  if (!uploadResponse.ok || !uploadResult.url) {
    const imageKitMessage =
      uploadResult.error?.message ||
      uploadResult.message ||
      uploadResult.reason

    const help = uploadResult.help ? ` ${uploadResult.help}` : ""

    if ((imageKitMessage || "").toLowerCase().includes("invalid signature")) {
      throw new Error(
        "Signature ImageKit tidak valid. Cek pasangan NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY dan IMAGEKIT_PRIVATE_KEY harus dari akun yang sama, lalu restart dev server."
      )
    }

    throw new Error(
      imageKitMessage
        ? `${imageKitMessage}${help}`
        : `Upload ke ImageKit gagal (HTTP ${uploadResponse.status}).`
    )
  }

  return uploadResult.url
}
