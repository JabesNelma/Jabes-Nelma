import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminMobileNav } from "@/components/admin/AdminMobileNav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 md:ml-0">
        <AdminMobileNav />
        <main className="p-4 md:p-8 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}
