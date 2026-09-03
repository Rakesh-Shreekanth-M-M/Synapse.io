'use client'

import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Users,
  CalendarDays,
  Briefcase,
  Image as ImageIcon,
  Send,
  Sparkles,
} from 'lucide-react'
import { posts, events, jobs, users } from '@/lib/data'
import { useAuthStore } from '@/lib/store/authStore'
import { timeAgo, cn } from '@/lib/utils'

export default function FeedPage() {
  const { currentUser } = useAuthStore()
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [postContent, setPostContent] = useState('')

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main Feed */}
          <div className="space-y-6">
            {/* Create Post */}
            <div className="synapse-card p-5">
              <div className="flex gap-4">
                <img
                  src={currentUser?.avatar || users[0].avatar}
                  alt="Your avatar"
                  className="h-11 w-11 shrink-0 rounded-full ring-2 ring-primary/20"
                />
                <div className="flex-1">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What's happening on campus?"
                    className="w-full resize-none rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all min-h-[80px]"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <ImageIcon className="h-4 w-4 text-blue-400" />
                        Photo
                      </button>
                      <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <CalendarDays className="h-4 w-4 text-green-400" />
                        Event
                      </button>
                      <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        Poll
                      </button>
                    </div>
                    <button
                      disabled={!postContent.trim()}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Send className="h-4 w-4" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => {
              const isLiked = likedPosts[post.id] ?? post.liked
              return (
                <article key={post.id} className="synapse-card overflow-hidden group">
                  {/* Post Header */}
                  <div className="flex items-start justify-between p-5 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-11 w-11 rounded-full ring-2 ring-primary/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{post.author.name}</span>
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize">
                            {post.author.role.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {post.author.department} · {timeAgo(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-5 pb-3">
                    <p className="text-sm leading-relaxed text-foreground/90">{post.content}</p>
                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="px-5 pb-3">
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={post.imageUrl}
                          alt="Post attachment"
                          className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between border-t border-border px-5 py-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={cn(
                          'flex items-center gap-1.5 text-sm transition-all hover:scale-105 active:scale-95',
                          isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                        )}
                      >
                        <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
                        {post.likes + (isLiked && !post.liked ? 1 : isLiked === false && post.liked ? -1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments.length}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-green-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </button>
                    </div>
                    <button className="text-muted-foreground hover:text-amber-500 transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* Quick Stats */}
            <div className="synapse-card p-5">
              <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-primary" />
                Campus Pulse
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Users', value: '2,520', icon: Users, color: 'text-blue-400' },
                  { label: 'New Posts', value: '47', icon: MessageCircle, color: 'text-violet-400' },
                  { label: 'Events', value: '10', icon: CalendarDays, color: 'text-green-400' },
                  { label: 'Open Jobs', value: '10', icon: Briefcase, color: 'text-amber-400' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-muted/50 p-3 text-center">
                    <stat.icon className={cn('h-4 w-4 mx-auto mb-1', stat.color)} />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="synapse-card p-5">
              <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
                <CalendarDays className="h-4 w-4 text-green-400" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events.slice(0, 4).map((event) => {
                  const eventDate = new Date(event.date)
                  const categoryColors: Record<string, string> = {
                    technical: 'bg-blue-500/10 text-blue-400',
                    cultural: 'bg-violet-500/10 text-violet-400',
                    sports: 'bg-green-500/10 text-green-400',
                    placement: 'bg-amber-500/10 text-amber-400',
                    seminar: 'bg-red-500/10 text-red-400',
                  }
                  return (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                        <span className="text-[10px] font-bold text-primary uppercase">
                          {eventDate.toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="text-sm font-bold leading-none">{eventDate.getDate()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{event.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize', categoryColors[event.category])}>
                            {event.category}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{event.rsvpCount} going</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Hot Opportunities */}
            <div className="synapse-card p-5">
              <h3 className="text-sm font-semibold font-[var(--font-display)] flex items-center gap-2 mb-4">
                <Briefcase className="h-4 w-4 text-amber-400" />
                Hot Opportunities
              </h3>
              <div className="space-y-3">
                {jobs.slice(0, 4).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <img src={job.logo} alt={job.company} className="h-9 w-9 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{job.role}</p>
                      <p className="text-[10px] text-muted-foreground">{job.company} · {job.package}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[9px] font-medium',
                        job.type === 'internship'
                          ? 'bg-violet-500/10 text-violet-400'
                          : 'bg-blue-500/10 text-blue-400'
                      )}
                    >
                      {job.type === 'internship' ? 'Intern' : 'FT'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
