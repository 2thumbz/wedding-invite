export function WeddingInfo() {
  return (
    <section className="max-w-md mx-auto px-6 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-sky-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">🛫</span>
          <h3 className="text-2xl font-serif text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Flight Information
          </h3>
          <span className="text-2xl">🛬</span>
        </div>
        
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4">
            <p className="text-sky-600 text-sm mb-2 font-medium">📅 Departure Date</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-sky-700 to-blue-700 bg-clip-text text-transparent">
              2026년 12월 25일
            </p>
            <p className="text-gray-600 mt-1">금요일</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4">
            <p className="text-blue-600 text-sm mb-2 font-medium">🕐 Boarding Time</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">
              오후 2시 30분
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4">
            <p className="text-sky-600 text-sm mb-2 font-medium">📍 Destination</p>
            <p className="text-xl font-bold text-gray-800 mb-1">
              서울 웨딩홀
            </p>
            <p className="text-gray-600">
              5층 그랜드홀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
