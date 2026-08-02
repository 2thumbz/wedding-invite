'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function FlightAnimation() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // 비행기 수직 위치 (위에서 아래로)
  const yPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ['5%', '95%']
  )
  
  // 비행기 크기 (이륙: 작게 → 순항: 크게 → 착륙: 작게)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.15, 0.27, 0.45, 0.27, 0.15]
  )
  
  // 투명도 효과
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  )

  // 라인 진행도 (착륙 지점까지)
  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  
  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      {/* 좌측 비행 경로 라인 영역 */}
      <div className="fixed left-[7vw] top-0 h-screen flex items-center">
        {/* 배경 라인 (회색) */}
        <div className="absolute top-[5%] bottom-[5%] w-[3px] bg-gradient-to-b from-sky-200 via-blue-300 to-sky-200 rounded-full opacity-40" />
        
        {/* 진행된 라인 (파란색) */}
        <motion.div 
          className="absolute top-[5%] w-[3px] bg-gradient-to-b from-sky-500 to-blue-500 rounded-full shadow-lg"
          style={{
            height: lineProgress,
          }}
        />
        
        {/* 이륙 지점 표시 */}
        <div className="absolute top-[5%] -translate-y-1/2 left-[-20px]">
          <div className="w-10 h-10 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center">
            <span className="text-lg">🛫</span>
          </div>
        </div>
      </div>

      {/* 비행기 - 라인을 따라 이동 */}
      <motion.div
        className="fixed left-[7vw]"
        style={{
          top: yPosition,
          x: '-50%',
          scale: scale,
          opacity: opacity,
        }}
      >
        <div className="relative">
          {/* 동그라미 배경 */}
          <div className="absolute inset-0 rounded-full bg-white border-3 border-sky-400 shadow-xl" 
               style={{
                 width: '140px',
                 height: '140px',
                 left: '50%',
                 top: '50%',
                 borderWidth: '3px',
                 borderColor: '#6c7bfa',
                 transform: 'translate(-50%, -50%)'
               }} 
          />
          <Image
            src="/assets/image/top-plane.png"
            alt="비행기"
            width={120}
            height={120}
            className="drop-shadow-2xl rotate-180 block relative z-10"
          />
        </div>
      </motion.div>

      {/* 진행 라벨들 */}
      <motion.div
        className="fixed left-[calc(5vw+30px)] top-[5%] -translate-y-1/2"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]),
        }}
      >

      </motion.div>

      <motion.div
        className="fixed left-[calc(5vw+30px)] bottom-[5%] translate-y-1/2"
        style={{
          opacity: useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]),
        }}
      >

      </motion.div>

      {/* 구름들 */}
      <motion.div
        className="fixed right-[25%] text-5xl opacity-20"
        style={{ top: useTransform(scrollYProgress, [0, 1], ['10%', '100%']) }}
      >
        ☁️
      </motion.div>
      
      <motion.div
        className="fixed right-[15%] text-6xl opacity-15"
        style={{ top: useTransform(scrollYProgress, [0, 1], ['20%', '110%']) }}
      >
        ☁️
      </motion.div>
      
      <motion.div
        className="fixed right-[35%] text-5xl opacity-25"
        style={{ top: useTransform(scrollYProgress, [0, 1], ['30%', '120%']) }}
      >
        ☁️
      </motion.div>
    </div>
  )
}
