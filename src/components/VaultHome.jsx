import React, { useState, useEffect, useRef } from 'react'
import { RIDDLES } from '../data/riddles'

const GITHUB_URL = 'https://github.com/naviyaissocodelike'
const SUBSTACK_URL = '#'
const EMAIL = 'hello@naviya.xyz'

const WORK = [
  {
    title: 'Tala',
    role: 'Manager · New Ventures (AI / Crypto)',
    blurb: 'Credit infrastructure across eight emerging markets. Shipping AI loan agents and stablecoin pilots.',
    href: 'https://tala.co'
  },
  {
    title: 'District Angels',
    role: 'Founder',
    blurb: 'An angel investing collective in DC. Backing builders early, with conviction.',
    href: '#'
  }
]

const REPOS = [
  { name: 'wise-glade', desc: 'Daily job intelligence agent.', lang: 'Python', langColor: '#3776ab', href: `${GITHUB_URL}/wise-glade` },
  { name: 'analyst-agent', desc: 'Paper-trading research agent with Claude reasoning.', lang: 'Python', langColor: '#3776ab', href: `${GITHUB_URL}/analyst-agent` },
  { name: 'lucy-loans', desc: 'Production AI loan underwriting agent.', lang: 'Python', langColor: '#3776ab', href: GITHUB_URL },
  { name: 'naviya-website', desc: 'This site. Built simply.', lang: 'JavaScript', langColor: '#f1e05a', href: `${GITHUB_URL}/naviya-website` }
]

const NOTES = [
  { date: '2026 · 05', tag: 'AI',               title: 'Diffusion in emerging markets',          blurb: 'How fintech partnerships ship AI to the next billion users.', href: SUBSTACK_URL },
  { date: '2026 · 04', tag: 'Money',            title: 'Underwriting in eight countries',         blurb: "What credit looks like when you can't trust the bureau.",     href: SUBSTACK_URL },
  { date: '2026 · 03', tag: 'Investing',        title: 'Notes from District Angels',              blurb: 'What an angel collective gets right that solo checks miss.',    href: SUBSTACK_URL },
  { date: '2026 · 02', tag: 'Building',         title: 'Shipping agents in production',           blurb: 'A short list of things that broke and what I changed.',         href: SUBSTACK_URL },
  { date: '2026 · 01', tag: 'AI',               title: 'The agent stack I use',                   blurb: "AWS Strands + Claude. Why, when, and what I'd swap.",          href: SUBSTACK_URL },
  { date: '2025 · 12', tag: 'Money',            title: 'Money at the speed of trust',             blurb: 'Stablecoin pilots and what the bureau gets wrong.',             href: SUBSTACK_URL }
]

const TAGS = ['All', 'AI', 'Money', 'Investing', 'Building']

const SECTIONS = [
  { id: 'think', label: 'Think', Icon: ThinkIcon },
  { id: 'build', label: 'Build', Icon: BuildIcon },
  { id: 'play', label: 'Play', Icon: PlayIcon },
  { id: 'work', label: 'Work', Icon: WorkIcon }
]

export default function Home(){
  const [coins, setCoins] = useState(() => {
    try { return Number(localStorage.getItem('nv_coins')) || 0 } catch { return 0 }
  })
  const [activeTag, setActiveTag] = useState('All')
  const [popCoin, setPopCoin] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('nv_coins', String(coins)) } catch {}
  }, [coins])

  const addCoins = (n) => {
    setCoins(c => c + n)
    setPopCoin(true)
    setTimeout(() => setPopCoin(false), 600)
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredNotes = activeTag === 'All' ? NOTES : NOTES.filter(n => n.tag === activeTag)

  return (
    <div className="page">
      <header className="nav">
        <a className="mark" href="#top">Naviya</a>
        <div className="nav-icons">
          {SECTIONS.map(s => (
            <button key={s.id} className="nav-icon" onClick={() => scrollTo(s.id)} aria-label={s.label}>
              <s.Icon />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className={`coin-badge ${popCoin ? 'pop' : ''}`} aria-label={`${coins} coins`}>
          <CoinSVG />
          <span>{coins}</span>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Builder · Operator · Investor</p>
          <h1>Frontier tech, in the hands of the overlooked.</h1>
          <p className="lede">
            I work on AI agents, programmable money, and the systems that move information and capital — and
            how to put those tools in the hands of the people the rest of the world tends to skip. Money systems
            were the first bet. The thesis is wider now.
          </p>
          <div className="hero-meta">
            <a href={GITHUB_URL}>GitHub →</a>
            <a href={SUBSTACK_URL}>Substack →</a>
            <a href={`mailto:${EMAIL}`}>Email →</a>
          </div>
        </section>

        <section id="about" className="block">
          <h2>About</h2>
          <p>
            I'm Naviya. I work on AI and crypto at <a href="https://tala.co">Tala</a>, where we're building credit
            infrastructure across eight emerging markets. On the side, I run <a href="#">District Angels</a> —
            an early-stage angel collective in DC.
          </p>
          <p>
            I started with money because credit is the most legible form of agency — and most of the world doesn't
            have it. The lens kept widening. Now I look for any tool sharp enough to flip the default for someone
            who never had one: AI agents, programmable money, whatever's next.
          </p>
          <p>
            Operations research at Cornell. Builder by training, investor by curiosity, operator by trade.
          </p>
        </section>

        <section id="think" className="block">
          <h2>Think</h2>
          <p className="block-sub">
            Notes, essays, half-formed ideas. Mostly on <a href={SUBSTACK_URL}>Substack</a>.
          </p>
          <div className="chips">
            {TAGS.map(t => (
              <button
                key={t}
                className={`chip ${activeTag === t ? 'active' : ''}`}
                onClick={() => setActiveTag(t)}
              >{t}</button>
            ))}
          </div>
          <ul className="entries">
            {filteredNotes.map((note, i) => (
              <li key={`${note.title}-${i}`}>
                <a href={note.href} className="entry">
                  <span className="entry-date">{note.date}</span>
                  <div className="entry-body">
                    <h3>{note.title}</h3>
                    <p>{note.blurb}</p>
                  </div>
                  <span className="entry-tag">{note.tag}</span>
                  <span className="entry-arrow" aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="build" className="block">
          <h2>Build</h2>
          <p className="block-sub">Public code on <a href={GITHUB_URL}>GitHub</a>. Mostly Python agents and small tools.</p>
          <div className="repos">
            {REPOS.map(r => (
              <a key={r.name} href={r.href} className="repo">
                <div className="repo-head">
                  <RepoIcon />
                  <span className="repo-name">{r.name}</span>
                </div>
                <p className="repo-desc">{r.desc}</p>
                <div className="repo-foot">
                  <span className="lang-dot" style={{ background: r.langColor }} />
                  <span className="repo-lang">{r.lang}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="play" className="block">
          <h2>Play</h2>
          <p className="block-sub">Solve a riddle. Collect coins. Spend them on a secret.</p>
          <RiddleVault coins={coins} addCoins={addCoins} setCoins={setCoins} />
        </section>

        <section id="work" className="block">
          <h2>Work</h2>
          <ul className="list">
            {WORK.map(item => (
              <li key={item.title}>
                <a href={item.href} className="item">
                  <div className="item-head">
                    <span className="item-title">{item.title}</span>
                    <span className="item-role">{item.role}</span>
                  </div>
                  <p className="item-blurb">{item.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Naviya Kothari</span>
        <span className="footer-tag">Built simply.</span>
      </footer>
    </div>
  )
}

const REEL_SYMBOLS = ['?', '¢', '★', '◆', '♠', '△', '○', '□', '✦', '✿']

function RiddleVault({ coins, addCoins, setCoins }){
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * RIDDLES.length))
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [solvedIds, setSolvedIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('nv_solved') || '[]')) } catch { return new Set() }
  })
  const [secret, setSecret] = useState('')
  const [secretDispensed, setSecretDispensed] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [reels, setReels] = useState(['?', '?', '?'])
  const [dispensed, setDispensed] = useState(true)

  const riddle = RIDDLES[idx]
  const alreadySolved = solvedIds.has(idx)

  const submit = (e) => {
    e?.preventDefault?.()
    if (!input.trim() || spinning) return
    if (input.trim().toLowerCase() === riddle.a.toLowerCase()) {
      if (!alreadySolved) {
        addCoins(3)
        const next = new Set(solvedIds); next.add(idx); setSolvedIds(next)
        try { localStorage.setItem('nv_solved', JSON.stringify([...next])) } catch {}
        setStatus('correct')
      } else {
        setStatus('already')
      }
    } else {
      setStatus('wrong')
    }
  }

  const dispenseNext = () => {
    if (spinning) return
    setSpinning(true)
    setDispensed(false)
    setInput(''); setStatus(''); setShowHint(false)

    const target = (idx + 1 + Math.floor(Math.random() * (RIDDLES.length - 1))) % RIDDLES.length
    const start = Date.now()
    const duration = 1100

    const tick = () => {
      const elapsed = Date.now() - start
      if (elapsed < duration) {
        setReels([
          REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
          REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
          REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)]
        ])
        setTimeout(tick, 60)
      } else {
        const digits = String(target + 1).padStart(3, '0').split('')
        setReels(digits)
        setIdx(target)
        setSpinning(false)
        setTimeout(() => setDispensed(true), 80)
      }
    }
    tick()
  }

  const spendSecret = () => {
    if (coins < 5) return
    setCoins(c => c - 5)
    const secrets = [
      'Agency > access > autonomy.',
      'Most fintechs underwrite vibes, not cash flows.',
      'The best moats are habits, not features.',
      'Write the doc first. The code falls out.',
      "If you can't explain the trade in one sentence, don't take it."
    ]
    setSecret(secrets[Math.floor(Math.random() * secrets.length)])
    setSecretDispensed(false)
    setTimeout(() => setSecretDispensed(true), 50)
  }

  return (
    <div className="machine">
      <div className="machine-top">
        <div className="machine-brand">
          <span className="machine-bolt" /> NAVIYA'S VAULT <span className="machine-bolt" />
        </div>
        <div className="machine-lights">
          <span className={`light ${spinning ? 'on' : ''}`} />
          <span className={`light ${spinning ? 'on' : ''}`} />
          <span className={`light ${spinning ? 'on' : ''}`} />
        </div>
      </div>

      <div className="machine-display">
        <div className={`reels ${spinning ? 'spinning' : ''}`}>
          {reels.map((s, i) => (
            <div key={i} className="reel">
              <span className="reel-val">{s}</span>
            </div>
          ))}
        </div>
        <div className="display-label">
          {spinning ? 'dispensing…' : alreadySolved ? `solved · riddle ${idx + 1}/${RIDDLES.length}` : `riddle ${idx + 1}/${RIDDLES.length}`}
        </div>
      </div>

      <div className={`dispense-tray ${dispensed && !spinning ? 'in' : 'out'}`}>
        <p className="riddle-q">{riddle.q}</p>
        {showHint && <p className="riddle-hint">hint: {riddle.hint}</p>}
        <form onSubmit={submit} className="riddle-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type your answer…"
            autoComplete="off"
            disabled={spinning}
          />
          <button type="submit" className="btn" disabled={spinning}>Guess</button>
        </form>
        <div className="riddle-actions">
          <button onClick={() => setShowHint(s => !s)} className="link-btn" disabled={spinning}>
            {showHint ? 'hide hint' : 'hint'}
          </button>
          <button onClick={dispenseNext} className="link-btn" disabled={spinning}>
            new riddle →
          </button>
        </div>
        {status === 'correct' && <p className="msg ok">✓ correct. +3 coins dropped into your wallet.</p>}
        {status === 'already' && <p className="msg muted-msg">already solved — no extra coins.</p>}
        {status === 'wrong' && <p className="msg bad">not quite. try again.</p>}
      </div>

      <div className="machine-base">
        <div className="machine-stats">
          <div className="machine-stat">
            <div className="machine-stat-num">{coins}</div>
            <div className="machine-stat-label">coins</div>
          </div>
          <div className="machine-divider" />
          <div className="machine-stat">
            <div className="machine-stat-num">{solvedIds.size}</div>
            <div className="machine-stat-label">solved</div>
          </div>
        </div>

        <button
          className="dispense-btn"
          onClick={spendSecret}
          disabled={coins < 5}
          title={coins < 5 ? 'need 5 coins' : 'insert 5 coins'}
        >
          <span className="dispense-btn-coin"><CoinSVG /></span>
          insert 5 → secret
        </button>
      </div>

      {secret && (
        <div className={`secret-drop ${secretDispensed ? 'in' : ''}`}>
          <span className="secret-tag">dispensed</span>
          <p>{secret}</p>
        </div>
      )}
    </div>
  )
}

/* ---------- icons ---------- */

function ThinkIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.4 1 1.1 1 1.8V18h6v-1.5c0-.7.4-1.4 1-1.8A7 7 0 0 0 12 2z"/>
    </svg>
  )
}
function BuildIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 6 2 12 8 18"/><polyline points="16 6 22 12 16 18"/>
    </svg>
  )
}
function PlayIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M9 9h.01"/><path d="M15 15h.01"/><path d="M15 9h.01"/><path d="M9 15h.01"/><path d="M12 12h.01"/>
    </svg>
  )
}
function WorkIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  )
}
function RepoIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}
function CoinSVG(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="cg" x1="0" x2="1">
          <stop offset="0" stopColor="#f59e0b"/><stop offset="1" stopColor="#c2410c"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill="url(#cg)"/>
      <circle cx="12" cy="12" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">¢</text>
    </svg>
  )
}
