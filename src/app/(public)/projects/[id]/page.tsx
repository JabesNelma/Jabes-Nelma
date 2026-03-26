import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/public/Footer"
import { FadeIn, FadeInUp, SlideInLeft, SlideInRight } from "@/components/public/Animations"

async function getProject(id: string) {
  const project = await db.project.findUnique({
    where: { id },
  })
  return project
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const tags = JSON.parse(project.tags) as string[]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <FadeIn>
            <Link href="/projects">
              <Button variant="ghost" className="mb-4 sm:mb-6 h-9 group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Button>
            </Link>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image */}
            <SlideInLeft>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SlideInLeft>

            {/* Details */}
            <SlideInRight delay={0.2}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant={project.type === "client" ? "default" : "secondary"}>
                      {project.type === "client" ? "Client Work" : "Learning Project"}
                    </Badge>
                    {project.featured && (
                      <Badge variant="outline" className="bg-gradient-to-r from-rose-500/10 to-orange-500/10">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                    {project.title}
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs sm:text-sm hover:bg-primary/10 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto group">
                        <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        Visit Site
                      </Button>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto group">
                        <Github className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        View Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
