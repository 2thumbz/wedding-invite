'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// 8개 행으로 구성된 출발 안내판 데이터
// 각 행은 스크램블 되는 후보 문자열들과, 최종적으로 멈추는 값을 가진다
const BOARD_ROWS: { frames: string[]; final: string }[] = [
  { frames: ['SEOUL', 'TOKYO', 'PARIS', 'LONDON', 'ROME'], final: '' },
  { frames: ['HONOLULU', 'HANOI', 'JEJU', 'BALI', 'PRAGUE'], final: '2026.12.12' },
  { frames: ['00:00', '13:20', '09:45', '17:05'], final: 'PM 04:10' },
  { frames: ['ICN', 'NRT', 'CDG', 'LHR', 'FCO'], final: '' },
  { frames: ['SEOUL', 'INCHEON', 'BUSAN', 'DAEGU'], final: '광명 라포에트' },
  { frames: ['BOARDING', 'DELAYED', 'SCHEDULED', 'CHECK-IN'], final: '' },
  { frames: ['MR & MRS', 'GROOM', 'BRIDE', 'COUPLE'], final: '태훈 ♥ 지영' },
  { frames: ['ON TIME', 'READY', 'WELCOME', 'ENJOY'], final: 'SEE YOU THERE' },
]

const HERO_IMAGE = '/assets/image/pic/arkki_1447.jpg'

function padCenter(str: string, width: number) {
  const s = str.toUpperCase()
  if (s.length >= width) return s.slice(0, width)
  const totalPad = width - s.length
  const left = Math.floor(totalPad / 2)
  const right = totalPad - left
  return ' '.repeat(left) + s + ' '.repeat(right)
}

function FlipChar({ char }: { char: string }) {
  const display = char === ' ' ? '\u00A0' : char
  return (
    <span
      className="relative inline-flex items-center justify-center w-[8vw] h-[10.5vw] max-w-[48px] max-h-[62px] sm:w-11 sm:h-14 bg-slate-950 text-sky-100 rounded-[5px] font-mono text-base sm:text-2xl overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]"
      style={{ perspective: 240 }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/50 z-10" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="inline-block"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function FlipRow({
  frames,
  final,
  startDelay = 0,
  tickMs = 180,
  lockIntervalMs = 320,
  onDone,
}: {
  frames: string[]
  final: string
  startDelay?: number
  tickMs?: number
  lockIntervalMs?: number
  onDone?: () => void
}) {
  const width = Math.max(final.length, ...frames.map((f) => f.length))
  const paddedFrames = frames.map((f) => padCenter(f, width))
  const paddedFinal = padCenter(final, width)

  const [tick, setTick] = useState(0)
  const [locked, setLocked] = useState(0)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const tickTimer = setInterval(() => setTick((t) => t + 1), tickMs)
    return () => clearInterval(tickTimer)
  }, [tickMs])

  useEffect(() => {
    let lockTimer: ReturnType<typeof setInterval> | undefined

    const startTimer = setTimeout(() => {
      lockTimer = setInterval(() => {
        setLocked((prev) => {
          const next = prev + 1
          if (next >= width) {
            if (lockTimer) clearInterval(lockTimer)
            if (!doneRef.current) {
              doneRef.current = true
              onDoneRef.current?.()
            }
          }
          return Math.min(next, width)
        })
      }, lockIntervalMs)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (lockTimer) clearInterval(lockTimer)
    }
  }, [width, lockIntervalMs, startDelay])

  return (
    <div className="flex justify-center gap-1 sm:gap-1.5">
      {Array.from({ length: width }).map((_, i) => {
        const char =
          i < locked ? paddedFinal[i] : paddedFrames[tick % paddedFrames.length][i]
        return <FlipChar key={i} char={char} />
      })}
    </div>
  )
}

export function Header() {
  const [boardDone, setBoardDone] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)

  useEffect(() => {
    if (boardDone) {
      const t = setTimeout(() => setShowPhoto(true), 1400)
      return () => clearTimeout(t)
    }
  }, [boardDone])

  return (
    <header className="relative py-6 sm:py-10 px-0 min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-none sm:max-w-3xl mx-auto px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {!showPhoto ? (
            <motion.div
              key="board"
              exit={{ opacity: 0, scale: 0.9, rotateX: -25 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              className="bg-slate-900 rounded-2xl sm:rounded-3xl px-4 sm:px-10 py-12 sm:py-16 shadow-2xl w-full min-h-[80vh] flex flex-col justify-center"
              style={{ perspective: 900 }}
            >
              <p className="text-center text-xs sm:text-sm tracking-[0.4em] text-sky-300/70 mb-7">
                ✈ BOARDING PASS
              </p>

              <div className="flex flex-col gap-2 sm:gap-3">
                {BOARD_ROWS.map((row, i) => (
                  <FlipRow
                    key={i}
                    frames={row.frames}
                    final={row.final}
                    startDelay={1200 + i * 1100}
                    lockIntervalMs={280}
                    onDone={
                      i === BOARD_ROWS.length - 1 ? () => setBoardDone(true) : undefined
                    }
                  />
                ))}
              </div>

              <p className="text-center text-xs sm:text-sm tracking-[0.4em] text-sky-300/50 mt-8">
                WEDDING FLIGHT
              </p>
            </motion.div>
          ) : (

            <motion.div
              key="photo"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative w-full h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={HERO_IMAGE}
                alt="태훈 지영 웨딩 사진"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-10 left-0 right-0 text-center text-white"
              >
                <p className="text-sm tracking-[0.35em] mb-3 opacity-80">2026.12.12</p>
                <p className="font-serif text-4xl">태훈 ♥ 지영</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
