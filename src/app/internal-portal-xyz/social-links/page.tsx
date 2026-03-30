"use client"

import { motion } from "framer-motion"
import { Share2 } from "lucide-react"

import { SocialLinksManager } from "@/components/admin/social-links/social-links-manager"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SocialLinksPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Share2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Social Links</h1>
            <p className="text-muted-foreground">
              Kelola link sosial yang tampil di footer dan halaman kontak
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Daftar Social Links</CardTitle>
            <CardDescription>
              Tambah, edit, aktifkan/nonaktifkan, dan drag untuk mengatur urutan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SocialLinksManager />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
