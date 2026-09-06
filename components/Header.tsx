'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Header() {
  return (
    <header className="py-12 px-4 min-h-screen flex items-center">
      <div className="container mx-auto">
        <motion.div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>

          <motion.div variants={itemUp} className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/assets/image/map.jpg" alt="intro photo" width={900} height={600} className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          <motion.div variants={itemUp} className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1 variants={itemUp} className="text-4xl md:text-5xl font-serif text-slate-800">
              임태훈 <span className="mx-2 text-rose-500">♥</span> 김지영
            </motion.h1>

            <motion.p variants={itemUp} className="mt-4 text-lg text-slate-600">
              함께 떠나는 인생의 여정 — 우리의 특별한 날에 초대합니다.
            </motion.p>

            <motion.div variants={itemUp} className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center md:justify-start">
              <div className="text-sm text-slate-500">2026년 10월 10일 · 서울</div>
              <button className="mt-3 sm:mt-0 bg-sky-600 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition">초대 확인하기</button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </header>
  )
}
