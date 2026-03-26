import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react"
import { db } from "@/lib/db"
import { ProjectCard } from "@/components/public/ProjectCard"
import { SkillCard } from "@/components/public/SkillCard"
import { HeroSceneWrapper } from "@/components/3d/HeroSceneWrapper"
import { Footer } from "@/components/public/Footer"
import {
  FadeIn,
  FadeInUp,
  FadeInScale,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
  TypewriterText,
} from "@/components/public/Animations"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const about = await db.about.findFirst()
  const normalizedAvatarUrl = about?.avatarUrl
    ? (about.avatarUrl.startsWith("http://") || about.avatarUrl.startsWith("https://") || about.avatarUrl.startsWith("/")
        ? about.avatarUrl
        : `/${about.avatarUrl}`)
    : null
  const isLocalAvatar = normalizedAvatarUrl?.startsWith("/")
  const avatarSrc = normalizedAvatarUrl
    ? (isLocalAvatar
        ? normalizedAvatarUrl
        : `${normalizedAvatarUrl}${normalizedAvatarUrl.includes("?") ? "&" : "?"}v=${new Date(about?.updatedAt ?? Date.now()).getTime()}`)
    : null
  const focus = await db.currentFocus.findFirst()
  const featuredProjects = await db.project.findMany({
    where: { featured: true },
    take: 3,
    orderBy: [{ isPinned: "desc" }, { year: "desc" }, { createdAt: "desc" }],
  })
  const skills = await db.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* 3D Scene - Mobile First */}
            <div className="relative order-1 lg:order-2">
              <FadeInScale delay={0.2}>
                <HeroSceneWrapper />
              </FadeInScale>
            </div>
            
            {/* Text Content */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
              <SlideInLeft delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    {about?.email?.split("@")[0] || "Developer"}
                  </span>
                </h1>
              </SlideInLeft>
              <FadeIn delay={0.3}>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  <TypewriterText
                    text={
                      about?.bio?.slice(0, 120)
                        ? `${about.bio.slice(0, 120)}${about.bio.length > 120 ? "..." : ""}`
                        : "Full-stack developer passionate about building beautiful, functional applications."
                    }
                    delay={0.4}
                    speed={14}
                  />
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link href="/projects" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto group">
                      View Projects
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  {about?.resumeUrl && (
                    <Link href={about.resumeUrl} target="_blank" className="w-full sm:w-auto">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Download CV
                      </Button>
                    </Link>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">About Me</h2>
          </FadeInUp>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <SlideInLeft delay={0.2}>
              <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  {avatarSrc && (
                    <div className="mb-4 flex justify-center md:justify-start">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden border">
                        <Image
                          src={avatarSrc}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {about?.bio || "Add your bio in the admin panel."}
                  </p>
                </CardContent>
              </Card>
            </SlideInLeft>
            <SlideInRight delay={0.3}>
              <div className="space-y-3 sm:space-y-4">
                {about?.email && (
                  <div className="flex items-center gap-3 text-sm sm:text-base group">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="break-all">{about.email}</span>
                  </div>
                )}
                {about?.phone && (
                  <div className="flex items-center gap-3 text-sm sm:text-base group">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span>{about.phone}</span>
                  </div>
                )}
                {about?.location && (
                  <div className="flex items-center gap-3 text-sm sm:text-base group">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span>{about.location}</span>
                  </div>
                )}
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      {focus && (
        <section className="py-10 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <FadeInUp>
              <div className="max-w-2xl mx-auto text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted hover:shadow-lg transition-shadow duration-300">
                <Badge variant="outline" className="mb-3 sm:mb-4">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Current Focus
                </Badge>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{focus.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <TypewriterText text={focus.description} delay={0.2} speed={18} />
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Projects</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link href="/projects">
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </FadeIn>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProjects.map((project, index) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          {featuredProjects.length === 0 && (
            <FadeIn>
              <p className="text-center text-muted-foreground py-8">
                No featured projects yet.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Skills</h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <StaggerItem key={skill.id}>
                <SkillCard skill={skill} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          {skills.length === 0 && (
            <FadeIn>
              <p className="text-center text-muted-foreground py-8">
                No skills added yet.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
