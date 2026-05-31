import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCoins } from '../contexts/CoinsContext'

export function CaseFrame({ children, tone = 'build', backTo = '/', backLabel = 'Back', footLink }){
  const { coins, popCoin } = useCoins()
  return (
    <div className={`case tone-${tone}`}>
      <header className="case-nav">
        <Link to={backTo} className="case-back">← {backLabel}</Link>
        <Link to="/" className="case-mark">Naviya</Link>
        <span className={`case-coin ${popCoin ? 'pop' : ''}`} aria-label={`${coins} coins`}>
          <CoinGlyph /><span>{coins}</span>
        </span>
      </header>
      <main>{children}</main>
      <footer className="case-foot">
        <Link to={footLink?.to || '/#build'}>{footLink?.label || 'More projects →'}</Link>
      </footer>
    </div>
  )
}

function CoinGlyph(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="cgmini" x1="0" x2="1">
          <stop offset="0" stopColor="#f59e0b"/><stop offset="1" stopColor="#c2410c"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill="url(#cgmini)"/>
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">¢</text>
    </svg>
  )
}

/* Inline emoji reactions at the end of meaningful sections — +1 coin first react */
const REACT_EMOJIS = ['👀', '💡', '🤔', '🔥', '❤️']

export function Reactions({ id, prompt = 'React' }){
  const { addCoins } = useCoins()
  const [chosen, setChosen] = useState(() => {
    try {
      const all = JSON.parse(localStorage.getItem('nv_section_reacts') || '{}')
      return all[id] || null
    } catch { return null }
  })

  const handleReact = (emoji) => {
    if (chosen) return
    setChosen(emoji)
    try {
      const all = JSON.parse(localStorage.getItem('nv_section_reacts') || '{}')
      all[id] = emoji
      localStorage.setItem('nv_section_reacts', JSON.stringify(all))
    } catch {}
    addCoins(1)
  }

  return (
    <aside className="reactions">
      <span className="reactions-prompt">{prompt}</span>
      <div className="reactions-row">
        {REACT_EMOJIS.map(e => (
          <button
            key={e}
            className={`reaction-btn ${chosen === e ? 'on' : ''}`}
            onClick={() => handleReact(e)}
            disabled={!!chosen}
            aria-label={`React ${e}`}
          >
            {e}
          </button>
        ))}
        <span className={`reaction-reward ${chosen ? 'in' : ''}`}>+1¢</span>
      </div>
    </aside>
  )
}

/* End-of-article reflection prompt — +3 coins for submitting a reply */
export function ReflectionPrompt({ id, prompt = "Got a take? Drop it." }){
  const { addCoins } = useCoins()
  const [reaction, setReaction] = useState(null)
  const [reply, setReply] = useState('')
  const [submitted, setSubmitted] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('nv_reflections_done') || '[]')).has(id) } catch { return false }
  })

  const handleReact = (emoji) => {
    if (reaction) return
    setReaction(emoji)
    addCoins(2)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reply.trim() || submitted) return
    try {
      const all = JSON.parse(localStorage.getItem('nv_reflections') || '[]')
      all.push({ id, reaction, reply: reply.trim(), at: Date.now() })
      localStorage.setItem('nv_reflections', JSON.stringify(all))
      const done = new Set(JSON.parse(localStorage.getItem('nv_reflections_done') || '[]'))
      done.add(id)
      localStorage.setItem('nv_reflections_done', JSON.stringify([...done]))
    } catch {}
    setSubmitted(true)
    addCoins(3)
  }

  return (
    <aside className="reflect">
      <div className="reflect-eyebrow">Your turn · earn coins</div>
      <h3 className="reflect-prompt">{prompt}</h3>
      <div className="reactions-row">
        {REACT_EMOJIS.map(e => (
          <button
            key={e}
            className={`reaction-btn ${reaction === e ? 'on' : ''}`}
            onClick={() => handleReact(e)}
            disabled={!!reaction}
          >
            {e}
          </button>
        ))}
        <span className="reflect-meta">react +2¢ · reply +3¢</span>
      </div>
      <form onSubmit={handleSubmit} className="reflect-form">
        <textarea
          rows="3"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder={submitted ? 'thanks — saved.' : 'one sentence is enough…'}
          disabled={submitted}
        />
        <button type="submit" disabled={submitted || !reply.trim()}>
          {submitted ? '✓ submitted' : 'Submit'}
        </button>
      </form>
    </aside>
  )
}

/* Tracks when the reader scrolls to the end — quietly awards a one-time reward */
export function ReadComplete({ id, reward = 5 }){
  const ref = useRef(null)
  const { addCoins } = useCoins()
  const [awarded, setAwarded] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('nv_articles_read') || '[]')).has(id) } catch { return false }
  })

  useEffect(() => {
    if (awarded || !ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        addCoins(reward)
        setAwarded(true)
        try {
          const set = new Set(JSON.parse(localStorage.getItem('nv_articles_read') || '[]'))
          set.add(id)
          localStorage.setItem('nv_articles_read', JSON.stringify([...set]))
        } catch {}
      }
    }, { threshold: 0.7 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [awarded, addCoins, reward])

  return (
    <div ref={ref} className={`read-complete ${awarded ? 'awarded' : ''}`}>
      {awarded
        ? <span>✓ You finished the article. <strong>+{reward} coins.</strong></span>
        : <span>Keep scrolling — finishing the article earns +{reward} coins.</span>}
    </div>
  )
}

export function CaseHero({ eyebrow, title, lede, meta }){
  return (
    <section className="case-hero">
      {eyebrow && <p className="case-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {lede && <p className="case-lede">{lede}</p>}
      {meta && (
        <dl className="case-meta">
          {meta.map(m => (
            <div key={m.k} className="case-meta-row">
              <dt>{m.k}</dt><dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}

export function CaseSection({ kicker, title, children, tone }){
  return (
    <section className={`case-section ${tone ? `tone-${tone}` : ''}`}>
      {kicker && <p className="case-kicker">{kicker}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

export function VersionCard({ tag, name, date, lede, children, status }){
  return (
    <div className={`version status-${status || 'shipped'}`}>
      <div className="version-head">
        <span className="version-tag">{tag}</span>
        <span className="version-name">{name}</span>
        {date && <span className="version-date">{date}</span>}
        {status && status !== 'shipped' && <span className="version-status">{status}</span>}
      </div>
      {lede && <p className="version-lede">{lede}</p>}
      {children}
    </div>
  )
}

export function MetricTable({ rows }){
  return (
    <table className="metric-table">
      <tbody>
        {rows.map(r => (
          <tr key={r.k}><th>{r.k}</th><td>{r.v}</td></tr>
        ))}
      </tbody>
    </table>
  )
}

export function ChangeList({ items }){
  return (
    <ul className="change-list">
      {items.map((it, i) => (
        <li key={i}>
          <span className="change-from">{it.from}</span>
          <span className="change-arrow">→</span>
          <span className="change-to">{it.to}</span>
          <span className="change-label">{it.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function Pull({ children }){
  return <blockquote className="pull">{children}</blockquote>
}

/* For long-form essays / theses with stacked data rows.
   Each row has a name + two labelled paragraphs (defaults: What / So what). */
export function DataList({ items, labels = ['What', 'So what'] }){
  return (
    <ul className="data-list">
      {items.map(d => (
        <li key={d.name} className="data-row">
          <h3 className="data-name">{d.name}</h3>
          <div className="data-pair">
            <div className="data-half">
              <span className="data-label">{labels[0]}</span>
              <p>{d.what}</p>
            </div>
            <div className="data-half">
              <span className="data-label">{labels[1]}</span>
              <p>{d.why}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* 3-axis framing block — labelled cards in a row */
export function Axes({ items }){
  return (
    <div className="axes">
      {items.map(it => (
        <div key={it.k} className="axis">
          <div className="axis-k">{it.k}</div>
          <p className="axis-v">{it.v}</p>
        </div>
      ))}
    </div>
  )
}

/* Tight horizontal stat boxes for receipts / proof points */
export function Stats({ items }){
  return (
    <div className="stats">
      {items.map((s, i) => (
        <div key={i} className="stat">
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/* Editorial timeline — time label + body */
export function Timeline({ items }){
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li key={i} className="tl-item">
          <span className="tl-when">{it.when}</span>
          <div className="tl-body">
            <h3>{it.title}</h3>
            {it.body && <p>{it.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/* Numbered list for use cases / theses (01, 02, 03...) */
export function NumberedList({ items }){
  return (
    <ol className="use-cases">
      {items.map((it, i) => (
        <li key={it.title} className="use-case">
          <span className="uc-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="uc-body">
            <h3>{it.title}</h3>
            {it.lede && <p className="uc-lede">{it.lede}</p>}
            {it.points && (
              <ul className="bullets">
                {it.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            )}
            {it.children}
          </div>
        </li>
      ))}
    </ol>
  )
}
