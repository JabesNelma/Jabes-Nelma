import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Toggle published status
    const newPublished = !existingPost.published;

    // Set publishedAt if publishing for the first time
    const publishedAt = newPublished && !existingPost.publishedAt
      ? new Date()
      : existingPost.publishedAt;

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: {
        published: newPublished,
        publishedAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Blog post ${newPublished ? 'published' : 'unpublished'} successfully`,
      post: updatedPost,
    });
  } catch (error) {
    console.error('Toggle publish error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to toggle publish status' },
      { status: 500 }
    );
  }
}
