"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone, FileDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { FadeIn, FadeInUp, SlideInLeft, SlideInRight } from "@/components/public/Animations"

interface AboutPageProps {
  about?: {
    id: string
    bio: string
    avatarUrl: string | null
    email: string
    phone: string | null
    location: string | null
    resumeUrl: string | null
    updatedAt: string | Date
  }
}

export default function AboutPage({ about }: AboutPageProps) {
  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">About information not available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const paragraphs = about.bio.split("\n\n").filter(p => p.trim())
  const mainBio = paragraphs[0]
  const detailedBios = paragraphs.slice(1)

  const normalizedAvatarUrl = about.avatarUrl
    ? (about.avatarUrl.startsWith("http://") || about.avatarUrl.startsWith("https://") || about.avatarUrl.startsWith("/")
        ? about.avatarUrl
        : `/${about.avatarUrl}`)
    : null
  const isLocalAvatar = normalizedAvatarUrl?.startsWith("/")
  const avatarSrc = normalizedAvatarUrl
    ? (isLocalAvatar
        ? normalizedAvatarUrl
        : `${normalizedAvatarUrl}${normalizedAvatarUrl.includes("?") ? "&" : "?"}v=${new Date(about.updatedAt).getTime()}`)
    : null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          {/* Avatar & Basic Info */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12 items-center">
              {/* Avatar */}
              <SlideInLeft delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex justify-center"
                >
                  {avatarSrc ? (
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={avatarSrc}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-muted rounded-2xl flex items-center justify-center">
                      <p className="text-muted-foreground">No avatar</p>
                    </div>
                  )}
                </motion.div>
              </SlideInLeft>

              {/* Info */}
              <SlideInRight delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <FadeInUp delay={0.3}>
                      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">
                        About Me
                      </h1>
                    </FadeInUp>
                    <FadeInUp delay={0.4}>
                      <p className="text-base sm:text-lg text-muted-foreground">{mainBio}</p>
                    </FadeInUp>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-3">
                    {about.email && (
                      <FadeInUp delay={0.5}>
                        <Link href={`mailto:${about.email}`}>
                          <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                            <CardContent className="flex items-center gap-3 py-3 px-4">
                              <Mail className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium break-all">{about.email}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </FadeInUp>
                    )}

                    {about.phone && (
                      <FadeInUp delay={0.6}>
                        <Link href={`tel:${about.phone}`}>
                          <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                            <CardContent className="flex items-center gap-3 py-3 px-4">
                              <Phone className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{about.phone}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </FadeInUp>
                    )}

                    {about.location && (
                      <FadeInUp delay={0.7}>
                        <Card className="bg-card/50">
                          <CardContent className="flex items-center gap-3 py-3 px-4">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="font-medium">{about.location}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </FadeInUp>
                    )}
                  </div>

                  {/* Resume Button */}
                  {about.resumeUrl && (
                    <FadeInUp delay={0.8}>
                      <Link href={about.resumeUrl} target="_blank">
                        <Button className="w-full" size="lg">
                          <FileDown className="h-4 w-4 mr-2" />
                          Download Resume
                        </Button>
                      </Link>
                    </FadeInUp>
                  )}
                </div>
              </SlideInRight>
            </div>
          </div>

          {/* Detailed Story */}
          {detailedBios.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <FadeInUp>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Story</h2>
              </FadeInUp>

              <div className="space-y-6 sm:space-y-8">
                {detailedBios.map((paragraph, index) => (
                  <FadeInUp key={index} delay={0.1 + index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 sm:p-8">
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
