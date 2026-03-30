export function getOptimizedImageUrl(url: string, width: number, quality = 80): string {
  if (!url) return url

  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "")
  let normalizedUrl = url

  // Backward compatibility: some legacy records store relative image paths.
  if (normalizedUrl.startsWith("/") && imageKitEndpoint) {
    normalizedUrl = `${imageKitEndpoint}${normalizedUrl}`
  }

  if (normalizedUrl.includes("ik.imagekit.io")) {
    if (normalizedUrl.includes("/tr:")) {
      return normalizedUrl
    }

    try {
      const parsed = new URL(normalizedUrl)
      const segments = parsed.pathname.split("/").filter(Boolean)

      if (segments.length >= 2) {
        const [endpointId, ...rest] = segments
        parsed.pathname = `/${endpointId}/tr:w-${width},q-${quality}/${rest.join("/")}`
        return parsed.toString()
      }

      return normalizedUrl
    } catch {
      return normalizedUrl
    }
  }

  if (normalizedUrl.includes("res.cloudinary.com")) {
    if (normalizedUrl.includes("/image/upload/f_")) {
      return normalizedUrl
    }

    return normalizedUrl.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`)
  }

  return normalizedUrl
}
