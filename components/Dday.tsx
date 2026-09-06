'use client'

import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2026-12-12T16:10:00')

function getRemaining() {
  const now = new Date().getTime()
  const target = WEDDING_DATE.getTime()
  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

export function Dday() {
  const [time, setTime] = useState(getRemaining())

  useEffect(() => {
    const timer = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(timer)
  }, [])

  const items = [
    { label: 'DAY', value: time.days },
    { label: 'HOUR', value: time.hours },
    { label: 'MIN', value: time.minutes },
    { label: 'SEC', value: time.seconds },
  ]

  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.3em] text-slate-400 mb-4">D-DAY</p>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-serif tabular-nums text-slate-800">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-slate-400 mt-1">{item.label}</span>
            </div>
            {i < items.length - 1 && (
              <span className="text-slate-300 text-xl font-light">:</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500">
        태훈, 지영의 결혼식이{' '}
        <span className="text-sky-600 font-medium">{time.days}일</span> 남았습니다.
      </p>
    </div>
  )
}
