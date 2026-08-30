'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types'
import { users } from '@/lib/data'

interface AuthState {
  currentUser: User | null
  login: (email: string, role: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: users[0],
      login: (_email: string, role: string) => {
        const user = users.find((u) => u.role === role)
        if (user) {
          set({ currentUser: user })
          return true
        }
        return false
      },
      logout: () => set({ currentUser: null }),
      updateProfile: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        })),
    }),
    { name: 'synapse-auth' }
  )
)
