"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  tags: string[]
  author: string
  publishedAt: string | null
  readTime: number
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export function BlogCard({ post, index }: BlogCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const publishedDate = post.publishedAt || null

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-card via-card to-card/95 hover:shadow-xl hover:shadow-primary/10 relative">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
          <div className="absolute inset-[1px] bg-card rounded-lg" />
          
          {/* Card Content Wrapper */}
          <div className="relative z-10">
            {/* Cover Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20">
                  <span className="text-6xl font-bold bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 bg-clip-text text-transparent">
                    {post.title.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Read Time Badge */}
              <motion.div 
                className="absolute top-3 right-3"
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Badge className="bg-gradient-to-r from-primary/80 to-purple-500/80 text-white border-0 backdrop-blur-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime} min
                </Badge>
              </motion.div>
            </div>

            <CardContent className="p-5 space-y-3">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.15 + i * 0.05 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal bg-gradient-to-r from-secondary to-secondary/80 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal border-dashed">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Title */}
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                {publishedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{formatDate(publishedDate)}</span>
                  </div>
                )}
                
                {/* Read More */}
                <motion.div 
                  className="flex items-center gap-1 text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
                  whileHover={{ x: 3 }}
                >
                  Read more
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
