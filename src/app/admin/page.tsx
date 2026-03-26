"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Users, TrendingUp, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsData {
  totalViews: number
  viewsToday: number
  viewsThisWeek: number
  viewsThisMonth: number
  topPages: { path: string; count: number }[]
  dailyViews: { date: string; views: number }[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalViews || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.viewsToday || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.viewsThisWeek || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.viewsThisMonth || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Top Pages */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.dailyViews || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => value.slice(5)}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value) => value}
                    formatter={(value: number) => [value, "Views"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.topPages?.map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {index + 1}.
                    </span>
                    <span className="font-medium">{page.path || "/"}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {page.count} views
                  </span>
                </div>
              ))}
              {(!data?.topPages || data.topPages.length === 0) && (
                <p className="text-muted-foreground text-sm">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
