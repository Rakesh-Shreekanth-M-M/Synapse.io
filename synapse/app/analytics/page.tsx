'use client'

import {
  BarChart3,
  TrendingUp,
  Users,
  CalendarDays,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  placementStats,
  monthlyUserGrowth,
  departmentActivity,
  eventCategoryDistribution,
} from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AnalyticsPage() {
  const latestMonth = monthlyUserGrowth[monthlyUserGrowth.length - 1]
  const prevMonth = monthlyUserGrowth[monthlyUserGrowth.length - 2]
  const totalUsers = latestMonth.students + latestMonth.faculty + latestMonth.alumni
  const prevTotal = prevMonth.students + prevMonth.faculty + prevMonth.alumni
  const growthPct = (((totalUsers - prevTotal) / prevTotal) * 100).toFixed(1)

  const latestPlacement = placementStats[placementStats.length - 1]
  const placementRate = Math.round((latestPlacement.placed / latestPlacement.total) * 100)

  const maxPosts = Math.max(...departmentActivity.map((d) => d.posts))

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text flex items-center gap-3">
            <BarChart3 className="h-7 w-7" />
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Campus engagement metrics and insights
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Total Users',
              value: totalUsers.toLocaleString(),
              change: `+${growthPct}%`,
              positive: true,
              icon: Users,
              color: 'text-blue-400',
            },
            {
              label: 'Active Events',
              value: '10',
              change: '+25%',
              positive: true,
              icon: CalendarDays,
              color: 'text-green-400',
            },
            {
              label: 'Placement Rate',
              value: `${placementRate}%`,
              change: '+3%',
              positive: true,
              icon: Briefcase,
              color: 'text-amber-400',
            },
            {
              label: 'Posts This Week',
              value: '47',
              change: '-8%',
              positive: false,
              icon: MessageSquare,
              color: 'text-violet-400',
            },
          ].map((stat) => (
            <div key={stat.label} className="synapse-card p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn('h-5 w-5', stat.color)} />
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-[11px] font-medium',
                    stat.positive ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="synapse-card p-5">
            <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              User Growth — 12 Months
            </h3>
            <div className="flex items-end gap-1.5 h-40">
              {monthlyUserGrowth.map((month) => {
                const total = month.students + month.faculty + month.alumni
                const maxTotal = Math.max(
                  ...monthlyUserGrowth.map((m) => m.students + m.faculty + m.alumni)
                )
                const height = (total / maxTotal) * 100

                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-1 group">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-muted-foreground font-medium">
                      {total}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 transition-all duration-300 cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[9px] text-muted-foreground">{month.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Students
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-500" /> Faculty
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Alumni
              </span>
            </div>
          </div>

          {/* Department Activity */}
          <div className="synapse-card p-5">
            <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-green-400" />
              Department Activity
            </h3>
            <div className="space-y-3">
              {departmentActivity.map((dept) => (
                <div key={dept.department} className="group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{dept.department}</span>
                    <span className="text-muted-foreground">{dept.posts} posts</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 group-hover:from-blue-400 group-hover:to-violet-500 transition-all duration-500"
                      style={{ width: `${(dept.posts / maxPosts) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Categories */}
          <div className="synapse-card p-5">
            <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
              <CalendarDays className="h-4 w-4 text-amber-400" />
              Events by Category
            </h3>
            <div className="flex items-center justify-center gap-6 h-40">
              {eventCategoryDistribution.map((cat) => {
                const maxCount = Math.max(...eventCategoryDistribution.map((c) => c.count))
                const height = (cat.count / maxCount) * 100
                return (
                  <div key={cat.category} className="flex flex-col items-center gap-2 group">
                    <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {cat.count}
                    </span>
                    <div
                      className="w-10 rounded-t-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{ height: `${height}%`, backgroundColor: cat.fill }}
                    />
                    <span className="text-[9px] text-muted-foreground">{cat.category}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Placement Trends */}
          <div className="synapse-card p-5">
            <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
              <GraduationCap className="h-4 w-4 text-violet-400" />
              Placement Trends
            </h3>
            <div className="space-y-3">
              {placementStats.map((stat) => {
                const pct = Math.round((stat.placed / stat.total) * 100)
                return (
                  <div key={stat.year} className="group">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium">{stat.year}</span>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span>{stat.placed}/{stat.total} placed</span>
                        <span className="font-medium text-primary">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 group-hover:from-green-400 group-hover:to-emerald-300 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-0.5">
                      <span>Avg: ₹{stat.avgPackage} LPA</span>
                      <span>Highest: ₹{stat.highestPackage} LPA</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
