'use client'

import {
  Megaphone,
  AlertTriangle,
  Info,
  AlertCircle,
  Clock,
  Building2,
  Pin,
} from 'lucide-react'
import { announcements } from '@/lib/data'
import { timeAgo, cn } from '@/lib/utils'

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-l-red-500',
    label: 'Urgent',
  },
  medium: {
    icon: AlertCircle,
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-l-amber-500',
    label: 'Important',
  },
  low: {
    icon: Info,
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-l-blue-500',
    label: 'Info',
  },
}

export default function AnnouncementsPage() {
  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-4xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text flex items-center gap-3">
            <Megaphone className="h-7 w-7" />
            Announcements
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Official notices and updates from the institution
          </p>
        </div>

        {/* Pinned section */}
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Pin className="h-3.5 w-3.5 text-primary rotate-45" />
          <span className="font-medium">Latest Notices</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const config = priorityConfig[announcement.priority]
            const PriorityIcon = config.icon

            return (
              <article
                key={announcement.id}
                className={cn(
                  'synapse-card border-l-4 overflow-hidden hover:border-l-primary/80 transition-all duration-300 group',
                  config.border
                )}
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
                          config.bg,
                          config.text
                        )}
                      >
                        <PriorityIcon className="h-3 w-3" />
                        {config.label}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {announcement.department}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3" />
                      {timeAgo(announcement.timestamp)}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold font-[var(--font-display)] mb-2 group-hover:text-primary transition-colors">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {announcement.content}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Posted by <span className="font-medium text-foreground/80">{announcement.authorName}</span>
                    </span>
                    <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
