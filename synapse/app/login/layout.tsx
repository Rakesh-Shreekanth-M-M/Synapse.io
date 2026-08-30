import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Synapse',
  description: 'Sign in to your Synapse campus social network account.',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
