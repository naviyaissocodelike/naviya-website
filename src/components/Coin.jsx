import React from 'react'
import { motion } from 'framer-motion'

export default function Coin({ onClick, className = '', style = {}, label }){
  return (
    <motion.button
      className={`coin-3d ${className}`}
      onClick={onClick}
      whileTap={{ rotateY: 180, scale: 0.95 }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.6 }}
      style={style}
      aria-label={label || 'coin'}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B87333" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#g)" stroke="#8b5e34" strokeWidth="0.5" />
        <text x="12" y="16" fontSize="10" textAnchor="middle" fill="#fff" fontWeight="700">¢</text>
      </svg>
    </motion.button>
  )
}
