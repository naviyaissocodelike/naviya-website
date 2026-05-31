import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RIDDLES } from '../data/riddles'

/**
 * To swap in real photos: drop files into /public/images/ and the placeholders
 * below will load them automatically (no code change needed if filenames match).
 */
const ABOUT_IMG = '/images/about.jpg'
const ACTIVITIES = [
  { label: 'Rock Climbing', src: '/images/climbing.jpg', tint: '#fdd9b5' },
  { label: 'CrossFit',      src: '/images/crossfit.jpg', tint: '#fecaca' },
  { label: 'Hiking',        src: '/images/hiking.jpg',   tint: '#bbf7d0' },
  { label: 'Nomadic',       src: '/images/nomadic.jpg',  tint: '#bae6fd' }
]

const GITHUB_URL = 'https://github.com/naviyaissocodelike'
const SUBSTACK_URL = '#'
const EMAIL = 'hello@naviya.xyz'

const ESSAYS = [
  { date: '2026 · 06', tag: 'AI',           title: 'AI diffusion in EM is best done with fintechs', blurb: 'Three lenses on why AI has to reach the people the rest of the world skips, one real way it can, and an 18-month window that closes when the rails are laid.', href: '/ai-diffusion', onSite: true },
  { date: '2026 · 05', tag: 'AI',           title: 'Shipping the first AI loan officer for Kenya', blurb: "Three versions, ten months at Tala. What worked, what didn't, what I'd carry into the next market.", href: '/lucy', onSite: true },
  { date: '2026 · 05', tag: 'Money',        title: 'Micro signals, macro insights',         blurb: "What fintech customer data could produce as a macro intelligence layer for emerging markets.", href: '/data-opportunity', onSite: true },
  { date: '2026 · 05', tag: 'AI',           title: 'AI and institutional design',           blurb: 'What incentives shift when the marginal cost of judgment goes to zero.',  href: SUBSTACK_URL },
  { date: '2026 · 04', tag: 'Frameworks',   title: 'The legible / illegible test',          blurb: 'A field guide for picking which problems are worth your time.',           href: SUBSTACK_URL },
  { date: '2026 · 04', tag: 'Money',        title: 'Capital formation in emerging markets', blurb: "Why the next billion users won't get banked by banks.",                  href: SUBSTACK_URL },
  { date: '2026 · 03', tag: 'Operating',    title: 'Shipping with a small team',            blurb: "What scales when the team doesn't. Notes from years of being undercounted.", href: SUBSTACK_URL },
  { date: '2026 · 03', tag: 'Crypto',       title: 'Stablecoins and programmable money',    blurb: 'The second rail is here. The first one was never universal.',            href: SUBSTACK_URL },
  { date: '2026 · 02', tag: 'Frameworks',   title: 'Agency as a stack',                     blurb: 'Tools below, decisions above. Where each layer earns its place.',        href: SUBSTACK_URL },
  { date: '2026 · 02', tag: 'AI',           title: 'How AI changes work',                   blurb: "Not the parts you think — the parts nobody enjoyed in the first place.", href: SUBSTACK_URL },
  { date: '2026 · 01', tag: 'Operating',    title: 'Founder taste, founder ego',            blurb: 'How to tell the difference — and why one compounds while the other rots.', href: SUBSTACK_URL },
  { date: '2026 · 01', tag: 'Institutions', title: 'How communities become institutions',   blurb: 'Process, ritual, and shared standards are the bridge.',                  href: SUBSTACK_URL },
  { date: '2025 · 12', tag: 'Agency',       title: 'The future of human agency',            blurb: 'Better tools change what kind of life is available to you.',             href: SUBSTACK_URL }
]
const TAGS = ['All', 'AI', 'Money', 'Crypto', 'Institutions', 'Agency', 'Operating', 'Frameworks']

const TAG_COLORS = {
  AI: '#2563eb', Money: '#15803d', Crypto: '#7c3aed',
  Institutions: '#c2410c', Agency: '#475569',
  Operating: '#0891b2', Frameworks: '#9333ea'
}

const REPOS = [
  {
    name: 'lucy', lang: 'Python',
    problem: 'Loan underwriting at Tala still relied on rules brittle to new markets.',
    why: 'Credit is the most legible form of agency. Better underwriting = more access.',
    learned: 'LLMs are production-ready when the cost of being wrong is bounded.',
    href: '/lucy',
    caseStudy: true
  },
  {
    name: 'luna', lang: 'Python',
    problem: 'Most financial apps assume a bank account. 1B+ people in EM navigate credit, savings, and loans without one.',
    why: 'An agent that understands your context and remembers your story is a fundamentally different product than a chatbot with a form.',
    learned: 'Gamified progression compresses financial habit formation faster than any UX pattern I have tried.',
    href: `${GITHUB_URL}/univ-agent`
  },
  {
    name: 'investing-agent', lang: 'Python',
    problem: 'Investment research is unbounded — there is always one more source to check.',
    why: 'An Opus-class agent can hold a thesis and argue against it. That is a new kind of diligence partner.',
    learned: 'The bottleneck is not data access. It is structured judgment about what matters and what to ignore.',
    href: `${GITHUB_URL}/investing-agent`
  },
  {
    name: 'news-digest', lang: 'Python',
    problem: 'Fifty RSS feeds is too much to read. Zero is too little to stay sharp.',
    why: 'A personalized AI digest with a two-host podcast delivers signal without the scroll.',
    learned: 'Claude-as-editor produces better curation than any filter rule — it understands why something matters.',
    href: `${GITHUB_URL}/news-digest`
  },
  {
    name: 'voice-to-insight', lang: 'HTML',
    problem: 'Meetings and voice notes are full of decisions and action items that evaporate by end of day.',
    why: 'Audio is the most natural way humans communicate — but text is how work gets done.',
    learned: 'The gap between capture and action is where most ideas die. Closing it is a UX problem first.',
    href: `${GITHUB_URL}/voice-to-insight`
  },
  {
    name: 'tasks-flow', lang: 'TypeScript',
    problem: 'Solo operators need a project board that works offline and syncs without drama across devices.',
    why: 'Project visibility should not depend on a vendor\'s uptime or pricing tier.',
    learned: 'Local-first plus cloud sync is the architecture that survives the real world.',
    href: `${GITHUB_URL}/tasks-flow`
  },
  {
    name: 'Defi-Agent-Uma', lang: 'TypeScript',
    problem: 'DeFi protocols move faster than any human can track across chains and governance cycles.',
    why: 'Automation at the smart-contract layer is the only way to act on DeFi signals in time.',
    learned: 'Protocol APIs are designed for bots. Agents let you write the bot in plain intent.',
    href: `${GITHUB_URL}/Defi-Agent-Uma`
  },
  {
    name: 'wise-glade', lang: 'Python',
    problem: 'Job search is a daily intelligence problem dressed up as a one-off.',
    why: 'Career capital is a feedback system. Reward the right signal sooner.',
    learned: 'A small agent that does one thing every day beats a big one that does ten things once.',
    href: `${GITHUB_URL}/wise-glade-git`
  },
  {
    name: 'naviya-website', lang: 'React',
    problem: 'A site should feel like exploring a mind, not reading a resume.',
    why: 'The internet has too many landing pages and not enough rooms.',
    learned: 'Personality compounds when the medium is yours.',
    href: `${GITHUB_URL}/naviya-website`
  }
]

const TALA = [
  { k: 'Where',    v: 'Tala — global fintech across eight emerging markets' },
  { k: 'Role',     v: 'Manager, New Ventures (AI / Crypto)' },
  { k: 'Building', v: 'AI loan agents in production. Stablecoin pilots. Second-rail money infrastructure.' },
  { k: 'Why',      v: "Credit is the most legible form of agency. Most of the world doesn't have it. We're building the rails." }
]

const DA = [
  { k: 'Why it exists',                        v: 'Solo angel checks are an inefficient way to back builders. DC had the capital and talent — just not the front door.' },
  { k: 'How communities become institutions',  v: 'The bridge is process, ritual, and shared standards. We try to compress that arc without losing the feel.' },
  { k: 'On capital formation',                 v: 'Early on, pace of conviction matters more than depth of diligence. Speed is a signal of taste.' },
  { k: 'How AI changes angel investing',       v: 'Agents take over screening. Humans hold conviction, introductions, and aftercare — the parts that compound.' }
]

const CORNELL = [
  { k: 'Where',     v: 'Cornell Social Enterprise — student community for the impact-curious' },
  { k: 'Role',      v: 'Led programming, mentorship, the annual conference' },
  { k: 'Building',  v: 'A community on its way to being an institution.' },
  { k: 'Learned',   v: 'Communities scale by handing off rituals. The work is creating ones worth handing off.' }
]

const BUILD_TABS = [
  { key: 'code',    label: 'Code & Agents' },
  { key: 'tala',    label: 'Tala' },
  { key: 'da',      label: 'District Angels' },
  { key: 'cornell', label: 'Cornell SE' }
]

/* Swap-in placeholders — each list renders as a distinct card shape in the Rogue collage. */
const QUOTES = [
  { text: "The future is already here — it's just not evenly distributed.", author: 'William Gibson' },
  { text: 'We shape our tools, and thereafter our tools shape us.',          author: 'Marshall McLuhan' },
  { text: 'The map is not the territory.',                                   author: 'Alfred Korzybski' }
]

const POEMS = [
  { title: 'Wild Geese',
    body:  "You do not have to be good.\nYou do not have to walk on your knees\nfor a hundred miles through the desert, repenting.",
    author:'Mary Oliver' },
  { title: 'Kindness',
    body:  "Before you know what kindness really is\nyou must lose things,\nfeel the future dissolve in a moment\nlike salt in a weakened broth.",
    author:'Naomi Shihab Nye' }
]

const BOOKS = [
  { title: 'The Three-Body Problem', author: 'Liu Cixin',          why: 'Civilizational thinking, in fiction.', spine: 'var(--c-think)' },
  { title: 'Sapiens',                author: 'Yuval Noah Harari',  why: 'Where institutions actually come from.', spine: 'var(--c-build)' },
  { title: 'The Goal',               author: 'Eliyahu M. Goldratt', why: 'The book that made ORIE click for me.', spine: 'var(--c-invest, #15803d)' },
  { title: 'Antifragile',            author: 'Nassim Taleb',       why: 'Optionality as a moral framework.', spine: 'var(--c-play)' }
]

const MOVIES = [
  { title: 'Arrival',           year: '2016', why: 'Language as the agency of thought.' },
  { title: 'Her',               year: '2013', why: 'A small love story that read the AI question right.' },
  { title: 'Children of Men',   year: '2006', why: 'Hope as a discipline, not a feeling.' }
]

const IDEAS = [
  'Credit is the most legible form of agency. Everything else compounds from access to it.',
  "Every community that scales becomes either an institution or a brand. The interesting ones become both.",
  "The frontier is wherever the bureau doesn't reach. That's where new institutions get built.",
  "AI doesn't kill jobs. It kills the parts of jobs nobody enjoyed in the first place.",
  'Partnership-first fintechs will out-distribute the model labs in places the bureau never reached.',
  "Stablecoins aren't a crypto story. They're a backbone for the half of the world the SWIFT-era never served.",
  'The founders I want to back have an unreasonable feel for one specific market and a calm relationship with their own ego.',
  "If a thesis can't survive being explained at a noisy bar, it isn't one yet."
]

const ROGUE_TILES = [
  { id: 'quotes', kind: 'q', label: 'Quotes', count: QUOTES.length },
  { id: 'poems',  kind: 'p', label: 'Poems',  count: POEMS.length  },
  { id: 'books',  kind: 'b', label: 'Books',  count: BOOKS.length  },
  { id: 'movies', kind: 'm', label: 'Movies', count: MOVIES.length },
  { id: 'ideas',  kind: 'i', label: 'Ideas',  count: IDEAS.length  }
]

const SECRETS = {
  joke: [
    "Why don't fintechs ever get cold? They have lots of liquidity.",
    "I told my LLM a recursion joke. It told it back.",
    "Capital is patient. Founders are not. I work in the gap.",
    "An angel walks into a bar. The bar pitches her. She passes."
  ],
  prediction: [
    "By 2030, more credit decisions in EM will be made by agents than by humans.",
    "The next big consumer fintech in Africa won't call itself a fintech.",
    "Stablecoin payroll is a sleeper category. Watch the diaspora rails.",
    "The best AI investors in the next decade will be operators who left ops late, not VCs who arrived early."
  ],
  mindchange: [
    "Used to think culture was downstream of strategy. It's the other way around in markets you don't know yet.",
    "Used to think diligence was the work. It's the pretext. The work is conviction.",
    "Used to think crypto was a payments story. It's a settlement story.",
    "Used to think communities should be flat. The good ones have spine."
  ],
  startup: [
    "A diaspora-first credit bureau. Identity + remittance flow + employer attestation.",
    "An agentic CFO for sub-$10M ARR companies. Cash, runway, hiring, taxes — one loop.",
    "Stablecoin-native B2B invoicing for African importers. Settle in USDC, reconcile in local books.",
    "A 'lightweight LP fund' that pools angel checks across cities. Distribution by community."
  ]
}

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'think', label: 'Think' },
  { id: 'build', label: 'Build', dropdown: true },
  { id: 'rogue', label: 'Rogue' },
  { id: 'play',  label: 'Play'  }
]

export default function Home(){
  const [coins, setCoins] = useState(() => {
    try { return Number(localStorage.getItem('nv_coins')) || 0 } catch { return 0 }
  })
  const [activeTag, setActiveTag] = useState('All')
  const [activeBuild, setActiveBuild] = useState('code')
  const [popCoin, setPopCoin] = useState(false)
  const [buildOpen, setBuildOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [showAllEssays, setShowAllEssays] = useState(false)
  const [openRogue, setOpenRogue] = useState(null)
  const rogueRef = useRef(null)

  useEffect(() => {
    try { localStorage.setItem('nv_coins', String(coins)) } catch {}
  }, [coins])

  useEffect(() => {
    if (!infoOpen) return
    const onDocClick = (e) => {
      if (!e.target.closest('.coin-zone')) setInfoOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [infoOpen])

  // Bounce-in for About photo when section enters viewport
  const aboutRef = useRef(null)
  const [aboutInView, setAboutInView] = useState(false)
  useEffect(() => {
    if (!aboutRef.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAboutInView(true)
    }, { threshold: 0.25 })
    obs.observe(aboutRef.current)
    return () => obs.disconnect()
  }, [])

  const addCoins = (n) => {
    setCoins(c => c + n)
    setPopCoin(true)
    setTimeout(() => setPopCoin(false), 600)
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredEssays = activeTag === 'All' ? ESSAYS : ESSAYS.filter(n => n.tag === activeTag)
  const ESSAY_LIMIT = 5
  const visibleEssays = showAllEssays ? filteredEssays : filteredEssays.slice(0, ESSAY_LIMIT)
  const hasMore = filteredEssays.length > ESSAY_LIMIT

  return (
    <div className="page">
      <header className="nav">
        <a className="mark" href="#top">Naviya</a>
        <div className="nav-links">
          {SECTIONS.map(s => {
            if (s.dropdown) {
              return (
                <div
                  key={s.id}
                  className="nav-link-wrap"
                  onMouseEnter={() => setBuildOpen(true)}
                  onMouseLeave={() => setBuildOpen(false)}
                >
                  <button className={`nav-link nav-${s.id}`} onClick={() => scrollTo(s.id)}>
                    <span className="nav-link-text">{s.label}</span>
                    <ChevronIcon />
                  </button>
                  {buildOpen && (
                    <div className="nav-dropdown">
                      {BUILD_TABS.map(t => (
                        <button
                          key={t.key}
                          className="nav-dropdown-item"
                          onClick={() => {
                            setActiveBuild(t.key)
                            scrollTo('build')
                            setBuildOpen(false)
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <button key={s.id} className={`nav-link nav-${s.id}`} onClick={() => scrollTo(s.id)}>
                <span className="nav-link-text">{s.label}</span>
              </button>
            )
          })}
        </div>
        <div className="coin-zone">
          <div className={`coin-badge ${popCoin ? 'pop' : ''}`} aria-label={`${coins} coins`}>
            <CoinSVG />
            <span>{coins}</span>
          </div>
          <button
            className={`info-trigger ${infoOpen ? 'on' : ''}`}
            onClick={() => setInfoOpen(o => !o)}
            aria-label="How coins work"
            aria-expanded={infoOpen}
          >
            <InfoIcon />
          </button>
          {infoOpen && (
            <div className="info-bubble" role="dialog">
              <span className="info-arrow" aria-hidden />
              <span className="info-eyebrow">My Arcade</span>
              <p>
                The more you explore, the more coins you collect. Solve riddles in{' '}
                <a href="#play" onClick={(e)=>{e.preventDefault(); scrollTo('play'); setInfoOpen(false)}}>the Play section</a>{' '}
                to earn them.
              </p>
              <p>
                Spend coins on jokes, predictions, things I've changed my mind about, and strange startup ideas.
                Riddles, puzzles, and quizzes I've designed and curated — there's more in the vault than what's
                visible at first.
              </p>
            </div>
          )}
        </div>
      </header>

      <main id="top">
        <section id="about" ref={aboutRef} className="block first-block section-about">
          <SectionHead>About</SectionHead>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-lead">
                <strong>Frontier technology in the hands of the overlooked.</strong> A working map of how I think
                about AI, capital, communities, and the systems that shape human agency.
              </p>
              <p>
                I'm interested in agency at scale — the kind people get when better tools, capital, and information
                actually reach them. My work sits at the intersections: AI and money, communities and institutions,
                frontier tech and the people the rest of the world tends to skip.
              </p>
              <p>
                Today that looks like AI and crypto at <a href="https://tala.co">Tala</a>, an angel collective in DC
                called <a href="#build" onClick={(e)=>{e.preventDefault(); setActiveBuild('da'); scrollTo('build')}}>District Angels</a>,
                and a steady habit of building small tools in code. Before that: operations research at Cornell, where
                I helped run Social Enterprise — my first attempt at turning a community into an institution.
              </p>
              <p>
                Builder by inclination. Operator by experience. Investor by curiosity. I think best in analogies,
                sci-fi, and thought experiments. If you want an intro, an opinion, or honest feedback —{' '}
                <a href={`mailto:${EMAIL}`}>write me</a>.
              </p>
            </div>
            <div className={`about-photo ${aboutInView ? 'in' : ''}`}>
              <Polaroid src={ABOUT_IMG} alt="Naviya" caption="naviya" />
            </div>
          </div>

          <aside className="tldr">
            <div className="tldr-label">TL;DR</div>
            <ul>
              <li><strong>Building</strong> AI agents and stablecoin pilots at <a href="https://tala.co">Tala</a> — credit infrastructure across 8 emerging markets.</li>
              <li><strong>Investing</strong> early-stage through <a href="#build" onClick={(e)=>{e.preventDefault(); setActiveBuild('da'); scrollTo('build')}}>District Angels</a> — a DC-based collective.</li>
              <li><strong>Writing</strong> about frontier tech and agency — on this site and on <a href={SUBSTACK_URL}>Substack</a>.</li>
              <li><strong>Shipping</strong> code, tools, and agents on <a href={GITHUB_URL}>GitHub</a>.</li>
            </ul>
          </aside>
        </section>

        <section id="think" className="block section-think">
          <SectionHead>Think</SectionHead>
          <p className="block-sub">
            Essays and theses I'm still developing. The intellectual center of the site.
            Mostly on <a href={SUBSTACK_URL}>Substack</a>.
          </p>
          <div className="chips">
            {TAGS.map(t => (
              <button key={t} className={`chip ${activeTag === t ? 'active' : ''}`} onClick={() => setActiveTag(t)}>
                {t}
              </button>
            ))}
          </div>
          <ul className="entries">
            {visibleEssays.map((note, i) => {
              const isInternal = note.href?.startsWith('/')
              const Cmp = isInternal ? Link : 'a'
              const linkProps = isInternal ? { to: note.href } : { href: note.href }
              return (
                <li key={`${note.title}-${i}`}>
                  <Cmp
                    {...linkProps}
                    className="entry"
                    style={{ '--tag-color': TAG_COLORS[note.tag] || 'var(--soft)' }}
                  >
                    <span className="entry-icon" aria-hidden>{tagIcon(note.tag)}</span>
                    <span className="entry-date">{note.date}</span>
                    <div className="entry-body">
                      <h3>
                        {note.title}
                        {note.onSite && <span className="entry-onsite">on site</span>}
                      </h3>
                      <p>{note.blurb}</p>
                    </div>
                    <span className="entry-tag">{note.tag}</span>
                    <span className="entry-arrow" aria-hidden>→</span>
                  </Cmp>
                </li>
              )
            })}
          </ul>
          {hasMore && (
            <button className="show-more" onClick={() => setShowAllEssays(s => !s)}>
              {showAllEssays
                ? `Show fewer ↑`
                : `Show all ${filteredEssays.length} →`}
            </button>
          )}
        </section>

        <section id="build" className="block section-build">
          <SectionHead>Build</SectionHead>
          <p className="block-sub">
            Proof of execution — code, products, and communities. Each is a different shape of the same instinct:
            ship the thing.
          </p>

          <div className="build-tabs" role="tablist">
            {BUILD_TABS.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={activeBuild === t.key}
                className={`build-tab ${activeBuild === t.key ? 'active' : ''}`}
                onClick={() => setActiveBuild(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="build-panel">
            {activeBuild === 'code' && (
              <>
                <p className="panel-lede">
                  Public code and AI agents on <a href={GITHUB_URL}>GitHub</a>. Each repo answers three questions:
                  what problem, why it matters, what I learned.
                </p>
                <div className="repos">
                  {REPOS.map(r => {
                    const isInternal = r.href?.startsWith('/')
                    const Cmp = isInternal ? Link : 'a'
                    const linkProps = isInternal ? { to: r.href } : { href: r.href }
                    return (
                      <Cmp key={r.name} {...linkProps} className="repo">
                        <div className="repo-head">
                          <RepoIcon />
                          <span className="repo-name">{r.name}</span>
                          <span className="repo-lang">· {r.lang}</span>
                          {r.caseStudy && <span className="repo-badge">case study</span>}
                        </div>
                        <dl className="repo-meta">
                          <dt>Problem</dt><dd>{r.problem}</dd>
                          <dt>Why</dt><dd>{r.why}</dd>
                          <dt>Learned</dt><dd>{r.learned}</dd>
                        </dl>
                      </Cmp>
                    )
                  })}
                </div>
              </>
            )}

            {activeBuild === 'tala' && (
              <>
                <p className="panel-lede">
                  Tala is a global consumer fintech building credit infrastructure across eight emerging markets.
                  I lead New Ventures — the bets that aren't a year of roadmap yet.
                </p>
                <KvGrid items={TALA} />
              </>
            )}

            {activeBuild === 'da' && (
              <>
                <p className="panel-lede">
                  <strong>District Angels</strong> is a DC-based collective of early-stage investors. I started it in
                  March 2024 because solo angel checks are an inefficient way to back builders — and because the best
                  communities I've been part of were always on their way to becoming institutions. DA is an attempt to
                  compress that arc.
                </p>
                <KvGrid items={DA} />
              </>
            )}

            {activeBuild === 'cornell' && (
              <>
                <p className="panel-lede">
                  Cornell Social Enterprise — student community for the impact-curious. I helped run it as an undergrad.
                  It was my first attempt at turning a community into an institution: programming, mentorship, succession.
                </p>
                <KvGrid items={CORNELL} />
              </>
            )}
          </div>
        </section>

        <section id="rogue" className="block section-rogue">
          <SectionHead>Rogue Thoughts</SectionHead>
          <p className="block-sub">
            A collage of what shaped me and what I'm still chasing. Pick a tile — quotes, poems, books, movies,
            or stray ideas. Notebook, not feed.
          </p>

          <div className="rt-grid">
            {ROGUE_TILES.map(t => {
              const isOpen = openRogue === t.id
              return (
                <button
                  key={t.id}
                  className={`rt-tile rt-${t.kind} ${isOpen ? 'open' : ''}`}
                  onClick={() => {
                    setOpenRogue(o => o === t.id ? null : t.id)
                    setTimeout(() => {
                      if (rogueRef.current) {
                        rogueRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }, 80)
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="rt-glyph" aria-hidden>{rogueGlyph(t.kind)}</div>
                  <div className="rt-meta">
                    <span className="rt-label">{t.label}</span>
                    <span className="rt-count">{t.count} {t.count === 1 ? 'item' : 'items'}</span>
                  </div>
                  <span className="rt-affordance" aria-hidden>{isOpen ? '×' : '↗'}</span>
                </button>
              )
            })}
          </div>

          {openRogue && (
            <div ref={rogueRef} className={`rt-panel rt-panel-${openRogue}`}>
              {openRogue === 'quotes' && (
                <div className="r-grid r-grid-quotes">
                  {QUOTES.map((q, i) => (
                    <figure key={i} className="r-card r-quote">
                      <blockquote>{q.text}</blockquote>
                      <figcaption>— {q.author}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {openRogue === 'poems' && (
                <div className="r-grid r-grid-poems">
                  {POEMS.map((p, i) => (
                    <figure key={i} className="r-card r-poem">
                      <div className="r-poem-title">{p.title}</div>
                      <div className="r-poem-body">{p.body}</div>
                      <figcaption>— {p.author}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {openRogue === 'books' && (
                <div className="r-grid r-grid-books">
                  {BOOKS.map((b, i) => (
                    <article key={i} className="r-card r-book" style={{ '--book-spine': b.spine }}>
                      <div className="r-card-kicker">Book</div>
                      <h3 className="r-book-title">{b.title}</h3>
                      <div className="r-book-author">{b.author}</div>
                      <p className="r-book-why">{b.why}</p>
                    </article>
                  ))}
                </div>
              )}
              {openRogue === 'movies' && (
                <div className="r-grid r-grid-movies">
                  {MOVIES.map((m, i) => (
                    <article key={i} className="r-card r-movie">
                      <div className="r-movie-body">
                        <div className="r-card-kicker">Film</div>
                        <h3 className="r-movie-title">{m.title}</h3>
                        <div className="r-movie-meta">{m.year}</div>
                        <p className="r-movie-why">{m.why}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {openRogue === 'ideas' && (
                <div className="r-grid r-grid-ideas">
                  {IDEAS.map((idea, i) => (
                    <aside
                      key={i}
                      className={`r-card r-idea idea-${i % 4}`}
                      style={{ '--rot': `${(i % 2 === 0 ? -1 : 1) * (0.6 + (i % 3) * 0.4)}deg` }}
                    >
                      <div className="r-card-kicker">Idea</div>
                      <p>{idea}</p>
                    </aside>
                  ))}
                </div>
              )}
              <button className="rt-close" onClick={() => setOpenRogue(null)}>
                Close ×
              </button>
            </div>
          )}
        </section>

        <section id="play" className="block section-play">
          <SectionHead>Play</SectionHead>
          <p className="block-sub">
            Earn coins solving riddles. Spend them on jokes, predictions, mind-changes, and strange startup ideas.
            And — a few snapshots from the life around the work.
          </p>
          <div className="play-zone">
            <Vault coins={coins} addCoins={addCoins} setCoins={setCoins} />
            <div className="play-side">
              <div className="play-side-label">Shenanigans &amp; Side Quests</div>
              <div className="play-tiles">
                {ACTIVITIES.map(a => <Tile key={a.label} {...a} />)}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Naviya Kothari</span>
        <span className="footer-tag">A personal laboratory.</span>
      </footer>
    </div>
  )
}

/* ---------- shared ---------- */

function SectionHead({ children }){
  return (
    <h2 className="block-h2"><span className="h2-mark">{children}</span></h2>
  )
}

function KvGrid({ items }){
  return (
    <div className="kv-grid">
      {items.map(it => (
        <div key={it.k} className="kv-card">
          <div className="kv-k">{it.k}</div>
          <div className="kv-v">{it.v}</div>
        </div>
      ))}
    </div>
  )
}

function Polaroid({ src, alt, caption }){
  const [errored, setErrored] = useState(false)
  return (
    <div className="polaroid">
      <div className="polaroid-img">
        {!errored && src ? (
          <img src={src} alt={alt} onError={() => setErrored(true)} />
        ) : (
          <div className="polaroid-fallback">photo<br/>coming soon</div>
        )}
      </div>
      <div className="polaroid-cap">{caption}</div>
    </div>
  )
}

function Tile({ label, src, tint }){
  const [errored, setErrored] = useState(false)
  return (
    <div className="tile" style={{ '--tile-c': tint }}>
      {!errored && src ? (
        <img src={src} alt={label} onError={() => setErrored(true)} />
      ) : (
        <div className="tile-placeholder">{label}</div>
      )}
      <span className="tile-label">{label}</span>
    </div>
  )
}

/* ---------- vault ---------- */

const REEL_SYMBOLS = ['?', '¢', '★', '◆', '♠', '△', '○', '□', '✦', '✿']

const REWARDS = [
  { id: 'joke',       cost: 3,  label: 'Joke' },
  { id: 'prediction', cost: 5,  label: 'Prediction' },
  { id: 'mindchange', cost: 7,  label: 'Changed my mind' },
  { id: 'startup',    cost: 10, label: 'Strange startup' }
]

function Vault({ coins, addCoins, setCoins }){
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * RIDDLES.length))
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [solvedIds, setSolvedIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('nv_solved') || '[]')) } catch { return new Set() }
  })
  const [dispensed, setDispensed] = useState({ kind: '', text: '', anim: false })
  const [spinning, setSpinning] = useState(false)
  const [reels, setReels] = useState(['?', '?', '?'])
  const [show, setShow] = useState(true)

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
    setSpinning(true); setShow(false)
    setInput(''); setStatus(''); setShowHint(false)
    const target = (idx + 1 + Math.floor(Math.random() * (RIDDLES.length - 1))) % RIDDLES.length
    const start = Date.now(); const duration = 1100
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
        setReels(digits); setIdx(target); setSpinning(false)
        setTimeout(() => setShow(true), 80)
      }
    }
    tick()
  }

  const buyReward = (r) => {
    if (coins < r.cost) return
    setCoins(c => c - r.cost)
    const pool = SECRETS[r.id]
    const text = pool[Math.floor(Math.random() * pool.length)]
    setDispensed({ kind: r.label, text, anim: false })
    setTimeout(() => setDispensed(d => ({ ...d, anim: true })), 30)
  }

  return (
    <div className="machine">
      <div className="machine-top">
        <div className="machine-brand">
          <span className="machine-bolt" /> NAVIYA'S ARCADE <span className="machine-bolt" />
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
            <div key={i} className="reel"><span className="reel-val">{s}</span></div>
          ))}
        </div>
        <div className="display-label">
          {spinning ? 'dispensing…' : `riddle ${idx + 1}/${RIDDLES.length}${alreadySolved ? ' · solved' : ''}`}
        </div>
      </div>

      <div className={`dispense-tray ${show && !spinning ? 'in' : 'out'}`}>
        <p className="riddle-q">{riddle.q}</p>
        {showHint && <p className="riddle-hint">hint: {riddle.hint}</p>}
        <form onSubmit={submit} className="riddle-form">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="type your answer…" autoComplete="off" disabled={spinning} />
          <button type="submit" className="btn" disabled={spinning}>Guess</button>
        </form>
        <div className="riddle-actions">
          <button onClick={() => setShowHint(s => !s)} className="link-btn" disabled={spinning}>
            {showHint ? 'hide hint' : 'hint'}
          </button>
          <button onClick={dispenseNext} className="link-btn" disabled={spinning}>new riddle →</button>
        </div>
        {status === 'correct' && <p className="msg ok">✓ correct. +3 coins.</p>}
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
      </div>

      <div className="rewards">
        {REWARDS.map(r => (
          <button key={r.id} className="reward-btn" onClick={() => buyReward(r)} disabled={coins < r.cost}>
            <span className="reward-cost">{r.cost}¢</span>
            <span className="reward-label">{r.label}</span>
          </button>
        ))}
      </div>

      {dispensed.text && (
        <div className={`secret-drop ${dispensed.anim ? 'in' : ''}`}>
          <span className="secret-tag">{dispensed.kind}</span>
          <p>{dispensed.text}</p>
        </div>
      )}
    </div>
  )
}

/* ---------- icons ---------- */

function RepoIcon(){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}

/* Glyphs for the Rogue tiles — one big illustrated icon per category */
function rogueGlyph(kind){
  const sw = 1.6
  const props = { width: 44, height: 44, viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch(kind){
    case 'q': return ( // quote — speech bubble
      <svg {...props}>
        <path d="M8 12c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v18c0 2.2-1.8 4-4 4H20l-8 6v-6h-.001a4 4 0 0 1-4-4V12z"/>
        <text x="16" y="28" fontSize="14" fontFamily="Georgia, serif" fill="currentColor" stroke="none" fontWeight="700">"</text>
        <text x="26" y="28" fontSize="14" fontFamily="Georgia, serif" fill="currentColor" stroke="none" fontWeight="700">"</text>
      </svg>
    )
    case 'p': return ( // poem — scroll
      <svg {...props}>
        <path d="M10 10h22a4 4 0 0 1 4 4v22a4 4 0 0 0 4 4H14a4 4 0 0 1-4-4V10z"/>
        <path d="M10 10a4 4 0 0 1 4-4h22a4 4 0 0 0-4 4"/>
        <line x1="16" y1="20" x2="30" y2="20"/>
        <line x1="16" y1="26" x2="30" y2="26"/>
        <line x1="16" y1="32" x2="24" y2="32"/>
      </svg>
    )
    case 'b': return ( // books — stack
      <svg {...props}>
        <rect x="8" y="32" width="32" height="6" rx="1"/>
        <rect x="10" y="22" width="28" height="10" rx="1"/>
        <rect x="14" y="10" width="20" height="12" rx="1"/>
        <line x1="16" y1="14" x2="16" y2="18"/>
        <line x1="32" y1="14" x2="32" y2="18"/>
      </svg>
    )
    case 'm': return ( // movies — clapperboard
      <svg {...props}>
        <rect x="6" y="18" width="36" height="22" rx="2"/>
        <path d="M6 18l4-8h6l-4 8M16 18l4-8h6l-4 8M26 18l4-8h6l-4 8M36 18l4-8h2v8"/>
      </svg>
    )
    case 'i': return ( // ideas — lightbulb
      <svg {...props}>
        <path d="M24 8c-6.6 0-12 5.4-12 12 0 3.5 1.5 6.6 3.9 8.8 1.2 1.1 2.1 2.5 2.1 4.2v3h12v-3c0-1.7.9-3.1 2.1-4.2 2.4-2.2 3.9-5.3 3.9-8.8 0-6.6-5.4-12-12-12z"/>
        <line x1="20" y1="40" x2="28" y2="40"/>
      </svg>
    )
    default: return null
  }
}

/* Per-tag icons used in the Think reading list */
function tagIcon(tag){
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch(tag){
    case 'AI': return (
      <svg {...props}>
        <rect x="4" y="4" width="16" height="16" rx="3"/>
        <rect x="8" y="8" width="8" height="8" rx="1"/>
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
      </svg>
    )
    case 'Money': return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v10M9 9.5a3 3 0 1 0 0 1.5h6a3 3 0 1 1 0 3H9"/>
      </svg>
    )
    case 'Crypto': return (
      <svg {...props}>
        <path d="M10 8a4 4 0 0 0 0 8h2M14 16a4 4 0 0 0 0-8h-2"/>
        <path d="M8 12h8"/>
      </svg>
    )
    case 'Institutions': return (
      <svg {...props}>
        <path d="M3 22h18"/><path d="M5 22V11M9 22V11M15 22V11M19 22V11"/>
        <path d="M2 11h20L12 4z"/>
      </svg>
    )
    case 'Agency': return (
      <svg {...props}>
        <circle cx="8" cy="15" r="4"/>
        <path d="M10.85 12.15 21 2"/><path d="M18 5l3 3"/><path d="M15 8l3 3"/>
      </svg>
    )
    case 'Operating': return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3.09 14H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    )
    case 'Frameworks': return (
      <svg {...props}>
        <polygon points="12 2 22 7 12 12 2 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
    default: return (
      <svg {...props}><circle cx="12" cy="12" r="3"/></svg>
    )
  }
}
function ChevronIcon(){
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}
function InfoIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
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
