import { Metadata } from "next"
import { ExperienceTimeline } from "@/components/public/experience-timeline"
import { PublicSection } from "@/components/public/system/public-section"
import { SectionHeader } from "@/components/public/system/section-header"

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional journey and work experience",
}

export default function ExperiencePage() {
  return (
    <PublicSection>
        {/* Page Header */}
        <div className="mb-12">
          <SectionHeader
            as="h1"
            title="Work Experience"
            subtitle="A timeline of my professional journey, showcasing my roles, responsibilities, and the technologies I&apos;ve worked with."
          />
        </div>

        {/* Timeline */}
        <ExperienceTimeline />
    </PublicSection>
  )
}
