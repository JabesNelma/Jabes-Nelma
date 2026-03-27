import { Metadata } from "next"
import { BlogList } from "@/components/public/blog-list"

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Thoughts, tutorials, and insights",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </div>

        {/* Blog List */}
        <BlogList />
      </div>
    </div>
  )
}
