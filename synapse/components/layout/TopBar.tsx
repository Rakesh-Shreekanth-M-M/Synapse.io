'use client'

import { useState } from 'react'
import { Search, Bell, Plus, Command } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { cn } from '@/lib/utils'

export default function TopBar() {
  const { currentUser } = useAuthStore()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/60 backdrop-blur-xl px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <Search className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
          searchFocused ? "text-primary" : "text-muted-foreground"
        )} />
        <input
          type="text"
          placeholder="Search posts, events, people..."
          className="w-full rounded-xl border border-border bg-muted/50 pl-10 pr-20 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="flex h-5 items-center rounded border border-border bg-card px-1.5 font-mono text-[10px]">
            <Command className="h-2.5 w-2.5 mr-0.5" />K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-4">
        <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Post</span>
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {currentUser && (
          <div className="flex items-center gap-2 ml-1">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-full ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all"
            />
          </div>
        )}
      </div>
    </header>
  )
}
