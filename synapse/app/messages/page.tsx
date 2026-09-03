'use client'

import { useState } from 'react'
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Check, CheckCheck } from 'lucide-react'
import { conversations } from '@/lib/data'
import { timeAgo, cn } from '@/lib/utils'
import type { Conversation } from '@/lib/types'

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState<Conversation>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = conversations.filter((c) =>
    c.participant?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSend = () => {
    if (!newMessage.trim()) return
    setNewMessage('')
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversations List */}
      <div className="w-[340px] shrink-0 border-r border-border flex flex-col bg-card/40">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold font-[var(--font-display)] gradient-text mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/50 pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo)}
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/50',
                selectedConvo.id === convo.id && 'bg-primary/5 border-l-2 border-l-primary'
              )}
            >
              <div className="relative shrink-0">
                <img
                  src={convo.participant?.avatar}
                  alt={convo.participant?.name}
                  className="h-11 w-11 rounded-full ring-2 ring-primary/10"
                />
                {convo.participant?.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{convo.participant?.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {timeAgo(convo.lastTimestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-muted-foreground truncate pr-2">{convo.lastMessage}</p>
                  {convo.unreadCount > 0 && (
                    <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shrink-0">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-3 bg-card/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedConvo.participant?.avatar}
                alt={selectedConvo.participant?.name}
                className="h-10 w-10 rounded-full ring-2 ring-primary/10"
              />
              {selectedConvo.participant?.isOnline && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{selectedConvo.participant?.name}</h3>
              <p className="text-[11px] text-muted-foreground">
                {selectedConvo.participant?.isOnline ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  'Offline'
                )}
                {' · '}
                {selectedConvo.participant?.department}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Video className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 gradient-mesh">
          {selectedConvo.messages.map((msg) => {
            const isMine = msg.senderId === 'u1'
            return (
              <div key={msg.id} className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    isMine
                      ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-br-md'
                      : 'synapse-card rounded-bl-md'
                  )}
                >
                  <p>{msg.content}</p>
                  <div className={cn('flex items-center gap-1 mt-1', isMine ? 'justify-end' : 'justify-start')}>
                    <span className={cn('text-[10px]', isMine ? 'text-white/60' : 'text-muted-foreground')}>
                      {timeAgo(msg.timestamp)}
                    </span>
                    {isMine && (
                      msg.read ? (
                        <CheckCheck className="h-3 w-3 text-white/60" />
                      ) : (
                        <Check className="h-3 w-3 text-white/60" />
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Message Input */}
        <div className="border-t border-border px-6 py-3 bg-card/40">
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full rounded-xl border border-border bg-muted/50 pl-4 pr-12 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Smile className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
