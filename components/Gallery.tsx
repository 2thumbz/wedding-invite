'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const FILES = [
  'arkki_0049.jpg', 'arkki_0054.jpg', 'arkki_0081.jpg', 'arkki_0224.jpg',
  'arkki_0267.jpg', 'arkki_0364.jpg', 'arkki_0495_(2).jpg', 'arkki_0587.jpg',
  'arkki_0605.jpg', 'arkki_0806_size_cut_(2).jpg', 'arkki_0832.jpg', 'arkki_0841.jpg',
  'arkki_0870.jpg', 'arkki_0875.jpg', 'arkki_0957.jpg', 'arkki_1447.jpg',
  'arkki_1636.jpg', 'arkki_1642.jpg', 'arkki_1648.jpg', 'arkki_1730.jpg',
  'arkki_2289.jpg', 'arkki_2365.jpg', 'arkki_2391.jpg', 'arkki_2432.jpg',
  'arkki_2461.jpg', 'arkki_2461_(2).jpg', 'arkki_2480.jpg', 'arkki_2588.jpg',
  'arkki_2800.jpg', 'arkki_2834.jpg', 'arkki_2938.jpg', 'arkki_2996.jpg',
  'arkki_3166.jpg', 'arkki_3183.jpg', 'arkki_3296.jpg', 'arkki_3409.jpg',
  'arkki_3513.jpg', 'arkki_3782.jpg', 'arkki_3964_(3).jpg', 'arkki_4030.jpg',
  'arkki_4229.jpg', 'arkki_4276.jpg', 'arkki_4564.jpg', 'arkki_4568.jpg',
  'arkki_4737.jpg', 'arkki_4780.jpg', 'arkki_5010.jpg', 'arkki_5015.jpg',
  'arkki_5079.jpg', 'arkki_5204.jpg',
]

function GalleryCard({
  src,
  containerRef,
}: {
  src: string
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  // 카드가 스크롤 컨테이너(뷰포트) 안에서 좌 -> 우로 지나가는 진행도(0~1)를 추적
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })

  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [35, 0, -35])
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.82, 1, 0.82])
  const opacity = useTransform(scrollXProgress, [0, 0.15, 0.5, 0.85, 1], [0.4, 1, 1, 1, 0.4])

  return (
    <motion.div
      ref={cardRef}
      className="relative shrink-0 w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-sky-100 snap-center will-change-transform"
      style={{ rotateY, scale, opacity, transformStyle: 'preserve-3d' as any }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 70vw, 300px"
      />
    </motion.div>
  )
}

export function Gallery() {
  const images = FILES.map((f) => ({ src: `/assets/image/pic/${f}` }))

  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl font-serif text-center mb-6">Travel Memories</h3>

        <div style={{ perspective: 1200 }}>
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-6 px-2 snap-x snap-mandatory scroll-smooth touch-pan-x [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            {images.map((item, i) => (
              <GalleryCard key={i} src={item.src} containerRef={containerRef} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
