import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === "string") : []

    if (ids.length === 0) {
      return NextResponse.json({ error: "ids is required" }, { status: 400 })
    }

    await db.$transaction(
      ids.map((id, index) =>
        db.socialLink.update({
          where: { id },
          data: { order: index },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering social links:", error)
    return NextResponse.json({ error: "Failed to reorder social links" }, { status: 500 })
  }
}
