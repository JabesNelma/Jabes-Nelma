import { Metadata } from "next"
import { BlogList } from "@/components/public/blog-list"
import { PublicSection } from "@/components/public/system/public-section"
import { SectionHeader } from "@/components/public/system/section-header"

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Thoughts, tutorials, and insights",
}

export default function BlogPage() {
  return (
    <PublicSection>
        {/* Page Header */}
        <div className="mb-12">
          <SectionHeader
            as="h1"
            title="Blog"
            subtitle="Thoughts, tutorials, and insights about web development, design, and technology."
          />
        </div>

        {/* Blog List */}
        <BlogList />
    </PublicSection>
  )
}
