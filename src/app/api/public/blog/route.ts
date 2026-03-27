import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/public/blog - List all published blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    const posts = await db.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      take: limit,
      skip: offset,
    })

    // Get total count for pagination
    const total = await db.blogPost.count({
      where: {
        published: true,
      },
    })

    // Parse tags JSON and format dates
    const formattedPosts = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
      createdAt: post.createdAt.toISOString(),
    }))

    return NextResponse.json({ 
      posts: formattedPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      }
    })
  } catch (error) {
    console.error("Error fetching public blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}
