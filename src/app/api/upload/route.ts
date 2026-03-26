import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUri = `data:${file.type};base64,${base64}`

    // Upload to Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      // For development, return a placeholder URL
      return NextResponse.json({ 
        url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(file.name)}` 
      })
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: dataUri,
          api_key: apiKey,
          timestamp: Math.floor(Date.now() / 1000),
          signature: await generateSignature(apiSecret),
        }),
      }
    )

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error.message)
    }

    return NextResponse.json({ url: data.secure_url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

async function generateSignature(apiSecret: string) {
  const timestamp = Math.floor(Date.now() / 1000)
  const message = `timestamp=${timestamp}${apiSecret}`
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest("SHA-1", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}
