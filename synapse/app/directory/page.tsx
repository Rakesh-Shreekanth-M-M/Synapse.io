'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  MessageSquare,
  Globe,
  ExternalLink,
  Mail,
} from 'lucide-react'
import { users } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Role } from '@/lib/types'

const roles: { label: string; value: 'all' | Role }[] = [
  { label: 'All', value: 'all' },
  { label: 'Students', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Alumni', value: 'alumni' },
  { label: 'Admin', value: 'admin' },
  { label: 'Placement', value: 'placement_officer' },
]

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all')

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find and connect with people across campus
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, department, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/50 pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRoleFilter(r.value)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    roleFilter === r.value
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* People Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="synapse-card p-5 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-14 w-14 rounded-full ring-2 ring-primary/10"
                  />
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#161B22] bg-green-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary capitalize">
                      {user.role.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.department}</span>
                    {user.year && (
                      <span className="text-xs text-muted-foreground">· Year {user.year}</span>
                    )}
                  </div>
                  {user.bio && (
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{user.bio}</p>
                  )}

                  {/* Skills */}
                  {user.skills && user.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {user.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                      {user.skills.length > 3 && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                          +{user.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <button className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[10px] font-medium text-primary hover:bg-primary/20 transition-colors">
                      <MessageSquare className="h-3 w-3" />
                      Message
                    </button>
                    <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground hover:bg-muted transition-colors">
                      <Mail className="h-3 w-3" />
                      Email
                    </button>
                    {user.github && (
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    )}
                    {user.linkedIn && (
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground">No results found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
