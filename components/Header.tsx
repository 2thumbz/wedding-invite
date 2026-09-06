'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  return (
    <header className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 to-sky-100" />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="mx-auto inline-flex items-center gap-4 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-sky-100 flex items-center justify-center shadow-inner">
                <Image src="/assets/image/top-plane.png" alt="plane" width={64} height={64} className="transform rotate-180" />
              </div>
              <div className="text-left">
                <h2 className="text-lg text-sky-700 font-semibold tracking-widest">You're Invited</h2>
                <p className="text-sm text-slate-600">함께 떠나는 인생의 여정</p>
              </div>
            </div>
          </motion.div>

          <motion.h1 className="mt-8 text-5xl md:text-6xl font-serif text-slate-800 leading-tight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            임태훈 <span className="mx-3 text-2xl text-rose-500">♥</span> 김지영
          </motion.h1>

          <motion.p className="mt-4 text-lg text-slate-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            2026년 10월 10일 · 서울
          </motion.p>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
            <div className="mx-auto w-36 h-1 bg-gradient-to-r from-sky-500 via-sky-300 to-rose-400 rounded-full" />
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute left-8 top-24" initial={{ x: -40, y: -10, opacity: 0 }} animate={{ x: -10, y: 10, opacity: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, delay: 0.5 }}>
        <Image src="/assets/image/top-plane.png" alt="flying plane" width={72} height={72} className="opacity-90 drop-shadow-lg rotate-180" />
      </motion.div>

      <motion.div className="absolute right-6 bottom-10" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}>
        <button className="bg-sky-600 text-white px-5 py-3 rounded-full shadow-md hover:scale-105 transition">초대 확인하기</button>
      </motion.div>
    </header>
  )
}
