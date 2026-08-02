'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState } from 'react'

export function Gallery() {
  const images = [
    { emoji: '🌸', label: '봄날의 추억', city: 'Seoul' },
    { emoji: '🌊', label: '여름의 여행', city: 'Busan' },
    { emoji: '🍂', label: '가을의 단풍', city: 'Jeju' },
    { emoji: '⛄', label: '겨울의 로맨스', city: 'Gangwon' },
    { emoji: '🌺', label: '특별한 순간', city: 'Okinawa' },
    { emoji: '🏔️', label: '산의 추억', city: 'Alps' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const x = useMotionValue(0)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      // 오른쪽으로 스와이프 (이전)
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    } else if (offset < -100 || velocity < -500) {
      // 왼쪽으로 스와이프 (다음)
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  return (
    <section className="max-w-md mx-auto px-6 py-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-2xl">🌏</span>
        <h3 className="text-2xl font-serif text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Travel Memories
        </h3>
        <span className="text-2xl">🧳</span>
      </div>
      
      {/* 슬라이더 컨테이너 */}
      <div className="relative overflow-hidden rounded-2xl touch-pan-y">
        <motion.div 
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ x }}
        >
          {images.map((item, index) => (
            <motion.div 
              key={index}
              className="min-w-full px-2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 aspect-square flex flex-col items-center justify-center border border-sky-100">
                <span className="text-8xl mb-4">{item.emoji}</span>
                <p className="text-gray-700 font-medium text-lg text-center mb-2">{item.label}</p>
                <p className="text-sky-600 text-sm font-medium">{item.city}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors shadow-md"
        >
          ←
        </button>
        
        {/* 인디케이터 */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-sky-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))}
          disabled={currentIndex === images.length - 1}
          className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors shadow-md"
        >
          →
        </button>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-6 italic">
        ✈️ 함께한 여행의 순간들 ({currentIndex + 1}/{images.length})
      </p>
    </section>
  )
}
