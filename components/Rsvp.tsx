'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

type Side = 'groom' | 'bride'
type Attendance = 'yes' | 'no'

export function Rsvp() {
  const [side, setSide] = useState<Side>('groom')
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('yes')
  const [count, setCount] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    const { error } = await supabase.from('rsvp').insert({
      side,
      name: name.trim(),
      attendance,
      count: attendance === 'yes' ? count : 0,
      message: message.trim() || null,
    })

    setLoading(false)

    if (error) {
      setError('전달에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">R.S.V.P.</p>
        <p className="font-serif text-lg text-slate-800 mb-2">감사합니다</p>
        <p className="text-sm text-slate-500">참석 의사가 정상적으로 전달되었습니다.</p>
      </section>
    )
  }

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">R.S.V.P.</p>
        <p className="text-sm text-slate-500">
          참석 의사를 미리 전달해주시면<br />준비에 큰 도움이 됩니다
        </p>
      </div>

      {!isSupabaseConfigured && (
        <p className="text-center text-xs text-amber-600 mb-6">
          참석의사 전달 기능을 사용하려면 Supabase 환경변수 설정이 필요합니다.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          {(['groom', 'bride'] as Side[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`flex-1 text-xs tracking-wide rounded-full px-4 py-2 border transition-colors ${
                side === s
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s === 'groom' ? '신랑측 하객' : '신부측 하객'}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-sky-300"
        />

        <div className="flex gap-2">
          {(['yes', 'no'] as Attendance[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAttendance(a)}
              className={`flex-1 text-xs tracking-wide rounded-full px-4 py-2 border transition-colors ${
                attendance === a
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {a === 'yes' ? '참석합니다' : '참석이 어렵습니다'}
            </button>
          ))}
        </div>

        {attendance === 'yes' && (
          <div className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-3">
            <span className="text-sm text-slate-600">참석 인원</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="w-7 h-7 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center"
              >
                −
              </button>
              <span className="text-sm text-slate-800 w-4 text-center">{count}</span>
              <button
                type="button"
                onClick={() => setCount((c) => Math.min(10, c + 1))}
                className="w-7 h-7 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        )}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="전달하고 싶은 말씀 (선택)"
          rows={2}
          maxLength={200}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-sky-300 resize-none"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured}
          className="w-full text-xs tracking-wide text-white bg-sky-500 rounded-full px-5 py-3 hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '전달 중...' : '참석의사 전달하기'}
        </button>
      </form>
    </section>
  )
}
