import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const socialLinks = await db.socialLink.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        order: "asc",
      },
    })

    return NextResponse.json({ socialLinks })
  } catch (error) {
    console.error("Social links error:", error)
    return NextResponse.json({ socialLinks: [] })
  }
}
