'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { PointerEvent as ReactPointerEvent } from 'react'

const FILES = [
  '4cut1.jpeg', '4cut2.jpeg',
  'arkki_0081.jpg', 'arkki_0267.jpg', 'arkki_0364.jpg', 'arkki_0411_(2).jpg',
  'arkki_0502.jpg', 'arkki_0587.jpg', 'arkki_0666_(2).jpg', 'arkki_0718.jpg',
  'arkki_0775.jpg', 'arkki_0806_size_cut_(2).jpg', 'arkki_1025.jpg', 'arkki_1096.jpg',
  'arkki_1171.jpg', 'arkki_1403_(2).jpg', 'arkki_1447.jpg', 'arkki_1627.jpg',
  'arkki_1636.jpg', 'arkki_2335.jpg', 'arkki_2391.jpg', 'arkki_2480.jpg',
  'arkki_2996.jpg', 'arkki_3183.jpg', 'arkki_3193.jpg', 'arkki_3233.jpg',
  'arkki_3296.jpg', 'arkki_3545_(2).jpg', 'arkki_3880.jpg', 'arkki_3964_(3).jpg',
  'arkki_4030.jpg', 'arkki_4053_(2).jpg', 'arkki_4168.jpg', 'arkki_4198.jpg',
  'arkki_4458.jpg', 'arkki_4478.jpg', 'arkki_4564.jpg', 'arkki_4627.jpg',
  'arkki_4737.jpg', 'arkki_4928.jpg', 'arkki_4959.jpg', 'arkki_5015.jpg',
  'arkki_5045.jpg', 'arkki_5079.jpg', 'arkki_5226.jpg', 'arkki_5439.jpg',
]


function GalleryCard({
  src,
  containerRef,
  onOpen,
}: {
  src: string
  containerRef: React.RefObject<HTMLDivElement>
  onOpen: (src: string) => void
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const pointerStart = useRef({ x: 0, y: 0 })
  // 이미지의 실제 가로/세로 비율을 로드 시점에 감지해서 카드 크기를 유동적으로 조정한다
  // (세로 사진: 기본 3:4 카드 / 가로 사진: 더 넓은 4:3 카드)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  // 카드가 스크롤 컨테이너(뷰포트) 안에서 좌 -> 우로 지나가는 진행도(0~1)를 추적
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })

  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [20, 0, -20])
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x)
    const dy = Math.abs(e.clientY - pointerStart.current.y)
    // 드래그가 아닌 탭/클릭으로 판단되는 경우에만 모달 오픈
    if (dx < 8 && dy < 8) {
      onOpen(src)
    }
  }

  const isLandscape = orientation === 'landscape'

  return (
    <motion.div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative shrink-0 rounded-2xl overflow-hidden shadow-lg border border-sky-100 snap-center will-change-transform cursor-pointer transition-[width] duration-300 ${
        isLandscape
          ? 'w-80 sm:w-[26rem] aspect-[4/3]'
          : 'w-64 sm:w-72 aspect-[3/4]'
      }`}
      style={{ rotateY, scale, transformStyle: 'preserve-3d' as any }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 420px"
        onLoad={(e) => {
          const img = e.currentTarget
          if (img.naturalWidth >= img.naturalHeight) {
            setOrientation('landscape')
          }
        }}
      />
    </motion.div>
  )
}


export function Gallery() {
  const images = FILES.map((f) => ({ src: `/assets/image/pic/${f}` }))

  const containerRef = useRef<HTMLDivElement | null>(null)

  // 마우스 드래그로 좌우 스크롤 - 데스크탑 UX 보완 (세로 스크롤은 그대로 페이지 스크롤에 사용)
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0 })

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    dragState.current.isDown = true
    dragState.current.startX = e.clientX
    dragState.current.startScroll = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el || !dragState.current.isDown) return
    const delta = e.clientX - dragState.current.startX
    el.scrollLeft = dragState.current.startScroll - delta
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current.isDown = false
    containerRef.current?.releasePointerCapture(e.pointerId)
  }

  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl font-serif text-center mb-6">Travel Memories</h3>

        <div style={{ perspective: 1200 }}>
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-6 px-2 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none touch-pan-x [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            {images.map((item, i) => (
              <GalleryCard key={i} src={item.src} containerRef={containerRef} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </div>

      {/* 풀스크린 모달 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
          >
            ✕
          </button>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image
                src={selected}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
