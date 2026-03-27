import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostContent } from "@/components/public/blog-post-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/public/blog/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return {
        title: "Post Not Found | Portfolio",
      }
    }
    
    const data = await response.json()
    const post = data.post
    
    return {
      title: `${post.title} | Portfolio`,
      description: post.excerpt || post.content.slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.slice(0, 160),
        type: "article",
        publishedTime: post.publishedAt,
        authors: [post.author],
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch {
    return {
      title: "Blog Post | Portfolio",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  
  // Fetch the post server-side
  let post = null
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/public/blog/${slug}`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      const data = await response.json()
      post = data.post
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
  }
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostContent post={post} />
}
