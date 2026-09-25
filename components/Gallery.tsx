'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import type {
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
  WheelEvent as ReactWheelEvent,
} from 'react'

const FILES = [
  '4cut1.jpeg', '4cut2.jpeg',
  'arkki_0081.jpg', 'arkki_0267.jpg', 'arkki_0364.jpg', 'arkki_0411_(2).jpg',
  'arkki_0502.jpg', 'arkki_0587.jpg', 'arkki_0666_(2).jpg', 'arkki_0718.jpg',
  'arkki_0775.jpg', 'arkki_0806_size_cut_(2).jpg', 'arkki_1025.jpg', 'arkki_1096.jpg',
  'arkki_1171.jpg', 'arkki_1403_(2).jpg', 'arkki_1447.jpg', 'arkki_1627.jpg',
  'arkki_1636.jpg', 'arkki_2335.jpg', 'arkki_2391.jpg', 'arkki_2480.jpg',
  'arkki_2996.jpg', 'arkki_3183.jpg', 'arkki_3193.jpg', 'arkki_3233.jpg',
  'arkki_3296.jpg', 'arkki_3545_(2).jpg', 'arkki_3880.jpg', 'arkki_3964_(3).jpg', 
  'arkki_4053_(2).jpg', 'arkki_4168.jpg', 'arkki_4198.jpg',
  'arkki_4458.jpg', 'arkki_4478.jpg', 'arkki_4564.jpg', 'arkki_4627.jpg',
  'arkki_4737.jpg', 'arkki_4928.jpg', 'arkki_4959.jpg', 'arkki_5015.jpg',
  'arkki_5045.jpg', 'arkki_5079.jpg', 'arkki_5226.jpg', 'arkki_5439.jpg',
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const getTouchDistance = (
  touchA: { clientX: number; clientY: number },
  touchB: { clientX: number; clientY: number }
) => {
  const dx = touchA.clientX - touchB.clientX
  const dy = touchA.clientY - touchB.clientY
  return Math.hypot(dx, dy)
}


function GalleryCard({
  src,
  containerRef,
  onOpen,
}: {
  src: string
  containerRef: React.RefObject<HTMLDivElement>
  onOpen: () => void
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
      onOpen()
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
      } touch-manipulation`}
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
    if (e.pointerType !== 'mouse') return
    const el = containerRef.current
    if (!el) return
    dragState.current.isDown = true
    dragState.current.startX = e.clientX
    dragState.current.startScroll = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = containerRef.current
    if (!el || !dragState.current.isDown) return
    const delta = e.clientX - dragState.current.startX
    el.scrollLeft = dragState.current.startScroll - delta
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    dragState.current.isDown = false
    containerRef.current?.releasePointerCapture(e.pointerId)
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const modalViewportRef = useRef<HTMLDivElement | null>(null)
  const modalSwipeState = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    hasSwiped: false,
    isActive: false,
  })
  const modalTouchState = useRef({
    isPinching: false,
    isPanning: false,
    pinchStartDistance: 0,
    pinchStartScale: 1,
    panStartX: 0,
    panStartY: 0,
    panStartOffsetX: 0,
    panStartOffsetY: 0,
    lastTapAt: 0,
  })

  const [modalScale, setModalScale] = useState(1)
  const [modalOffset, setModalOffset] = useState({ x: 0, y: 0 })
  const [modalDragX, setModalDragX] = useState(0)
  const [isModalDragging, setIsModalDragging] = useState(false)
  const [isPinching, setIsPinching] = useState(false)

  const getMaxOffset = (scale: number) => {
    const viewport = modalViewportRef.current
    if (!viewport || scale <= 1) return { x: 0, y: 0 }
    return {
      x: (viewport.clientWidth * (scale - 1)) / 2,
      y: (viewport.clientHeight * (scale - 1)) / 2,
    }
  }

  const clampOffset = (offset: { x: number; y: number }, scale: number) => {
    const max = getMaxOffset(scale)
    return {
      x: clamp(offset.x, -max.x, max.x),
      y: clamp(offset.y, -max.y, max.y),
    }
  }

  const resetModalTransform = () => {
    setModalScale(1)
    setModalOffset({ x: 0, y: 0 })
    setModalDragX(0)
  }

  useEffect(() => {
    if (selectedIndex === null) return
    resetModalTransform()
  }, [selectedIndex])

  const showPrevImage = () => {
    resetModalTransform()
    setSelectedIndex((prev) => {
      if (prev === null) return prev
      return prev > 0 ? prev - 1 : images.length - 1
    })
  }

  const showNextImage = () => {
    resetModalTransform()
    setSelectedIndex((prev) => {
      if (prev === null) return prev
      return prev < images.length - 1 ? prev + 1 : 0
    })
  }

  const handleModalPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (modalScale > 1 || isPinching) return
    modalSwipeState.current.pointerId = e.pointerId
    modalSwipeState.current.startX = e.clientX
    modalSwipeState.current.startY = e.clientY
    modalSwipeState.current.hasSwiped = false
    modalSwipeState.current.isActive = true
    setIsModalDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleModalPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!modalSwipeState.current.isActive || modalSwipeState.current.hasSwiped) return

    const dx = e.clientX - modalSwipeState.current.startX
    const dy = e.clientY - modalSwipeState.current.startY
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    setModalDragX(clamp(dx * 0.35, -140, 140))

    // 드래그 도중 수평 제스처가 명확해지는 즉시 이미지를 전환해 반응성을 높인다.
    if (absDx < 28 || absDx <= absDy) return

    modalSwipeState.current.hasSwiped = true
    if (dx > 0) {
      showPrevImage()
      return
    }
    showNextImage()
  }

  const handleModalPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!modalSwipeState.current.isActive) return

    const dx = e.clientX - modalSwipeState.current.startX
    const dy = e.clientY - modalSwipeState.current.startY
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    // move 단계에서 스와이프 처리가 안 된 빠른 플릭만 up 단계에서 보완 처리
    if (!modalSwipeState.current.hasSwiped && absDx >= 42 && absDx > absDy) {
      if (dx > 0) {
        showPrevImage()
      } else {
        showNextImage()
      }
    } else {
      setModalDragX(0)
    }

    if (modalSwipeState.current.pointerId !== null) {
      e.currentTarget.releasePointerCapture(modalSwipeState.current.pointerId)
    }
    modalSwipeState.current.isActive = false
    modalSwipeState.current.hasSwiped = false
    modalSwipeState.current.pointerId = null
    setIsModalDragging(false)
  }

  const handleModalPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (modalSwipeState.current.pointerId !== null) {
      e.currentTarget.releasePointerCapture(modalSwipeState.current.pointerId)
    }
    modalSwipeState.current.isActive = false
    modalSwipeState.current.hasSwiped = false
    modalSwipeState.current.pointerId = null
    setIsModalDragging(false)
    setModalDragX(0)
  }

  const handleModalTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      modalTouchState.current.isPinching = true
      modalTouchState.current.isPanning = false
      modalTouchState.current.pinchStartDistance = distance
      modalTouchState.current.pinchStartScale = modalScale
      setIsPinching(true)
      setIsModalDragging(false)
      setModalDragX(0)
      e.preventDefault()
      return
    }

    if (e.touches.length !== 1) return

    const now = Date.now()
    if (now - modalTouchState.current.lastTapAt < 260) {
      const nextScale = modalScale > 1 ? 1 : 2
      setModalScale(nextScale)
      setModalOffset({ x: 0, y: 0 })
      setModalDragX(0)
    }
    modalTouchState.current.lastTapAt = now

    if (modalScale <= 1) return

    modalTouchState.current.isPanning = true
    modalTouchState.current.panStartX = e.touches[0].clientX
    modalTouchState.current.panStartY = e.touches[0].clientY
    modalTouchState.current.panStartOffsetX = modalOffset.x
    modalTouchState.current.panStartOffsetY = modalOffset.y
  }

  const handleModalTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (modalTouchState.current.isPinching && e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      const ratio = distance / modalTouchState.current.pinchStartDistance
      const nextScale = clamp(modalTouchState.current.pinchStartScale * ratio, 1, 4)
      setModalScale(nextScale)
      setModalOffset((prev) => clampOffset(prev, nextScale))
      e.preventDefault()
      return
    }

    if (!modalTouchState.current.isPanning || e.touches.length !== 1) return

    const dx = e.touches[0].clientX - modalTouchState.current.panStartX
    const dy = e.touches[0].clientY - modalTouchState.current.panStartY
    const nextOffset = clampOffset(
      {
        x: modalTouchState.current.panStartOffsetX + dx,
        y: modalTouchState.current.panStartOffsetY + dy,
      },
      modalScale
    )
    setModalOffset(nextOffset)
    e.preventDefault()
  }

  const handleModalTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      modalTouchState.current.isPinching = false
      setIsPinching(false)
    }
    if (e.touches.length === 0) {
      modalTouchState.current.isPanning = false
    }
    if (modalScale <= 1) {
      setModalOffset({ x: 0, y: 0 })
    }
  }

  const handleModalWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const nextScale = clamp(modalScale - e.deltaY * 0.0015, 1, 4)
    setModalScale(nextScale)
    if (nextScale <= 1) {
      setModalOffset({ x: 0, y: 0 })
      return
    }
    setModalOffset((prev) => clampOffset(prev, nextScale))
  }

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
              <GalleryCard key={i} src={item.src} containerRef={containerRef} onOpen={() => setSelectedIndex(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* 풀스크린 모달 */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
          >
            ✕
          </button>
          <div
            ref={modalViewportRef}
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handleModalPointerDown}
            onPointerMove={handleModalPointerMove}
            onPointerUp={handleModalPointerUp}
            onPointerCancel={handleModalPointerCancel}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={handleModalTouchEnd}
            onTouchCancel={handleModalTouchEnd}
            onWheel={handleModalWheel}
            style={{ touchAction: modalScale > 1 ? 'none' : 'pan-y' }}
          >
            <motion.div
              className="relative w-full h-full max-w-4xl max-h-[90vh]"
              animate={{ x: modalOffset.x + modalDragX, y: modalOffset.y, scale: modalScale }}
              transition={isModalDragging || isPinching ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
            >
              <Image
                src={images[selectedIndex].src}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}
