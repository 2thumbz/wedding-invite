'use client'

import { useEffect, useState } from 'react'

const DISMISS_KEY = 'rsvp-modal-dismissed-date'

export function RsvpModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const today = new Date().toDateString()
    const dismissed = localStorage.getItem(DISMISS_KEY)
    if (dismissed !== today) {
      // 약간의 딜레이 후 노출 (진입 애니메이션 느낌)
      const timer = setTimeout(() => setVisible(true), 400)
      return () => clearTimeout(timer)
    }
  }, [])

  const close = () => setVisible(false)

  const closeForToday = () => {
    localStorage.setItem(DISMISS_KEY, new Date().toDateString())
    setVisible(false)
  }

  const goToRsvp = () => {
    setVisible(false)
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-xs w-full p-8 text-center shadow-2xl">
        <p className="text-xs tracking-[0.3em] text-slate-400 mb-4">R.S.V.P.</p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          특별한 날 축하의 마음으로 참석해주시는
          <br />
          모든 분들을 더욱 귀하게 모실 수 있도록
          <br />
          참석 여부 전달을 부탁드립니다.
        </p>

        <div className="border-t border-b border-slate-100 py-4 mb-6">
          <p className="font-serif text-lg text-slate-800 mb-1">2026. 12. 12. 토요일</p>
          <p className="text-sm text-slate-500 mb-1">오후 4시 10분</p>
          <p className="text-xs text-slate-400">광명 라포에트</p>
        </div>

        <button
          onClick={goToRsvp}
          className="w-full text-xs tracking-wide text-white bg-sky-500 rounded-full px-5 py-3 hover:bg-sky-600 transition-colors mb-3"
        >
          참석의사 전달하기
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
          <button onClick={closeForToday} className="hover:text-slate-600 transition-colors">
            오늘 하루 보지 않기
          </button>
          <span className="text-slate-200">|</span>
          <button onClick={close} className="hover:text-slate-600 transition-colors">
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
