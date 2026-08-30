'use client'

import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import { departments } from '@/lib/data'
import { cn } from '@/lib/utils'

const deptColors = [
  'from-blue-500/20 to-cyan-500/20',
  'from-violet-500/20 to-purple-500/20',
  'from-green-500/20 to-emerald-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-red-500/20 to-rose-500/20',
  'from-teal-500/20 to-cyan-500/20',
  'from-indigo-500/20 to-blue-500/20',
  'from-pink-500/20 to-rose-500/20',
]

export default function DepartmentsPage() {
  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore academic departments and their offerings
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="synapse-card p-4 text-center">
            <Building2 className="h-5 w-5 mx-auto mb-2 text-blue-400" />
            <p className="text-xl font-bold">{departments.length}</p>
            <p className="text-xs text-muted-foreground">Departments</p>
          </div>
          <div className="synapse-card p-4 text-center">
            <GraduationCap className="h-5 w-5 mx-auto mb-2 text-violet-400" />
            <p className="text-xl font-bold">{departments.reduce((s, d) => s + d.facultyCount, 0)}</p>
            <p className="text-xs text-muted-foreground">Faculty</p>
          </div>
          <div className="synapse-card p-4 text-center">
            <Users className="h-5 w-5 mx-auto mb-2 text-green-400" />
            <p className="text-xl font-bold">{departments.reduce((s, d) => s + d.studentCount, 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="synapse-card p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-2 text-amber-400" />
            <p className="text-xl font-bold">50+</p>
            <p className="text-xs text-muted-foreground">Programs</p>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {departments.map((dept, i) => (
            <div
              key={dept.id}
              className="synapse-card group overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              {/* Color Header */}
              <div className={cn('h-3 bg-gradient-to-r', deptColors[i % deptColors.length])} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary mb-2">
                      {dept.shortName}
                    </span>
                    <h3 className="text-base font-semibold font-[var(--font-display)] group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {dept.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>HOD: {dept.hod}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-primary">{dept.facultyCount}</p>
                    <p className="text-[10px] text-muted-foreground">Faculty</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-secondary">{dept.studentCount}</p>
                    <p className="text-[10px] text-muted-foreground">Students</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
