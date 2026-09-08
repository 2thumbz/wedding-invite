'use client'

import { useSyncExternalStore } from 'react'

// RSVP 팝업(RsvpModal)의 노출 여부를 다른 컴포넌트(Header 등)에서도 알 수 있도록
// 만든 아주 가벼운 전역 스토어. Context를 새로 뚫지 않고도
// 트리 구조와 무관하게 구독/발행이 가능하도록 useSyncExternalStore 패턴을 사용한다.
let isOpen = false
const listeners = new Set<() => void>()

export function setRsvpModalOpen(open: boolean) {
  if (isOpen === open) return
  isOpen = open
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return isOpen
}

function getServerSnapshot() {
  return false
}

/** RSVP 팝업이 현재 열려있는지 여부를 구독하는 훅 */
export function useRsvpModalOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
