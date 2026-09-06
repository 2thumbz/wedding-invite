import Link from 'next/link'
import { Rsvp } from '@/components/Rsvp'

export default function RsvpPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs tracking-wide text-slate-500 hover:text-slate-700 transition-colors"
        >
          <span aria-hidden>←</span> 메인으로
        </Link>
      </div>
      <Rsvp />
    </main>
  )
}
