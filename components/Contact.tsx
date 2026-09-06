'use client'

const contacts = {
  groom: {
    name: '임태훈',
    phone: '010-2055-1068',
    father: { name: '임창수', phone: '' },
    mother: { name: '이동연', phone: '010-3333-4444' },
  },
  bride: {
    name: '김지영',
    phone: '010-2343-7523',
    father: { name: '故 김재홍', phone: '' },
    mother: { name: '이재숙', phone: '010-7777-8888' },
  },
}

function ContactRow({ role, name, phone }: { role: string; name: string; phone?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
      <span className="text-sm text-slate-600">
        {role} <span className="text-slate-800 font-medium ml-1">{name}</span>
      </span>
      {phone ? (
        <a href={`tel:${phone}`} className="text-xs tracking-wide text-sky-600 border border-sky-200 rounded-full px-3 py-1 hover:bg-sky-50 transition-colors">
          CALL
        </a>
      ) : null}
    </div>
  )
}

export function Contact() {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">CONTACT</p>
        <p className="text-sm text-slate-500">축하의 마음을 전해주세요</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <div>
          <p className="text-xs tracking-[0.2em] text-slate-400 mb-2">신랑측</p>
          <ContactRow role="신랑" name={contacts.groom.name} phone={contacts.groom.phone} />
          <ContactRow role="부" name={contacts.groom.father.name} phone={contacts.groom.father.phone} />
          <ContactRow role="모" name={contacts.groom.mother.name} phone={contacts.groom.mother.phone} />
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-slate-400 mb-2">신부측</p>
          <ContactRow role="신부" name={contacts.bride.name} phone={contacts.bride.phone} />
          <ContactRow role="부" name={contacts.bride.father.name} phone={contacts.bride.father.phone} />
          <ContactRow role="모" name={contacts.bride.mother.name} phone={contacts.bride.mother.phone} />
        </div>
      </div>
    </section>
  )
}
