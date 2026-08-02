'use client'

export function Contact() {
  const contacts = {
    groom: {
      name: '임태훈',
      phone: '010-1234-5678',
      father: { name: '김아버지', phone: '010-1111-2222' },
      mother: { name: '김어머니', phone: '010-3333-4444' },
    },
    bride: {
      name: '김지영',
      phone: '010-8765-4321',
      father: { name: '김아버지', phone: '010-5555-6666' },
      mother: { name: '김어머니', phone: '010-7777-8888' },
    },
  }

  return (
    <section className="max-w-md mx-auto px-6 py-8 mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-sky-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">📞</span>
          <h3 className="text-2xl font-serif text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Contact Us
          </h3>
          <span className="text-2xl">💌</span>
        </div>
        
        <div className="space-y-6">
          {/* 신랑 측 */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <span>🤵</span> 신랑측
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 bg-white rounded-lg px-3">
                <span className="text-gray-800 font-medium">신랑 {contacts.groom.name}</span>
                <a 
                  href={`tel:${contacts.groom.phone}`}
                  className="text-sky-600 hover:text-sky-700 font-medium"
                >
                  📞 전화하기
                </a>
              </div>
              <div className="flex justify-between items-center py-2 bg-white/50 rounded-lg px-3">
                <span className="text-gray-600 text-sm">부 {contacts.groom.father.name}</span>
                <a 
                  href={`tel:${contacts.groom.father.phone}`}
                  className="text-sky-600 hover:text-sky-700 text-sm"
                >
                  📞 전화
                </a>
              </div>
              <div className="flex justify-between items-center py-2 bg-white/50 rounded-lg px-3">
                <span className="text-gray-600 text-sm">모 {contacts.groom.mother.name}</span>
                <a 
                  href={`tel:${contacts.groom.mother.phone}`}
                  className="text-sky-600 hover:text-sky-700 text-sm"
                >
                  📞 전화
                </a>
              </div>
            </div>
          </div>
          
          {/* 신부 측 */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 border border-blue-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <span>👰</span> 신부측
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 bg-white rounded-lg px-3">
                <span className="text-gray-800 font-medium">신부 {contacts.bride.name}</span>
                <a 
                  href={`tel:${contacts.bride.phone}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  📞 전화하기
                </a>
              </div>
              <div className="flex justify-between items-center py-2 bg-white/50 rounded-lg px-3">
                <span className="text-gray-600 text-sm">부 {contacts.bride.father.name}</span>
                <a 
                  href={`tel:${contacts.bride.father.phone}`}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  📞 전화
                </a>
              </div>
              <div className="flex justify-between items-center py-2 bg-white/50 rounded-lg px-3">
                <span className="text-gray-600 text-sm">모 {contacts.bride.mother.name}</span>
                <a 
                  href={`tel:${contacts.bride.mother.phone}`}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  📞 전화
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t-2 border-sky-200 text-center">
          <p className="text-gray-700 font-medium mb-4 flex items-center justify-center gap-2">
            <span>🎁</span> 마음 전하실 곳
          </p>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-3 rounded-xl hover:from-sky-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg font-medium">
              💍 신랑에게 마음 전하기
            </button>
            <button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-sky-600 transition-all shadow-md hover:shadow-lg font-medium">
              💍 신부에게 마음 전하기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
