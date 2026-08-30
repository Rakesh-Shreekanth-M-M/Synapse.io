'use client'

import { useState } from 'react'
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  Filter,
  TrendingUp,
  Award,
  Target,
  BarChart3,
} from 'lucide-react'
import { jobs, placementStats } from '@/lib/data'
import { formatDate, cn } from '@/lib/utils'

export default function PlacementsPage() {
  const [filter, setFilter] = useState<'all' | 'full-time' | 'internship'>('all')
  const [appliedState, setAppliedState] = useState<Record<string, boolean>>({})

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.type === filter)

  const toggleApply = (id: string) => {
    setAppliedState((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const latestStat = placementStats[placementStats.length - 1]

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Placements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Campus drives, job openings & career opportunities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Placement Rate',
              value: `${Math.round((latestStat.placed / latestStat.total) * 100)}%`,
              icon: Target,
              color: 'text-green-400',
              bg: 'from-green-500/10 to-emerald-500/10',
            },
            {
              label: 'Students Placed',
              value: latestStat.placed.toString(),
              icon: CheckCircle2,
              color: 'text-blue-400',
              bg: 'from-blue-500/10 to-cyan-500/10',
            },
            {
              label: 'Avg Package',
              value: `₹${latestStat.avgPackage} LPA`,
              icon: TrendingUp,
              color: 'text-violet-400',
              bg: 'from-violet-500/10 to-purple-500/10',
            },
            {
              label: 'Highest Package',
              value: `₹${latestStat.highestPackage} LPA`,
              icon: Award,
              color: 'text-amber-400',
              bg: 'from-amber-500/10 to-orange-500/10',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn('synapse-card p-4 bg-gradient-to-br', stat.bg)}
            >
              <stat.icon className={cn('h-5 w-5 mb-2', stat.color)} />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Placement Trends */}
        <div className="synapse-card p-5 mb-6">
          <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            Year-over-Year Trends
          </h3>
          <div className="flex items-end gap-3 h-32">
            {placementStats.map((stat) => {
              const pct = (stat.placed / stat.total) * 100
              return (
                <div key={stat.year} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-primary">{Math.round(pct)}%</span>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-violet-600 transition-all duration-500" style={{ height: `${pct}%` }} />
                  <span className="text-[9px] text-muted-foreground">{stat.year}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-5">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {(['all', 'full-time', 'internship'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all',
                filter === f
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
              )}
            >
              {f === 'full-time' ? 'Full-Time' : f}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((job) => {
            const isApplied = appliedState[job.id] ?? job.applied
            return (
              <div
                key={job.id}
                className="synapse-card p-5 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-xl shadow-md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{job.role}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium',
                          job.type === 'internship'
                            ? 'bg-violet-500/10 text-violet-400'
                            : 'bg-blue-500/10 text-blue-400'
                        )}
                      >
                        {job.type === 'internship' ? 'Internship' : 'Full-Time'}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.package}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(job.deadline)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => toggleApply(job.id)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-all',
                          isApplied
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        )}
                      >
                        <CheckCircle2 className={cn('h-3.5 w-3.5', isApplied && 'fill-current')} />
                        {isApplied ? 'Applied' : 'Apply Now'}
                      </button>
                      <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
