import { NextResponse } from "next/server"
import ImageKit from "imagekit"

import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim()
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim()
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim()

    if (!publicKey || !privateKey || !urlEndpoint) {
      return NextResponse.json(
        { error: "Konfigurasi ImageKit belum lengkap." },
        { status: 500 }
      )
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    })

    const { token, expire, signature } = imagekit.getAuthenticationParameters()

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    })
  } catch (error) {
    console.error("ImageKit auth error:", error)
    return NextResponse.json(
      { error: "Gagal membuat signature upload ImageKit." },
      { status: 500 }
    )
  }
}
