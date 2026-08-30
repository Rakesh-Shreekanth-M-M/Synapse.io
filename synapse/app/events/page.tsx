'use client'

import { useState } from 'react'
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Filter,
} from 'lucide-react'
import { events } from '@/lib/data'
import { formatDate, formatTime, cn } from '@/lib/utils'

const categories = ['all', 'technical', 'cultural', 'sports', 'placement', 'seminar'] as const

const categoryStyles: Record<string, { bg: string; text: string; dot: string }> = {
  technical: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  cultural: { bg: 'bg-violet-500/10', text: 'text-violet-400', dot: 'bg-violet-400' },
  sports: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' },
  placement: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  seminar: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({})

  const filtered =
    selectedCategory === 'all' ? events : events.filter((e) => e.category === selectedCategory)

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Events</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Discover what&apos;s happening on campus
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all',
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => {
            const isRsvped = rsvpState[event.id] ?? event.isRsvped
            const style = categoryStyles[event.category]
            const percentFull = Math.round((event.rsvpCount / event.maxCapacity) * 100)

            return (
              <div
                key={event.id}
                className="synapse-card group overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                {/* Category badge */}
                <div className="flex items-center justify-between p-5 pb-3">
                  <span
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize',
                      style.bg,
                      style.text
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
                    {event.category}
                  </span>
                  <Sparkles className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="px-5 pb-4">
                  <h3 className="text-base font-semibold font-[var(--font-display)] leading-snug mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {formatTime(event.time)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {event.venue}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border px-5 py-3">
                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {event.rsvpCount}/{event.maxCapacity}
                      </span>
                      <span className="text-muted-foreground">{percentFull}% full</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 transition-all duration-500"
                        style={{ width: `${percentFull}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium transition-all',
                      isRsvped
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}
                  >
                    <CheckCircle2 className={cn('h-3.5 w-3.5', isRsvped && 'fill-current')} />
                    {isRsvped ? 'RSVP\'d' : 'RSVP Now'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
