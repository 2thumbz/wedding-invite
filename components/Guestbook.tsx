'use client'

import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

type GuestbookEntry = {
  id: number
  name: string
  message: string
  created_at: string
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setEntries(data as GuestbookEntry[])
    }
  }

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchEntries()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setLoading(true)
    setError(null)

    const { error } = await supabase.from('guestbook').insert({
      name: name.trim(),
      message: message.trim(),
    })

    setLoading(false)

    if (error) {
      setError('등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setName('')
    setMessage('')
    fetchEntries()
  }

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">GUESTBOOK</p>
        <p className="text-sm text-slate-500">따뜻한 축하의 말씀을 남겨주세요</p>
      </div>

      {!isSupabaseConfigured && (
        <p className="text-center text-xs text-amber-600 mb-6">
          방명록 기능을 사용하려면 Supabase 환경변수 설정이 필요합니다.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mb-10 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-sky-300"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요"
          rows={3}
          maxLength={300}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-sky-300 resize-none"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured}
          className="w-full text-xs tracking-wide text-sky-600 border border-sky-200 rounded-full px-5 py-3 hover:bg-sky-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '등록 중...' : '작성하기'}
        </button>
      </form>

      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-6">
            아직 남겨진 메시지가 없습니다.
          </p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="border border-slate-100 rounded-lg px-4 py-3 bg-slate-50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-slate-800 font-medium">{entry.name}</p>
              <p className="text-[10px] text-slate-400">
                {new Date(entry.created_at).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{entry.message}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
