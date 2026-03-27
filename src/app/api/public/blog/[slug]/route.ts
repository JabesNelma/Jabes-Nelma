import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/public/blog/[slug] - Get single published blog post by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const post = await db.blogPost.findFirst({
      where: {
        slug,
        published: true,
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    // Parse tags JSON and format dates
    const formattedPost = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
      createdAt: post.createdAt.toISOString(),
    }

    return NextResponse.json({ post: formattedPost })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}
