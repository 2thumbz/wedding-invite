'use client'

import Image from 'next/image'
import { useState } from 'react'

const transportInfo = [
  {
    title: '주차',
    lines: ['1,2 주차장 외 B,C,D 주차장 전체 이용 가능 (2시간 무료)'],
  },
]

function TransportAccordion({ title, lines }: { title: string; lines: string[] }) {
  const [open, setOpen] = useState(false)

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
        <div className="px-5 pb-5">
          <div className="bg-slate-50 rounded-lg px-4 py-3 space-y-1">
            {lines.map((line) => (
              <p key={line} className="text-sm text-slate-600">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Location() {
  const [isMapOpen, setIsMapOpen] = useState(false)

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">ARRIVAL GUIDE</p>
        <p className="font-serif text-xl text-slate-800 mb-1">라포에트 웨딩홀</p>
        <p className="text-sm text-slate-500 mb-1">경기도 광명시 광명역로 21</p>
        <p className="text-xs text-slate-400 mb-6">광명역 동편 지하1층</p>

        <a
          href="https://naver.me/5du4RWOQ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs tracking-wide text-sky-600 border border-sky-200 rounded-full px-5 py-2 hover:bg-sky-50 transition-colors"
        >
          지도로 찾아가기
        </a>
      </div>

      {/* 약도 이미지 */}
      <div className="mb-10">
        <div
          className="rounded-xl overflow-hidden border border-slate-200 cursor-pointer"
          onClick={() => setIsMapOpen(true)}
        >
          <Image
            src="/assets/image/map.jpg"
            alt="오시는 길 약도"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
        <p className="text-center text-slate-400 text-xs mt-2">
          약도 이미지 (클릭하면 크게 볼 수 있습니다)
        </p>
      </div>

      <div className="w-8 h-px bg-slate-300 mx-auto mb-10" />

      <div className="space-y-3">
        {transportInfo.map((item) => (
          <TransportAccordion key={item.title} title={item.title} lines={item.lines} />
        ))}
      </div>

      {/* 풀스크린 모달 */}
      {isMapOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsMapOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
            >
              ✕
            </button>
            <div className="relative max-w-4xl max-h-full">
              <Image
                src="/assets/image/map.jpg"
                alt="오시는 길 약도"
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
