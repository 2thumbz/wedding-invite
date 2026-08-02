import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '우리의 결혼식에 초대합니다',
  description: '모바일 청첩장',
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
