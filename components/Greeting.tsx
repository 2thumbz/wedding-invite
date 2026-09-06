export function Greeting() {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">INVITATION</p>
        <p className="text-sm text-slate-500 mb-10">소중한 분들을 초대합니다</p>

        <p className="font-serif text-lg text-slate-700 leading-loose mb-10">
          혼자일 때보다 둘일 때 더 즐겁고,<br />
          함께라면 바다도 여행도 더 특별했습니다.<br />
          <br />
          함께할 때 가장 나다워지는 평생의 버디와<br />
          인생의 모든 순간을 나누며 살아가겠습니다.
        </p>

        <div className="w-8 h-px bg-slate-300 mx-auto mb-10" />

        <p className="text-sm text-slate-500 leading-relaxed">
          임창수 · 이동연의 아들 <span className="text-slate-800 font-medium">태훈</span>
          <br />
          故 김재홍 · 이재숙의 딸 <span className="text-slate-800 font-medium">지영</span>
        </p>
      </div>
    </section>
  )
}
