'use client'

import Image from 'next/image'
import { useState } from 'react'

export function Location() {
  const [isMapOpen, setIsMapOpen] = useState(false)

  return (
    <section className="max-w-md mx-auto px-6 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-sky-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">📍</span>
          <h3 className="text-2xl font-serif text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Arrival Guide
          </h3>
          <span className="text-2xl">🧭</span>
        </div>
        
        <div className="mb-6">
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 text-center border-2 border-dashed border-sky-300">
            <p className="text-lg font-bold text-gray-800 mb-2">
              🏛️ 라포에트 웨딩홀
            </p>
            <p className="text-gray-600 text-sm mb-1">
              경기도 광명시 광명역로 21
            </p>
            <p className="text-gray-500 text-xs mb-4">
              광명역 동편 지하1층
            </p>
            <a 
              href="https://naver.me/5du4RWOQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-sky-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg font-medium"
            >
              🗺️ 지도로 찾아가기
            </a>
          </div>
        </div>

        {/* 약도 이미지 */}
        <div className="mb-6">
          <div 
            className="rounded-xl overflow-hidden border-2 border-sky-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setIsMapOpen(true)}
          >
            <Image
              src="/assets/image/map.jpg"
              alt="오시는 길 약도"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-gray-500 text-xs mt-2">
            🗺️ 웨딩홀 약도 (클릭하면 크게 볼 수 있습니다)
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-sky-50 to-transparent rounded-lg p-4 border-l-4 border-sky-400">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🚇</span> 지하철
            </p>
            <p className="text-gray-600 text-sm">
              2호선 강남역 3번 출구 도보 5분
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-4 border-l-4 border-blue-400">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🚌</span> 버스
            </p>
            <p className="text-gray-600 text-sm">
              간선: 146, 341, 360<br />
              지선: 4412, 4419
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50 to-transparent rounded-lg p-4 border-l-4 border-sky-400">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🚗</span> 주차
            </p>
            <p className="text-gray-600 text-sm">
              건물 지하 주차장 이용 가능 (3시간 무료)
            </p>
          </div>
        </div>
      </div>

      {/* 풀스크린 모달 */}
      {isMapOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsMapOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
            >
              ✕
            </button>
            <div className="relative max-w-4xl max-h-full">
              <Image
                src="/assets/image/map.jpg"
                alt="오시는 길 약도"
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
