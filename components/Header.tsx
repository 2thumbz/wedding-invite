'use client'

import { motion } from 'framer-motion'

export function Header() {
  return (
    <header className="text-center py-16 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-sky-200 to-blue-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-7xl">✈️</span>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-serif bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Wedding Invitation
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-gray-600 text-xl mb-2">
            함께 떠나는 인생의 비행
          </p>
          <p className="text-gray-500 text-sm">
            우리의 새로운 여정에 초대합니다
          </p>
        </motion.div>
      </div>
    </header>
  )
}
