import { db } from "@/lib/db"
import ClientAbout from "./client-about"

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const about = await db.about.findFirst()

  return <ClientAbout about={about || undefined} />
}
