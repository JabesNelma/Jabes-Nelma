import { Navbar } from "@/components/public/Navbar"
import VisitorTracker from "@/components/public/VisitorTracker"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <VisitorTracker />
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  )
}
