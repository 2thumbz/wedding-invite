'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion'

export function Gallery() {
  const images = [
    { emoji: '🌸', label: '봄날의 추억' },
    { emoji: '🌊', label: '여름의 여행' },
    { emoji: '🍂', label: '가을의 단풍' },
    { emoji: '⛄', label: '겨울의 로맨스' },
    { emoji: '🌺', label: '특별한 순간' },
    { emoji: '🏔️', label: '산의 추억' },
  ]

  const ref = useRef<HTMLElement | null>(null)
  const { scrollY } = useScroll({ target: ref })
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })

  return (
    <section ref={ref} className="py-12 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl font-serif text-center mb-6">Travel Memories</h3>

        <div className="perspective-3d" style={{ perspective: 1000 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((item, i) => {
              const center = (images.length - 1) / 2
              // z translation depending on scroll velocity and index distance from center
              const z = useTransform(smooth, (v) => {
                const intensity = Math.min(300, Math.abs(v) * 0.4)
                return (i - center) * intensity
              })

              const rotateX = useTransform(smooth, (v) => {
                const base = (i - center) * 4
                return base + v / 80
              })

              const translateY = useTransform(smooth, (v) => (i - center) * (v / 200))

              return (
                <motion.div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border border-sky-100 will-change-transform"
                  style={{ z, rotateX, y: translateY, transformStyle: 'preserve-3d' as any }}
                >
                  <div className="text-7xl mb-4">{item.emoji}</div>
                  <div className="text-center text-lg text-slate-700 font-medium">{item.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
