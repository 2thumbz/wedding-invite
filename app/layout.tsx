import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '임태훈 ❤️ 김지영, 12월12일 우리의 결혼식에 초대합니다',
  description: '12월12일 16:10 광명역 라포에트',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
