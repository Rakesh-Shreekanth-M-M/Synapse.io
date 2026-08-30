'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Shield,
  UserCog,
  Briefcase,
  Users,
} from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { cn } from '@/lib/utils'
import type { Role } from '@/lib/types'

const roleOptions: { value: Role; label: string; icon: React.ElementType }[] = [
  { value: 'student', label: 'Student', icon: GraduationCap },
  { value: 'faculty', label: 'Faculty', icon: BookOpen },
  { value: 'hod', label: 'HoD', icon: UserCog },
  { value: 'admin', label: 'Admin', icon: Shield },
  { value: 'placement_officer', label: 'Placement', icon: Briefcase },
  { value: 'alumni', label: 'Alumni', icon: Users },
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role>('student')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    setLoading(true)
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600))
    const success = login(email, selectedRole)
    if (success) {
      router.push('/feed')
    } else {
      setError('No user found for this role. Try a different role.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#111b2e] flex-col items-center justify-center p-12">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/20 blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-violet-500/20 blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px] animate-pulse-glow" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-xl shadow-blue-500/30">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold font-[var(--font-display)] gradient-text">
              Synapse
            </h1>
          </div>
          <p className="text-lg text-foreground/70 leading-relaxed mb-8">
            Your all-in-one campus social platform connecting students, faculty, alumni, and placement officers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '2,500+', l: 'Active Users' },
              { n: '120+', l: 'Companies' },
              { n: '95%', l: 'Placement Rate' },
              { n: '50+', l: 'Events/Year' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl glass p-4 text-center">
                <p className="text-2xl font-bold gradient-text">{s.n}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-[var(--font-display)]">Synapse</span>
          </div>

          <h2 className="text-2xl font-bold font-[var(--font-display)] mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to continue to your campus network</p>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Select your role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((r) => {
                const Icon = r.icon
                return (
                  <button
                    key={r.value}
                    onClick={() => setSelectedRole(r.value)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-xs font-medium transition-all duration-200',
                      selectedRole === r.value
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-border bg-card hover:border-primary/30 hover:bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {r.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@synapse.edu"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive mb-4 flex items-center gap-1"
            >
              ⚠ {error}
            </motion.p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            Demo: Enter any email and select a role to explore.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
