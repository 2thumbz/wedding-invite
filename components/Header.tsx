'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRsvpModalOpen } from '@/lib/rsvpModalStore'

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
      className="relative inline-flex items-center justify-center w-[8.5vw] h-[11vw] max-w-[56px] max-h-[72px] sm:w-14 sm:h-[70px] bg-slate-950 text-sky-100 rounded-[6px] font-mono text-lg sm:text-3xl overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]"
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
  lockDurationMs = 2400,
  paused = false,
  onDone,
}: {
  frames: string[]
  final: string
  startDelay?: number
  tickMs?: number
  /** 이 행이 스크램블을 멈추고 완전히 고정될 때까지 걸리는 총 시간(ms). 모든 행이 이 값을 동일하게 받으면 글자 수와 무관하게 동시에 완료된다. */
  lockDurationMs?: number
  /** true인 동안에는 스크램블/고정 진행을 멈추고, 다시 false가 되면 멈췐던 지점부터 이어서 진행한다. */
  paused?: boolean
  onDone?: () => void
}) {
  const width = Math.max(final.length, ...frames.map((f) => f.length))
  const paddedFrames = frames.map((f) => padCenter(f, width))
  const paddedFinal = padCenter(final, width)
  // 총 소요 시간을 칸 수로 나눠서, 칸이 많은 행도 적은 행과 동시에 끝나도록 간격을 좁힌다
  const lockIntervalMs = Math.max(40, Math.round(lockDurationMs / width))

  const [tick, setTick] = useState(0)
  const [locked, setLocked] = useState(0)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  const pausedRef = useRef(paused)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const tickTimer = setInterval(() => {
      if (pausedRef.current) return
      setTick((t) => t + 1)
    }, tickMs)
    return () => clearInterval(tickTimer)
  }, [tickMs])

  useEffect(() => {
    let lockTimer: ReturnType<typeof setInterval> | undefined

    const startTimer = setTimeout(() => {
      lockTimer = setInterval(() => {
        if (pausedRef.current) return
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

const ROW_START_DELAY = 900
const ROW_LOCK_DURATION = 2600

export function Header() {
  const [showPhoto, setShowPhoto] = useState(false)
  const doneCountRef = useRef(0)
  const isRsvpModalOpen = useRsvpModalOpen()

  const handleRowDone = () => {
    doneCountRef.current += 1
    if (doneCountRef.current >= BOARD_ROWS.length) {
      setTimeout(() => setShowPhoto(true), 1400)
    }
  }

  return (
    <header className="relative py-0 px-0 h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="w-full h-full max-w-5xl mx-auto px-0 sm:px-4">
        <AnimatePresence mode="wait">
          {!showPhoto ? (
            <motion.div
              key="board"
              exit={{ opacity: 0, scale: 0.9, rotateX: -25 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              className="bg-slate-900 sm:rounded-3xl px-4 sm:px-10 py-8 shadow-2xl w-full h-full flex flex-col justify-center"
              style={{ perspective: 900 }}
            >
              <p className="text-center text-xs sm:text-base tracking-[0.4em] text-sky-300/70 mb-8">
                ✈ BOARDING PASS
              </p>

              <div className="flex flex-col gap-3 sm:gap-4">
                {BOARD_ROWS.map((row, i) => (
                  <FlipRow
                    key={i}
                    frames={row.frames}
                    final={row.final}
                    startDelay={ROW_START_DELAY}
                    lockDurationMs={ROW_LOCK_DURATION}
                    paused={isRsvpModalOpen}
                    onDone={handleRowDone}
                  />
                ))}
              </div>

              <p className="text-center text-xs sm:text-base tracking-[0.4em] text-sky-300/50 mt-8">
                WEDDING FLIGHT
              </p>
            </motion.div>
          ) : (

            <motion.div
              key="photo"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative w-full h-full sm:rounded-3xl overflow-hidden shadow-2xl"
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
