import React, { useState } from 'react'
import Coin from './Coin'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = [
  { id: 'about', svg: AboutSVG, title: 'Core', hint: "What's under the surface?" },
  { id: 'build', svg: BuildSVG, title: 'Build', hint: 'Not your typical angel' },
  { id: 'thoughts', svg: ThinkSVG, title: 'Think', hint: 'Money is a means, not the end' },
  { id: 'puzzle', svg: PuzzleSVG, title: 'Puzzle', hint: 'Try me' }
]

export default function VaultHome(){
  const [active, setActive] = useState(null)
  const [puzzle, setPuzzle] = useState({ input: '', unlocked: false })
  const [coins, setCoins] = useState(4)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const secret = 'entropy'

  function submitPuzzle(){
    if (puzzle.input.trim().toLowerCase() === secret){
      setPuzzle({ ...puzzle, unlocked: true })
      setActive('puzzle')
    } else {
      alert('Try again')
    }
  }

  function dropCoin(){
    if (coins <= 0) return alert('No coins left')
    setCoins(c => c - 1)
    // earn animation
    const el = document.querySelector('.coin-3d')
    if (el){
      el.classList.add('earn')
      setTimeout(() => el.classList.remove('earn'), 600)
    }
    // small unlock behavior: first drop reveals About
    if (coins === 1) setActive('about')
  }

  const quotes = [
    'Built lending ladders in two countries.',
    'Runs a low-signal investor lab.',
    'Likes paradoxes and experiments.'
  ]

  // rotate quotes
  React.useEffect(() => {
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % quotes.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="brand"><div className="logo">N</div><h1>Naviya</h1></div>
        <nav className="nav"><a href="#">Vault</a><a href="#about">About</a><a href="#thoughts">Thoughts</a></nav>
      </header>

      <main>
        <section className="vault">
          <div className="vault-left">
            <h2 className="hero-title">Puzzle Vault</h2>
            <p className="hero-sub">A minimal vault — bring coins, unlock secrets.</p>

            <div className="icons">
              {ICONS.map(ic => (
                <motion.button key={ic.id} className={`icon ${active===ic.id? 'active':''} ${ic.id==='puzzle' ? 'pulse' : ''}`} onClick={() => {
                  setActive(ic.id)
                  // earn coins when visiting Build or Think
                  if (ic.id==='build' || ic.id==='thoughts') setCoins(c=>Math.min(10,c+1))
                }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }}>
                  <span className="hint">{ic.hint}</span>
                  <ic.svg />
                  <div className="icon-label">{ic.title}</div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {active && (
                <motion.div className="panel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                  {active === 'about' && (
                    <div>
                      <h3>The Core Layer</h3>
                      <p><strong>What I build:</strong> Money systems, capital bridges, behavioral tools</p>
                      <p><strong>How I move:</strong> Curious, rigorous, future-facing</p>
                      <p><strong>What I value:</strong> Agency &gt; access &gt; autonomy</p>
                      <button onClick={() => alert('"Agency is freedom to choose." — sci-fi quote placeholder')}>agency</button>
                    </div>
                  )}

                  {active === 'build' && (
                    <div>
                      <h3>Under the Hood</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        <div className="panel-row"><Coin onClick={() => alert('Flip Tala')} /><div><strong>Tala</strong><div className="muted">Lucy, lending logic, crypto pilots</div></div></div>
                        <div className="panel-row"><Coin onClick={() => alert('Flip District Angels')} /><div><strong>District Angels</strong><div className="muted">Investor collective</div></div></div>
                      </div>
                    </div>
                  )}

                  {active === 'thoughts' && (
                    <div>
                      <h3>Mental Models</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['Money','Systems','Culture','Optionality','Failure','Maslow','Sci-fi'].map(t => (
                          <button key={t} className="icon-label" onMouseEnter={() => {}}>{t}</button>
                        ))}
                      </div>
                      <div style={{ marginTop: 12 }}><button onClick={() => alert('Vending a random thought: Make small experiments cheap')}>Drop a coin (vending)</button></div>
                    </div>
                  )}

                  {active === 'puzzle' && (
                    <div>
                      <h3>Puzzle Vault</h3>
                      <div className="panel">
                        <p>I increase the more you give me away. What am I?</p>
                        <input value={puzzle.input} onChange={e => setPuzzle({ ...puzzle, input: e.target.value })} placeholder="Your answer" />
                        <div style={{ marginTop: 8 }}><button className="btn btn-primary" onClick={submitPuzzle}>Submit</button></div>
                        {puzzle.unlocked && <div style={{ marginTop: 12 }}><strong>Unlocked!</strong><p>Secret content: congrats.</p></div>}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginTop: 18 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Coin onClick={dropCoin} />
                <div className="muted">Coins: {coins} · Spend 3 to reveal secret</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <button className="btn" onClick={() => {
                  if (coins >=3){
                    setCoins(c=>c-3)
                    alert('Secret revealed: you get a paradox!')
                  } else alert('Need 3 coins')
                }}>Spend 3 coins for a secret</button>
              </div>
            </div>

          </div>

          <aside className="vault-right">
            <motion.div className="vault-box" animate={{ rotateY: 6 }} transition={{ yoyo: Infinity, duration: 4 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar">N</div>
                <div>
                  <strong>Naviya</strong>
                  <div className="muted">AI & Crypto Product</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ height: 46, display: 'flex', alignItems: 'center' }}>{quotes[quoteIndex]}</div>
                <div style={{ marginTop: 8 }}>
                  <p>Email: <a href="mailto:naviya@districtangels.com">naviya@districtangels.com</a></p>
                </div>
              </div>
            </motion.div>
          </aside>

        </section>
      </main>
    </div>
  )
}

// Simple inline SVG components for icons
function AboutSVG(){
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#60a5fa"/></svg>
  )
}
function BuildSVG(){
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="2" fill="#f97316"/></svg>
  )
}
function ThinkSVG(){
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 3c-3 0-5 2-5 5 0 3 2 4 2 6 0 2 3 3 3 3s3-1 3-3c0-2 2-3 2-6 0-3-2-5-5-5z" fill="#34d399"/></svg>
  )
}
function PuzzleSVG(){
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M6 3h6v6H6zM12 12h6v6h-6zM3 9h6v6H3z" fill="#7c3aed"/></svg>
  )
}
