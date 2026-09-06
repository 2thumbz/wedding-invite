import { Dday } from './Dday'

export function WeddingInfo() {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-4">WEDDING DAY</p>
        <p className="font-serif text-4xl text-slate-800 mb-2">2026. 12. 12.</p>
        <p className="text-sm text-slate-500">토요일 오후 4시 10분</p>
      </div>

      <div className="mb-12">
        <Dday />
      </div>

      <div className="w-8 h-px bg-slate-300 mx-auto mb-10" />

      <div className="text-center">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-4">LOCATION</p>
        <p className="font-serif text-xl text-slate-800 mb-1">광명 라포에트</p>
        <p className="text-sm text-slate-500">광명역 동편 지하 1층</p>
      </div>
    </section>
  )
}
