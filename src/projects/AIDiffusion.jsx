import React from 'react'
import { CaseFrame, CaseSection, Axes, Stats, Timeline, Pull } from '../components/CaseStudy'

const FRAMING = [
  { k: 'Commercial',
    v: "Billions of underserved users. They are price-elastic and will default to the free model. But if AI is integrated into workstreams that drive tangible economic value, they will pay." },
  { k: 'Sociological',
    v: "AI has the largest marginal impact on people who currently have the least access to it. We cannot let the tech gap exacerbate the agency gap." },
  { k: 'Geopolitical',
    v: "If the US does not build the infrastructure for AI adoption in emerging markets, China will. DeepSeek already holds 89% share in China, 11–14% across parts of Africa, and is being bundled into Huawei devices through government infrastructure deals." }
]

const ADOPTION_STATS = [
  { num: '$54B',  label: 'stablecoin transactions across Africa, 2024' },
  { num: '7M+',   label: 'Opera MiniPay wallets' },
  { num: '5M+',   label: 'Flutterwave wallets' },
  { num: '4M+',   label: 'Yellow Card wallets' }
]

const TRAJECTORY = [
  { when: 'Now',           title: 'Agents advise.',                  body: 'Customer asks, agent recommends, customer decides.' },
  { when: '12–24 months',  title: 'Agents execute.',                 body: 'Within pre-set parameters. Recurring payments, savings sweeps, yield rotation.' },
  { when: '2–4 years',     title: 'Agents precede customers.',       body: 'See rent is due and cash is short — refinance proactively.' },
  { when: '3–5 years',     title: 'Agents negotiate with agents.',   body: "Your agent plays three lenders against each other." },
  { when: '5+ years',      title: 'Agents become economic identities.', body: "Lenders evaluate the agent's track record, not the person's." }
]

export default function AIDiffusion(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      {/* Hero with the PDF's multi-highlighted title */}
      <section className="case-hero essay-hero">
        <p className="case-eyebrow">Essay · Long form</p>
        <h1 className="essay-h1">
          <span className="hl hl-a">AI diffusion in emerging markets</span>{' '}
          is{' '}
          <span className="hl hl-b">best done with fintechs</span>{' '}
          in the{' '}
          <span className="hl hl-c">next 18 months</span>.
        </h1>
        <p className="case-lede">
          The longer cut of the thesis. Three lenses on why AI has to reach the people the rest of the world skips,
          one real way it can, and an eighteen-month window that closes when the rails are laid.
        </p>
        <dl className="case-meta">
          <div className="case-meta-row"><dt>Type</dt><dd>Essay</dd></div>
          <div className="case-meta-row"><dt>Horizon</dt><dd>18 months</dd></div>
          <div className="case-meta-row"><dt>Topics</dt><dd>AI · Fintech · Crypto · Emerging markets</dd></div>
          <div className="case-meta-row"><dt>Author</dt><dd>Naviya Kothari — Onchain Finance @ Tala</dd></div>
        </dl>
      </section>

      {/* SECTION 1 — AI diffusion in emerging markets */}
      <CaseSection>
        <h2 className="essay-h2"><span className="hl hl-a">AI diffusion in emerging markets</span></h2>
        <p>
          Three lenses converge on the same conclusion — that the next eighteen months are when frontier AI either
          reaches the four billion people most underserved by it, or doesn't.
        </p>
        <Axes items={FRAMING} />
        <p>
          The commercial, the sociological, and the geopolitical all point in the same direction. The question
          isn't whether AI gets to emerging markets. It's who carries it there, and what shape it takes when it arrives.
        </p>
      </CaseSection>

      {/* SECTION 2 — best done with fintechs */}
      <CaseSection>
        <h2 className="essay-h2"><span className="hl hl-b">Best done with fintechs</span></h2>
        <p>AI is being distributed three ways today:</p>
        <ul className="bullets">
          <li><strong>Direct to consumer</strong> through lower-cost models — ChatGPT Go at $4.60/month across 89 countries, DeepSeek free.</li>
          <li><strong>Embedded in devices</strong> — DeepSeek preloaded on Huawei and HarmonyOS, Gemini on Android.</li>
          <li><strong>Through consumer companies</strong> — barely, and with no coherent EM strategy.</li>
        </ul>
        <p>
          All three can drive <em>distribution</em> by being cheaper, freer, or harder to escape. None of them
          drives <em>adoption</em>.
        </p>
        <Pull>Adoption requires behavior change. Behavior change requires incentive.</Pull>
        <p>
          Device companies and telcos have stick incentives — they can lock a device or revoke a service. Their
          carrot incentives are thin. Maybe they can offer free or cheaper mobile data in exchange for AI use.
          That's not nothing, but it's not enough to rewire daily behavior.
        </p>
        <p>
          After years working in the emerging world, only one carrot reliably changes behavior: <strong>money</strong>.
          Better loan terms. Higher savings yields. Cheaper remittances. A direct financial benefit from using
          an AI product. Only fintechs are positioned to offer it.
        </p>
        <p>
          This is the structural reason fintech is the right distribution layer for frontier AI in emerging
          markets. The carrot exists, the customer trusts the brand, and the workflow already touches the
          part of the user's life where the value lands.
        </p>
      </CaseSection>

      {/* SECTION 3 — in the next 18 months */}
      <CaseSection>
        <h2 className="essay-h2"><span className="hl hl-c">In the next 18 months</span></h2>
        <p>
          The time for deeper integration with fintechs is now. EM fintechs are mid-reckoning. Most are coming
          on-chain — moving their fiat operations onto cheaper, borderless, more transparent rails. Blockchains.
        </p>
        <p>
          Think of blockchains as nation-states. They need users in their ecosystems to justify their token
          economies. The mass-retail fight in crypto mirrors the mass-retail fight in AI — concentrated among
          four or five chains. Once they have enough users with wallet data and onchain activity locked in,
          they can multiplicatively deliver more compelling results, the same way foundation-model companies
          will eventually with bespoke models and physical AI.
        </p>
        <p>
          Both crypto and AI are fighting the same battle: adoption. That's not a coincidence — it's the structural
          opening.
        </p>
        <h3>The capital is moving</h3>
        <p>
          Blockchain foundations have read the room. Celo, Base, Solana, and others are sitting on treasuries
          they need to deploy. They are writing checks to get users onchain through fintechs.
        </p>
        <Stats items={ADOPTION_STATS} />
        <h3>The opportunity for US AI labs</h3>
        <p>
          This liquidity can subsidize AI deployment. The loop:
        </p>
        <ul className="bullets">
          <li>The user gets paid (in crypto incentives) to use an AI agent that runs on Claude.</li>
          <li>The agent delivers intelligence at a scope and impact the user has never experienced.</li>
          <li>The blockchain gets wallet adoption.</li>
          <li>The fintech gets engagement and retention.</li>
          <li>The AI lab gets deployment and evaluation data.</li>
        </ul>
        <p>
          Everyone in the loop is paid in the currency they already want. The user gets money. The blockchain
          gets users. The fintech gets stickiness. The AI lab gets the ground truth on how its models perform
          in conditions almost no existing eval covers.
        </p>
        <Pull>
          The window is eighteen months because the blockchain foundations are deploying capital now —
          and whoever is embedded when the rails are laid will be hard to displace.
        </Pull>
        <h3>Where this goes</h3>
        <p>
          The product gets sharper as the agent gets more authority. Today the agent advises. Within a year
          or two, it executes within parameters. By the end of the decade, it negotiates on the user's behalf —
          and eventually <em>becomes</em> the economic identity that lenders underwrite.
        </p>
        <Timeline items={TRAJECTORY} />
      </CaseSection>
    </CaseFrame>
  )
}
