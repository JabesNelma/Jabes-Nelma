export function getOptimizedImageUrl(url: string, width: number, quality = 80): string {
  if (!url) return url

  if (url.includes("ik.imagekit.io")) {
    if (url.includes("/tr:")) {
      return url
    }

    const [base, query = ""] = url.split("?")
    const transformed = base.replace("ik.imagekit.io/", `ik.imagekit.io/tr:w-${width},q-${quality}/`)
    return query ? `${transformed}?${query}` : transformed
  }

  if (url.includes("res.cloudinary.com")) {
    if (url.includes("/image/upload/f_")) {
      return url
    }

    return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`)
  }

  return url
}
