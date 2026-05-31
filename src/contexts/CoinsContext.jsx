import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CoinsContext = createContext(null)

/* Single source of truth for coin balance. Survives across routes (Home <-> article pages). */
export function CoinsProvider({ children }){
  const [coins, setCoinsState] = useState(() => {
    try { return Number(localStorage.getItem('nv_coins')) || 0 } catch { return 0 }
  })
  const [popCoin, setPopCoin] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('nv_coins', String(coins)) } catch {}
  }, [coins])

  const addCoins = useCallback((n) => {
    setCoinsState(c => c + n)
    setPopCoin(true)
    setTimeout(() => setPopCoin(false), 600)
  }, [])

  const setCoins = useCallback((updater) => {
    setCoinsState(updater)
  }, [])

  return (
    <CoinsContext.Provider value={{ coins, addCoins, setCoins, popCoin }}>
      {children}
    </CoinsContext.Provider>
  )
}

export function useCoins(){
  const ctx = useContext(CoinsContext)
  if (!ctx) throw new Error('useCoins must be used inside CoinsProvider')
  return ctx
}
