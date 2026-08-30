'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  CalendarDays,
  MessageSquare,
  Briefcase,
  Users,
  GraduationCap,
  Building2,
  Megaphone,
  DoorOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store/authStore'
import ThemeToggle from '@/components/shared/ThemeToggle'

const navItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/messages', label: 'Messages', icon: MessageSquare, badge: 2 },
  { href: '/placements', label: 'Placements', icon: Briefcase },
  { href: '/alumni', label: 'Alumni', icon: GraduationCap },
  { href: '/departments', label: 'Departments', icon: Building2 },
  { href: '/directory', label: 'Directory', icon: Users },
  { href: '/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/rooms', label: 'Room Booking', icon: DoorOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { currentUser, logout } = useAuthStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight font-[var(--font-display)] gradient-text">
            Synapse
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 mb-3">
          <ThemeToggle />
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {currentUser && (
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted',
              collapsed && 'justify-center'
            )}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 shrink-0 rounded-full ring-2 ring-primary/20"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role.replace('_', ' ')}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Collapse toggle (when collapsed) */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-muted transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </aside>
  )
}
