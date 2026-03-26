import { db } from "@/lib/db"
import { ProjectCard } from "@/components/public/ProjectCard"
import { Footer } from "@/components/public/Footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/public/Animations"

async function getProjects() {
  const projects = await db.project.findMany({
    orderBy: [{ isPinned: "desc" }, { year: "desc" }, { createdAt: "desc" }],
  })
  return projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  const clientProjects = projects.filter((p) => p.type === "client")
  const learningProjects = projects.filter((p) => p.type === "learning")

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <FadeIn>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              A collection of my work, including client projects and learning experiments.
              Each project represents different skills and technologies I&apos;ve worked with.
            </p>
          </FadeIn>

          <Tabs defaultValue="all" className="w-full">
            <FadeIn delay={0.3}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6 sm:mb-8 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
                  All ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="client" className="text-xs sm:text-sm py-2">
                  Client ({clientProjects.length})
                </TabsTrigger>
                <TabsTrigger value="learning" className="text-xs sm:text-sm py-2">
                  Learning ({learningProjects.length})
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value="all">
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {projects.length === 0 && (
                <FadeIn>
                  <p className="text-center text-muted-foreground py-12">
                    No projects yet.
                  </p>
                </FadeIn>
              )}
            </TabsContent>

            <TabsContent value="client">
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {clientProjects.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {clientProjects.length === 0 && (
                <FadeIn>
                  <p className="text-center text-muted-foreground py-12">
                    No client projects yet.
                  </p>
                </FadeIn>
              )}
            </TabsContent>

            <TabsContent value="learning">
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {learningProjects.map((project) => (
                  <StaggerItem key={project.id}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {learningProjects.length === 0 && (
                <FadeIn>
                  <p className="text-center text-muted-foreground py-12">
                    No learning projects yet.
                  </p>
                </FadeIn>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}
