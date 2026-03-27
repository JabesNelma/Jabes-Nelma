import { Metadata } from "next"
import { ExperienceTimeline } from "@/components/public/experience-timeline"

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional journey and work experience",
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Work Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional journey, showcasing my roles, responsibilities, and the technologies I&apos;ve worked with.
          </p>
        </div>

        {/* Timeline */}
        <ExperienceTimeline />
      </div>
    </div>
  )
}
