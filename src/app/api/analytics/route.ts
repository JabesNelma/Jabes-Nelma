import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { subDays, startOfDay } from "date-fns"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const now = new Date()
    const todayStart = startOfDay(now)
    const weekStart = startOfDay(subDays(now, 7))
    const monthStart = startOfDay(subDays(now, 30))

    // Total views
    const totalViews = await db.pageView.count()

    // Views today
    const viewsToday = await db.pageView.count({
      where: { createdAt: { gte: todayStart } },
    })

    // Views this week
    const viewsThisWeek = await db.pageView.count({
      where: { createdAt: { gte: weekStart } },
    })

    // Views this month
    const viewsThisMonth = await db.pageView.count({
      where: { createdAt: { gte: monthStart } },
    })

    // Top 5 pages
    const topPages = await db.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    })

    // Views per day for last 30 days
    const recentViews = await db.pageView.findMany({
      where: { createdAt: { gte: monthStart } },
      select: { createdAt: true },
    })

    // Group by date
    const viewsByDate: Record<string, number> = {}
    recentViews.forEach((view) => {
      const dateKey = view.createdAt.toISOString().split("T")[0]
      viewsByDate[dateKey] = (viewsByDate[dateKey] || 0) + 1
    })

    // Fill in missing dates
    const dailyViews = []
    for (let i = 0; i <= 30; i++) {
      const date = subDays(now, i)
      const dateKey = date.toISOString().split("T")[0]
      dailyViews.push({
        date: dateKey,
        views: viewsByDate[dateKey] || 0,
      })
    }

    return NextResponse.json({
      totalViews,
      viewsToday,
      viewsThisWeek,
      viewsThisMonth,
      topPages: topPages.map((p) => ({ path: p.path, count: p._count.id })),
      dailyViews: dailyViews.reverse(),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
