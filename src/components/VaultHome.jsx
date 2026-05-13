import React, { useState } from 'react'
import Coin from './Coin'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = [
  { id: 'think', svg: ThinkSVG, title: 'Think', hint: 'Essays & frameworks' },
  { id: 'build', svg: BuildSVG, title: 'Build', hint: 'Projects & experiments' },
  { id: 'imagine', svg: ImagineSVG, title: 'Imagine', hint: 'Future visions & sci-fi' },
  { id: 'play', svg: PlaySVG, title: 'Play', hint: 'Design & culture' },
  { id: 'freestyle', svg: FreestyleSVG, title: 'Freestyle', hint: 'Misc projects' },
  { id: 'vending', svg: VendingSVG, title: 'Vending Machine', hint: 'Unlock gems with coins' }
]

export default function VaultHome(){
  const [active, setActive] = useState(null)
  const [puzzle, setPuzzle] = useState({ input: '', unlocked: false })
  const [coins, setCoins] = useState(() => {
    try{
      const v = localStorage.getItem('nv_coins')
      return v ? Number(v) : 4
    }catch(e){ return 4 }
  })
  const [quoteIndex, setQuoteIndex] = useState(0)

  const secret = 'entropy'

const submitPuzzle = () => {
    if (puzzle.input.trim().toLowerCase() === "entropy") {
      setPuzzle({ ...puzzle, unlocked: true });
      alert("Unlocked! 🎉");
    } else alert("Try again");
};

  function dropCoin(){
    if (coins <= 0) return alert('No coins left')
    setCoins(c => {
      const next = c - 1
      try{ localStorage.setItem('nv_coins', String(next)) }catch(e){}
      return next
    })
    // earn animation
    const el = document.querySelector('.coin-3d')
    if (el){
      el.classList.add('earn')
      setTimeout(() => el.classList.remove('earn'), 600)
    }
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
        <div className="header-right">
          <nav className="nav">
            <a href="/pages/think.html">Think</a>
            <a href="/pages/build.html">Build</a>
            <a href="/pages/imagine.html">Imagine</a>
            <a href="/pages/play.html">Play</a>
            <a href="/pages/freestyle.html">Freestyle</a>
            <a href="/pages/vending.html">Vending Machine</a>
          </nav>
          <div className="coins"><CoinIcon /> <span style={{marginLeft:8}}>Coins: {coins}</span></div>
        </div>
      </header>

      <main>
        <section className="vault">
          <div className="vault-left">
            <div className="hero-left">
              <div className="photo-placeholder">insert photo</div>
              <h2 className="hero-title">hi! thank u for being here</h2>
              <p className="hero-blurb">[insert blurb]</p>
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

                  {active === 'imagine' && (
                    <div>
                      <h3>Future Visions</h3>
                      <div className="panel">
                        <p>Explore speculative futures, sci-fi scenarios, and the worlds we could build.</p>
                        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {['Post-scarcity', 'AI Governance', 'Space Colonies', 'Digital Consciousness', 'Climate Futures'].map(t => (
                            <button key={t} className="icon-label">{t}</button>
                          ))}
                        </div>
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
            <div className="icons">
              {ICONS.map((ic, i) => {
                const isLarge = i < 3
                const cls = `icon ${isLarge ? 'large' : 'small'} ${active===ic.id? 'active':''} ${ic.id==='imagine' ? 'pulse' : ''}`
                const href = ic.id === 'vending' ? '/pages/vending.html' : `/pages/${ic.id}.html`
                return (
                  <motion.button
                    key={ic.id}
                    className={cls}
                    onClick={() => { window.location.href = href }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={ic.title}
                    tabIndex={0}
                    onKeyDown={(e)=>{
                      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); window.location.href = href }
                    }}
                  >
                    <span className="hint">{ic.hint}</span>
                    <ic.svg />
                    <div className="icon-label">{ic.title}</div>
                  </motion.button>
                )
              })}
            </div>

            <div className="vault-box">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar"><img src="/avatar.png" alt="Naviya" style={{width:64,height:64,borderRadius:999}} onError={(e)=>{e.target.style.display='none'}}/></div>
                <div>
                  <div className="name">Key for the rest of the website</div>
                  <div className="title">Read articles on each page to earn coins and unlock gems at the Vending Machine.</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ height: 46, display: 'flex', alignItems: 'center' }}>{quotes[quoteIndex]}</div>
              </div>
            </div>
          </aside>

        </section>
      </main>
    </div>
  )
}

// Simple inline SVG components for icons
function AboutSVG(){
  return (
    <svg role="img" aria-label="Core: nucleus" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e6f2ff" />
      <circle cx="12" cy="12" r="6" fill="#60a5fa" />
      <circle cx="12" cy="12" r="2" fill="#0ea5ff" />
      <g stroke="#0ea5ff" strokeWidth="0.8" fill="none">
        <circle cx="12" cy="12" r="8" />
      </g>
    </svg>
  )
}
function BuildSVG(){
  return (
    <svg role="img" aria-label="Build: coin stack" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gcoin" x1="0" x2="1">
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B87333" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="18" height="12" rx="3" fill="#fff6eb" opacity="0.9" />
      <ellipse cx="12" cy="9.5" rx="6" ry="2.2" fill="url(#gcoin)" stroke="#8b5e34" strokeWidth="0.5" />
      <ellipse cx="12" cy="12.6" rx="5.1" ry="1.8" fill="#f59e0b" opacity="0.95" />
      <ellipse cx="12" cy="15.2" rx="4" ry="1.4" fill="#b87333" opacity="0.96" />
    </svg>
  )
}
function ThinkSVG(){
  return (
    <svg role="img" aria-label="Think: brain spiral" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#f0fdf4" />
      <path d="M7.5 12c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5c-1.243 0-2.365-.48-3.2-1.26" stroke="#2bb673" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M12 8.5c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3c0-.633.194-1.215.525-1.69" stroke="#34d399" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}
function ImagineSVG(){
  return (
    <svg role="img" aria-label="Imagine: future vision" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#fff5f5" />
      <circle cx="12" cy="12" r="8" fill="#ffe4e6" />
      <path d="M12 4v16M4 12h16" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="#fff" stroke="#f43f5e" strokeWidth="1"/>
      <circle cx="12" cy="12" r="1" fill="#f43f5e"/>
    </svg>
  )
}

function PlaySVG(){
  return (
    <svg role="img" aria-label="Play: creativity" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#fffaf0" />
      <path d="M8 6v12l10-6-10-6z" fill="#f97316" />
    </svg>
  )
}
function FreestyleSVG(){
  return (
    <svg role="img" aria-label="Freestyle" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#f8fff5" />
      <path d="M6 12h12M6 8h8M6 16h10" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function VendingSVG(){
  return (
    <svg role="img" aria-label="Vending Machine" width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="0" y="0" width="24" height="24" rx="6" fill="#f5f3ff" />
      <rect x="6" y="5" width="12" height="14" rx="2" fill="#fff" stroke="#7c3aed" strokeWidth="0.8"/>
      <circle cx="16" cy="9" r="1" fill="#7c3aed" />
    </svg>
  )
}

function CoinIcon(){
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" x2="1"><stop offset="0" stopColor="#F59E0B"/><stop offset="1" stopColor="#B87333"/></linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill="url(#cg)" stroke="#8b5e34" strokeWidth="0.6" />
      <text x="12" y="15" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">¢</text>
    </svg>
  )
}
