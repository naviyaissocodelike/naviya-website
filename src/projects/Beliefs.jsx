import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaseFrame, CaseHero } from '../components/CaseStudy'

const SUBSTACK_URL = '#'

const AUDIENCES = [
  { id: 'investors', label: 'For investors', blurb: 'Where I think the durable bets are.',                       icon: BriefcaseIcon },
  { id: 'bicoastal', label: 'Bicoastal',     blurb: 'Notes for DC and the Bay.',                                  icon: CompassIcon },
  { id: 'em',        label: 'EM operators',  blurb: "For people building where the bureau doesn't reach.",       icon: GlobeIcon },
  { id: 'ai',        label: 'AI labs',       blurb: 'For Anthropic, OpenAI, and the rest of the frontier.',     icon: ChipIcon }
]

function BriefcaseIcon(){ return (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
)}
function CompassIcon(){ return (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
)}
function GlobeIcon(){ return (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)}
function ChipIcon(){ return (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/>
    <line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/>
    <line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/>
  </svg>
)}

const BELIEFS = {
  investors: [
    { claim: "The next decade's best EM fintechs will be partnership-first, not labs.",
      label: 'Read', title: 'AI diffusion in EM is best done with fintechs', href: '/ai-diffusion' },
    { claim: 'Coaching layered on credit is more durable than credit alone.',
      label: 'Read', title: 'Shipping the first AI loan officer for Kenya', href: '/lucy' },
    { claim: 'EM fintech customer data is the next great alt-data category.',
      label: 'Read', title: 'Micro signals, macro insights', href: '/data-opportunity' },
    { claim: 'Angel collectives compress the arc from community to institution.',
      label: 'See',  title: 'District Angels',                href: '/#build', dataBuild: 'da' },
    { claim: 'Agent-finance infrastructure with audit layers baked in are the durable bets.',
      label: 'Read', title: 'The currency of tomorrow',       href: SUBSTACK_URL, external: true }
  ],
  bicoastal: [
    { claim: 'DC has the capital and the talent. It lacked the front door.',
      label: 'See',  title: 'District Angels',                href: '/#build', dataBuild: 'da' },
    { claim: 'The Bay ships, but the next billion users live somewhere else.',
      label: 'Read', title: 'AI diffusion in EM is best done with fintechs', href: '/ai-diffusion' },
    { claim: 'Communities are durable distribution; the good ones become institutions.',
      label: 'Read', title: 'How communities become institutions', href: SUBSTACK_URL, external: true },
    { claim: 'The founders worth backing have an unreasonable feel for one market and a calm ego.',
      label: 'See',  title: 'Rogue thoughts',                 href: '/#rogue' }
  ],
  em: [
    { claim: 'Money is the most legible form of agency. Most of the world doesn\'t have it.',
      label: 'Read', title: 'Lucy — AI loan officer for Kenya', href: '/lucy' },
    { claim: 'The frontier is wherever the bureau doesn\'t reach. That\'s where new institutions get built.',
      label: 'Read', title: 'Micro signals, macro insights',  href: '/data-opportunity' },
    { claim: 'Stablecoins are infrastructure — not a crypto story.',
      label: 'Read', title: 'AI diffusion in EM',             href: '/ai-diffusion' },
    { claim: 'Localization lives in the architecture, not on top of it.',
      label: 'Read', title: 'Lucy — what the tech actually required', href: '/lucy' },
    { claim: 'Adoption needs a carrot. Only money reliably changes behavior.',
      label: 'Read', title: 'AI diffusion in EM',             href: '/ai-diffusion' }
  ],
  ai: [
    { claim: 'There\'s an 18-month window to embed in EM fintechs before the rails lock in.',
      label: 'Read', title: 'AI diffusion in EM is best done with fintechs', href: '/ai-diffusion' },
    { claim: 'EM fintech data is the ground truth no eval set covers.',
      label: 'Read', title: 'Micro signals, macro insights',  href: '/data-opportunity' },
    { claim: 'AI\'s largest marginal impact is on the people with least access to it.',
      label: 'Read', title: 'AI diffusion in EM',             href: '/ai-diffusion' },
    { claim: 'Trust transfers from humans to agents — not the other way around.',
      label: 'Read', title: 'Lucy — three versions, three different products', href: '/lucy' },
    { claim: 'Production-ready agents need a bounded cost of being wrong.',
      label: 'Read', title: 'Lucy in production',             href: '/lucy' },
    { claim: 'Agentic finance needs auditability at the protocol layer.',
      label: 'Read', title: 'The currency of tomorrow',       href: SUBSTACK_URL, external: true }
  ]
}

export default function Beliefs(){
  const [audience, setAudience] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const forParam = params.get('for')
      if (forParam && AUDIENCES.find(a => a.id === forParam)) return forParam
    } catch {}
    return 'investors'
  })
  const [copied, setCopied] = useState(false)
  const list = BELIEFS[audience]
  const meta = AUDIENCES.find(a => a.id === audience)

  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('for', audience)
      window.history.replaceState({}, '', url.toString())
    } catch {}
  }, [audience])

  const copyLink = () => {
    try {
      const url = `${window.location.origin}/beliefs?for=${audience}`
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <CaseHero
        eyebrow="Positions · Working drafts"
        title="What I believe, in lines."
        lede="A working map of what I'm thinking about — grouped by who it's most relevant to. Each line links to where I've written it. Pick a tab."
        meta={[
          { k: 'Audiences',  v: 'Investors · Bicoastal builders · EM operators · AI labs' },
          { k: 'Format',     v: 'Numbered beliefs, linked' },
          { k: 'Status',     v: 'Working drafts — updated as I learn' }
        ]}
      />

      <section className="beliefs">
        <div className="beliefs-tabs" role="tablist">
          {AUDIENCES.map(a => {
            const Icon = a.icon
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={audience === a.id}
                className={`beliefs-tab ${audience === a.id ? 'active' : ''}`}
                onClick={() => setAudience(a.id)}
              >
                <Icon />
                <span>{a.label}</span>
              </button>
            )
          })}
        </div>

        <div className="beliefs-meta-row">
          <p className="beliefs-blurb">{meta.blurb}</p>
          <button className={`beliefs-share ${copied ? 'copied' : ''}`} onClick={copyLink}>
            {copied ? '✓ Link copied' : 'Copy link to this view ↗'}
          </button>
        </div>

        <ol className="beliefs-list">
          {list.map((b, i) => {
            const isInternal = b.href?.startsWith('/') && !b.external
            const Cmp = isInternal ? Link : 'a'
            const linkProps = isInternal ? { to: b.href } : { href: b.href }
            return (
              <li key={i} className="belief">
                <span className="belief-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="belief-body">
                  <p className="belief-claim">{b.claim}</p>
                  <Cmp {...linkProps} className="belief-link">
                    <span className="belief-where">{b.label}</span>
                    <span>{b.title}</span>
                    <span className="belief-arrow" aria-hidden> →</span>
                  </Cmp>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="beliefs-foot">
          Want a different cut? <a href="mailto:hello@naviya.xyz">Write me</a> — I'll send the one for you.
        </p>
      </section>
    </CaseFrame>
  )
}
