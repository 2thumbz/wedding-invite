import { Header } from '@/components/Header'
import { Greeting } from '@/components/Greeting'
import { WeddingInfo } from '@/components/WeddingInfo'
import { Gallery } from '@/components/Gallery'
import { Location } from '@/components/Location'
import { RsvpModal } from '@/components/RsvpModal'
import { RsvpTeaser } from '@/components/RsvpTeaser'
import { Contact } from '@/components/Contact'
import { Account } from '@/components/Account'
import { PhotoUpload } from '@/components/PhotoUpload'
import { Guestbook } from '@/components/Guestbook'
import { AnimatedSection } from '@/components/AnimatedSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* 참석의사 전달 랜딩 모달 */}
      <RsvpModal />

      {/* 콘텐츠 */}
      <div className="relative z-10">
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

        <AnimatedSection delay={0.55}>
          <Contact />
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Guestbook />
        </AnimatedSection>

        <AnimatedSection delay={0.62}>
          <Account />
        </AnimatedSection>

        <AnimatedSection delay={0.65}>
          <RsvpTeaser />
        </AnimatedSection>

        <AnimatedSection delay={0.68}>
          <PhotoUpload />
        </AnimatedSection>
        
        <footer className="text-center py-8 text-gray-500 text-sm">
          <p>© 2026 우리의 결혼식</p>
        </footer>
      </div>
    </main>
  )
}
