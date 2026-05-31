import React from 'react'
import { CaseFrame, CaseHero, CaseSection, Axes, Stats, Timeline, DataList, Pull } from '../components/CaseStudy'

const FRAMING = [
  { k: 'Commercial',
    v: "Billions of underserved users. They're price-elastic and will default to free. But if AI is wired into workstreams that produce tangible economic value, they'll pay." },
  { k: 'Sociological',
    v: "AI has its largest marginal impact on the people with the least access to it. Letting the tech gap widen means letting the agency gap widen." },
  { k: 'Geopolitical',
    v: "If the US doesn't build the infrastructure for AI adoption in EM, China will. DeepSeek already holds 89% in China, 11–14% across parts of Africa, and is bundled into Huawei devices through government infrastructure deals." }
]

const ADOPTION_STATS = [
  { num: '$54B',  label: 'stablecoin transactions across Africa, 2024' },
  { num: '7M+',   label: 'Opera MiniPay wallets' },
  { num: '5M+',   label: 'Flutterwave wallets' },
  { num: '4M+',   label: 'Yellow Card wallets' }
]

const TRAJECTORY = [
  { when: 'Now',           title: 'Agents advise.',          body: 'Customer asks, agent recommends, customer decides.' },
  { when: '12–24 months',  title: 'Agents execute.',         body: 'Within pre-set parameters. Recurring payments, savings sweeps, yield rotation.' },
  { when: '2–4 years',     title: 'Agents precede customers.', body: 'See rent is due and cash is short — refinance proactively.' },
  { when: '3–5 years',     title: 'Agents negotiate with agents.', body: "Customer's agent plays three lenders against each other." },
  { when: '5+ years',      title: 'Agents become economic identities.', body: "Lenders evaluate the agent's track record, not the person's." }
]

const RECEIPTS = [
  {
    name: 'Users are price-elastic until AI delivers economic value',
    what:  "DeepSeek's free model surged in Africa because no fees lowered the barrier for price-sensitive users — proving the elasticity directly.",
    why:   'Microsoft / Stanford study: contact-center agents with an AI assistant were 14% more productive overall. Lowest-skilled workers gained 35%. An agent at two months performed like one at six. Free gets them in the door; economic value sustains engagement.'
  },
  {
    name: 'AI has the largest marginal impact on those with least access',
    what:  'Research shows AI helps less experienced workers gain productivity faster. The IMF has noted AI could worsen inequality if gains complement higher-income workers disproportionately.',
    why:   'Which means the upside is structurally highest for the people who have the least to start with — but only if access is solved. 80% of the global workforce is in developing nations; almost all AI job-impact research focuses on high-income countries.'
  },
  {
    name: 'The capital is here. The window is open.',
    what:  'Global fintech investment rebounded to $116B in 2025, up from $95.5B in 2024. Digital assets nearly doubled, $11.2B → $19.1B. Stablecoins processed $9T in payments — an 87% jump YoY. Remittances to LMICs hit $685B in 2024, surpassing FDI.',
    why:   'African fintechs alone took ~$1.4B in equity in 2024 — roughly 60% of all African tech VC. IMF research confirms fintech\'s impact on financial inclusion is statistically stronger in developing economies than advanced ones. The pools of capital exist; the rails are being laid right now.'
  }
]

export default function AIDiffusion(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <CaseHero
        eyebrow="Thesis · AI × Fintech × Crypto"
        title="AI diffusion in emerging markets is best done with fintechs."
        lede="Three reasons it has to happen. One real way it can. An 18-month window that closes when the rails are laid."
        meta={[
          { k: 'Type',     v: 'Thesis' },
          { k: 'Horizon',  v: '18 months' },
          { k: 'Topics',   v: 'AI · Fintech · Crypto · Emerging markets' },
          { k: 'Audience', v: 'AI labs · Fintech operators · Crypto foundations' },
          { k: 'Author',   v: 'Naviya Kothari — Onchain Finance @ Tala' }
        ]}
      />

      <CaseSection kicker="Why now matters" title="Three lenses on the same question">
        <Axes items={FRAMING} />
      </CaseSection>

      <CaseSection kicker="The wrong playbook" title="Distribution is not adoption">
        <p>AI is being pushed three ways today:</p>
        <ul className="bullets">
          <li><strong>Direct to consumer</strong> through lower-cost models (ChatGPT Go at $4.60/mo across 89 countries, DeepSeek free).</li>
          <li><strong>Embedded in devices</strong> (DeepSeek preloaded on Huawei / HarmonyOS, Gemini on Android).</li>
          <li><strong>Through consumer companies</strong> — barely, and with no coherent EM strategy.</li>
        </ul>
        <p>All three drive <em>distribution</em> — by being cheaper, freer, or harder to escape. None of them drive <em>adoption</em>.</p>
        <Pull>Adoption requires behavior change. Behavior change requires incentive.</Pull>
        <p>
          Devices and telcos have sticks — lock the device, revoke service. Their carrots are thin: maybe free
          mobile data in exchange for using AI. After years working in EM, only one carrot reliably changes
          behavior: <strong>money</strong>. Better loan terms. Higher savings yields. Cheaper remittances.
          Direct financial benefit from using an AI product. <strong>Only fintechs are positioned to offer it.</strong>
        </p>
      </CaseSection>

      <CaseSection kicker="The window" title="Why fintechs, why the next 18 months">
        <p>
          EM fintechs are mid-reckoning. Most are moving fiat operations onto cheaper, borderless, more
          transparent rails — blockchains. Think of blockchains as nation-states: they need users in their
          ecosystems to justify their token economies. The mass-retail fight is concentrated among four or
          five chains, and they're all fighting the same battle as foundation-model companies — adoption.
        </p>
        <p>
          Blockchain foundations have read the room. They're sitting on treasuries they need to deploy, and
          they're writing checks to get users onchain through fintechs.
        </p>
        <Stats items={ADOPTION_STATS} />
        <p>
          The opportunity for US AI labs: that liquidity can subsidize AI deployment. Here's the loop:
        </p>
        <ul className="bullets">
          <li>The user gets paid (in crypto incentives) to use an AI agent that runs on Claude.</li>
          <li>The agent delivers intelligence at a scope and impact they've never experienced.</li>
          <li>The blockchain gets wallet adoption.</li>
          <li>The fintech gets engagement and retention.</li>
          <li>The AI lab gets deployment and evaluation data.</li>
        </ul>
        <Pull>
          The window is 18 months because the blockchain foundations are deploying capital now —
          whoever is embedded when the rails are laid will be hard to displace.
        </Pull>
      </CaseSection>

      <CaseSection kicker="Where it goes" title="The trajectory of agents">
        <Timeline items={TRAJECTORY} />
      </CaseSection>

      <CaseSection kicker="Receipts" title="The claims, with evidence" tone="summary">
        <DataList items={RECEIPTS} labels={['Claim', 'Evidence']} />
        <p className="secondary">
          Sources: Microsoft / Stanford on AI productivity gains by skill tier · IMF on AI &amp; inequality and on
          fintech's role in financial inclusion · KPMG Pulse of Fintech 2025 · World Bank on remittances and
          mobile money · Delphos on African fintech equity · World Bank Blogs on the global workforce.
        </p>
      </CaseSection>
    </CaseFrame>
  )
}
