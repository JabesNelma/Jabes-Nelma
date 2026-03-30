"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

import { SiteBrandingSettings } from "@/components/admin/settings/site-branding-settings"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SiteSettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Setelan Branding</h1>
            <p className="text-muted-foreground">
              Kelola foto profil dan logo situs langsung dari admin.
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
            <CardTitle>Branding Situs</CardTitle>
            <CardDescription>
              Perubahan akan langsung dipakai pada tampilan publik dan area admin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SiteBrandingSettings />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
