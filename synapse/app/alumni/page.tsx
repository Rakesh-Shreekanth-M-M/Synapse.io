'use client'

import { useState } from 'react'
import {
  GraduationCap,
  Building2,
  Briefcase,
  Award,
  MessageSquare,
  ExternalLink,
  Search,
  Filter,
  UserCheck,
} from 'lucide-react'
import { alumni } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMentoring, setFilterMentoring] = useState(false)

  const filtered = alumni.filter((a) => {
    const matchSearch =
      a.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentRole.toLowerCase().includes(searchQuery.toLowerCase())
    const matchMentoring = filterMentoring ? a.mentoring : true
    return matchSearch && matchMentoring
  })

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Alumni Network</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connect with alumni across top companies worldwide
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, company, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/50 pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <button
            onClick={() => setFilterMentoring(!filterMentoring)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
              filterMentoring
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
            )}
          >
            <UserCheck className="h-4 w-4" />
            Mentors Only
          </button>
        </div>

        {/* Alumni Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((alum) => (
            <div
              key={alum.id}
              className="synapse-card group overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Gradient Header */}
              <div className="h-20 bg-gradient-to-r from-blue-500/20 to-violet-600/20 relative">
                {alum.mentoring && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-400">
                    <UserCheck className="h-3 w-3" />
                    Mentor
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="px-5 -mt-8">
                <img
                  src={alum.user.avatar}
                  alt={alum.user.name}
                  className="h-16 w-16 rounded-full ring-4 ring-[#161B22] shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="px-5 pt-3 pb-5">
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                  {alum.user.name}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span className="truncate">{alum.currentRole}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{alum.currentCompany}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>{alum.user.department} · Batch {alum.batch}</span>
                </div>

                {/* Achievements */}
                <div className="mt-3 space-y-1.5">
                  {alum.achievements.slice(0, 2).map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Award className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {alum.user.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Connect
                  </button>
                  {alum.user.linkedIn && (
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted hover:bg-muted-foreground/10 transition-colors">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
