import { Header } from '@/components/Header'
import { Greeting } from '@/components/Greeting'
import { WeddingInfo } from '@/components/WeddingInfo'
import { Gallery } from '@/components/Gallery'
import { Location } from '@/components/Location'
import { Contact } from '@/components/Contact'
import { FlightAnimation } from '@/components/FlightAnimation'
import { AnimatedSection } from '@/components/AnimatedSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white relative overflow-hidden">
      {/* 비행기 애니메이션 */}
      <FlightAnimation />
      
      {/* 콘텐츠 - 좌측 5vw 공간 확보 */}
      <div className="relative z-10 ml-[5vw] pl-[20px]">
        <Header />
        
        <AnimatedSection delay={0.2}>
          <Greeting />
        </AnimatedSection>
        
        <AnimatedSection delay={0.3}>
          <WeddingInfo />
        </AnimatedSection>
        
        <AnimatedSection delay={0.4}>
          <Gallery />
        </AnimatedSection>
        
        <AnimatedSection delay={0.5}>
          <Location />
        </AnimatedSection>
        
        <AnimatedSection delay={0.6}>
          <Contact />
        </AnimatedSection>
        
        <footer className="text-center py-8 text-gray-500 text-sm">
          <p>© 2026 우리의 결혼식</p>
        </footer>
      </div>
    </main>
  )
}
