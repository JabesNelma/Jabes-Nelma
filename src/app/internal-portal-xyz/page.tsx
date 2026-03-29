"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  FileText,
  FolderKanban,
  Mail,
  ExternalLink,
  ArrowRight,
  Clock,
} from "lucide-react"
import { format } from "date-fns"

import { StatsCards } from "@/components/admin/stats-cards"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  isRead: boolean
  createdAt: string
}

// Mock data - in real app, this would come from API
const mockMessages: Message[] = [
  {
    id: "1",
    name: "Alex Santos",
    email: "alex@company.com",
    subject: "Project Inquiry",
    message: "Hi, I'm interested in your portfolio and would like to discuss a potential collaboration...",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    subject: "Job Opportunity",
    message: "We have an exciting opportunity that matches your skills...",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.io",
    subject: "Partnership Request",
    message: "I would love to discuss a potential partnership...",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@design.co",
    subject: "Design Consultation",
    message: "Looking for a design consultation for my new project...",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

const quickActions = [
  {
    title: "Add Project",
    description: "Create a new portfolio project",
    icon: FolderKanban,
    href: "/internal-portal-xyz/projects/new",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Write Blog Post",
    description: "Publish a new article",
    icon: FileText,
    href: "/internal-portal-xyz/blog/new",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "View Messages",
    description: "Check your inbox",
    icon: Mail,
    href: "/internal-portal-xyz/messages",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
]

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return format(date, "MMM d, yyyy")
}

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState({
    projects: 12,
    skills: 24,
    messages: 8,
    blogPosts: 6,
  })

  React.useEffect(() => {
    // Fetch stats from API
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats(data.stats)
        }
      })
      .catch(() => {
        // Use default stats on error
      })
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang! Berikut adalah ringkasan portoflio Anda.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button asChild>
            <Link href="/">
              <ExternalLink className="mr-2 h-4 w-4" />
              Lihat Situs
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pesan Terbaru</CardTitle>
                <CardDescription>
                  Kiriman formulir kontak terbaru
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/internal-portal-xyz/messages">
                  Lihat semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-4">
                  {mockMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/internal-portal-xyz/messages/${message.id}`}
                        className="block"
                      >
                        <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {message.name}
                              </span>
                              {!message.isRead && (
                                <Badge variant="secondary" className="text-xs">
                                  Baru
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {message.subject || message.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatRelativeTime(message.createdAt)}
                          </div>
                        </div>
                      </Link>
                      {index < mockMessages.length - 1 && <Separator className="mt-4" />}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Tugas dan pintasan umum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4 px-4"
                    >
                      <div
                        className={`mr-4 flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}
                      >
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              ))}
              <Separator className="my-4" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/internal-portal-xyz/settings">
                    <Plus className="mr-2 h-4 w-4" />
                    More Actions
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
