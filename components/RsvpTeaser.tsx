import Link from 'next/link'

export function RsvpTeaser() {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center border border-slate-200 rounded-2xl px-8 py-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">R.S.V.P.</p>
        <p className="text-sm text-slate-500 mb-6">
          참석 의사를 미리 전달해주시면<br />준비에 큰 도움이 됩니다
        </p>
        <Link
          href="/rsvp"
          className="inline-block text-xs tracking-wide text-white bg-sky-500 rounded-full px-6 py-3 hover:bg-sky-600 transition-colors"
        >
          참석의사 전달하기
        </Link>
      </div>
    </section>
  )
}
