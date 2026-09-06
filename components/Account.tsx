'use client'

import { useState } from 'react'

const accounts = {
  groom: [{ label: '태훈', bank: '신한은행', number: '110-000-000000' }],
  bride: [{ label: '지영', bank: '우리은행', number: '110-000-000000' }],
}

function AccountAccordion({
  title,
  items,
}: {
  title: string
  items: { label: string; bank: string; number: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number)
      setCopied(number)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // no-op
    }
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm tracking-wide text-slate-700"
      >
        <span>{title}</span>
        <span className={`transition-transform text-slate-400 ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3">
          {items.map((item) => (
            <div key={item.number} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
              <div>
                <p className="text-xs text-slate-400">{item.bank}</p>
                <p className="text-sm text-slate-800 font-medium tracking-wide">{item.number}</p>
                <p className="text-xs text-slate-400 mt-0.5">예금주 {item.label}</p>
              </div>
              <button
                onClick={() => handleCopy(item.number)}
                className="text-xs text-sky-600 border border-sky-200 rounded-full px-3 py-1 hover:bg-sky-50 transition-colors shrink-0"
              >
                {copied === item.number ? '복사됨' : '복사'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Account() {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-2">ACCOUNT</p>
        <p className="text-sm text-slate-500">
          참석이 어려우신 분들을 위해<br />계좌번호를 기재하였습니다.
        </p>
      </div>

      <div className="space-y-3">
        <AccountAccordion title="신랑측 계좌번호" items={accounts.groom} />
        <AccountAccordion title="신부측 계좌번호" items={accounts.bride} />
      </div>
    </section>
  )
}
