import React from 'react'
import { Link } from 'react-router-dom'

export function CaseFrame({ children, tone = 'build', backTo = '/', backLabel = 'Back', footLink }){
  return (
    <div className={`case tone-${tone}`}>
      <header className="case-nav">
        <Link to={backTo} className="case-back">← {backLabel}</Link>
        <Link to="/" className="case-mark">Naviya</Link>
      </header>
      <main>{children}</main>
      <footer className="case-foot">
        <Link to={footLink?.to || '/#build'}>{footLink?.label || 'More projects →'}</Link>
      </footer>
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
