import React from 'react'
import { CaseFrame, CaseHero, CaseSection, DataList, NumberedList, Pull, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

const IP = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const ICONS = {
  device:  <svg {...IP}><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
  bank:    <svg {...IP}><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 6V4M18 6V4"/></svg>,
  telco:   <svg {...IP}><path d="M2 12c2-4 6-7 10-7s8 3 10 7"/><path d="M5 15c1.5-3 4-5 7-5s5.5 2 7 5"/><circle cx="12" cy="18" r="1.5"/></svg>,
  shop:    <svg {...IP}><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9v11h18V9"/><path d="M3 9c0 2 1.5 3 3 3s3-1 3-3 1.5 3 3 3 3-1 3-3 1.5 3 3 3 3-1 3-3"/></svg>,
  gig:     <svg {...IP}><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17H3v-3l2-5h10l3 5h2v3h-2"/></svg>,
  agent:   <svg {...IP}><rect x="5" y="6" width="14" height="12" rx="2"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M12 2v4M9 18v2M15 18v2"/></svg>,
  photo:   <svg {...IP}><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/></svg>,
  intent:  <svg {...IP}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>,
  socio:   <svg {...IP}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M14 20c0-2 2-4 4-4s3 1.5 3 4"/></svg>,
  sms:     <svg {...IP}><path d="M21 12a9 9 0 1 1-3.5-7.1L21 4l-1 4.5"/><circle cx="9" cy="12" r="0.8" fill="currentColor"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/><circle cx="15" cy="12" r="0.8" fill="currentColor"/></svg>,
  chain:   <svg {...IP}><path d="M10 8a4 4 0 0 0 0 8h2M14 16a4 4 0 0 0 0-8h-2"/><path d="M8 12h8"/></svg>
}

const CATEGORIES = [
  { name: 'Device Data', icon: ICONS.device,
    what: 'App install / uninstall patterns, screen time, OS version, device model, connectivity type, location signals, battery usage.',
    why:  'Behavioral proxy for income, digital sophistication, lifestyle. Device model alone correlates with creditworthiness across multiple markets.' },
  { name: 'Banking & Transaction Data', icon: ICONS.bank,
    what: 'Mobile money flows, account statements, transfer patterns, balance trends, loan repayment history, savings behavior.',
    why:  'Ground-truth financial health at the individual level. Captures the informal economy that formal banking misses entirely.' },
  { name: 'Telco & Airtime Data', icon: ICONS.telco,
    what: 'Top-up frequency, amounts, channel, data bundle purchases, price sensitivity signals.',
    why:  'Telco spend is a real-time income proxy. Prepaid airtime pricing also tracks local inflation with surprising accuracy.' },
  { name: 'MSME & Merchant Data', icon: ICONS.shop,
    what: 'Transaction volume, inventory turnover signals, supplier payment patterns, small-business pricing data.',
    why:  'A direct line into on-the-ground pricing and supply chain dynamics — economic activity at the most granular commercial level.' },
  { name: 'Gig Platform Income', icon: ICONS.gig,
    what: 'Earnings from ride-hailing, delivery, freelancing. Payment frequency, income volatility, multi-platform participation.',
    why:  'Maps the informal labor market in real time. Volatility signals macro stress before formal employment data does.' },
  { name: 'Agentic AI Interaction', icon: ICONS.agent,
    what: 'User queries to AI financial agents, topics asked about, financial literacy gaps, product preferences, language patterns.',
    why:  'A new data category. Agent interactions reveal financial intent, unmet needs, and product-market fit signals at scale.' },
  { name: 'Photos & Physical Surroundings', icon: ICONS.photo,
    what: 'Shop photos, market stall images, product shelves, neighborhood imagery — submitted for KYC or business verification.',
    why:  'Visual data processable for price tracking, inventory, and infrastructure. Repeat captures create a visual time series.' },
  { name: 'Business Ambitions & Intent', icon: ICONS.intent,
    what: 'Loan-purpose declarations, business plans, stated goals, product or service expansion signals.',
    why:  'Forward-looking intent data. Aggregated, it reveals sectoral growth trends before formal indicators catch them.' },
  { name: 'Sociological / Self-Reported', icon: ICONS.socio,
    what: 'Household size, dependents, education, occupation, housing type, community affiliation, stated preferences.',
    why:  "Demographic segmentation at a depth and recency census data can't match — updated continuously, not every 5–10 years." },
  { name: 'SMS & Communication Metadata', icon: ICONS.sms,
    what: 'Tone, sentiment, message volume, transactional SMS from banks and services.',
    why:  'Population-level sentiment analysis. Transactional SMS provides an independent verification layer for financial data.' },
  { name: 'Onchain / Wallet Data', icon: ICONS.chain, special: 'dark',
    what: "KYC-linked wallet addresses, transaction history, counterparty graphs, stablecoin holdings, DeFi activity, cross-border flows, agent-controlled wallets.",
    why:  'Once a wallet is shared, every transaction it has ever done — and will ever do — is public, permanent, and queryable. KYC anchors it. This ground-truths global onchain data in ways no one else can.' }
]

const USE_CASES = [
  {
    title: 'Real-time inflation tracking',
    lede: "Conventional indices rely on monthly government surveys with narrow baskets. Fintech data offers a continuous read.",
    points: [
      'Customer photos of the same shops and markets month-over-month → SKU-level price changes by region.',
      'Telco airtime pricing tracks purchasing power. Bundles getting expensive vs income show up immediately.',
      'MSME transaction data reveals wholesale and retail price movements before they hit formal indices.',
      'Aggregated across tiers: stratified inflation data — what inflation looks like for the bottom 20% vs the top 20%, something no government index provides.'
    ]
  },
  {
    title: 'Consumer and economic sentiment',
    lede: 'Polling misses most of EM. Fintech behavioral data is continuous and passive.',
    points: [
      'SMS tone across millions of messages → population-level mood shifts. Validated at Tala in Kenya.',
      'App usage patterns (what is installed, how often it is used, when it is deleted) track consumer priorities and anxieties.',
      'Transaction velocity — how fast money moves through an account after deposit — is a direct proxy for confidence. Slow velocity signals hoarding.',
      'Loan application volume and stated purposes reveal where people see opportunity vs where they are managing emergencies.'
    ]
  },
  {
    title: 'Political signal extraction',
    lede: "A validated use case. Tala data — SMS sentiment + app installs — predicted electoral outcomes in Kenya.",
    points: [
      'App installs for news, party, and social platforms correlate with political preference at the regional level.',
      'SMS sentiment shifts in the weeks before elections track momentum in real time.',
      'Media consumption patterns reveal information-ecosystem dynamics.',
      'Layered with demographic and geographic data already in the system: electoral modeling at a granularity polling cannot reach.'
    ]
  },
  {
    title: 'Socioeconomic stratification mapping',
    lede: 'A continuously updated map of economic inequality.',
    points: [
      'Spending patterns across income tiers reveal how each class allocates food, transport, airtime, education.',
      'Loan repayment stratified by income reveals which tiers are falling behind, and on what.',
      'Pricing data across regions and income levels shows the poverty premium — how much more the poor pay for the same goods — in real time.',
      'Device data alone segments populations by tier with surprising accuracy.'
    ]
  },
  {
    title: 'Informal economy mapping',
    lede: 'GDP misses huge shares of EM economic activity. Fintech data makes it visible.',
    points: [
      'Mobile money flows between individuals and small businesses capture commerce that never touches a bank.',
      'Gig platform earnings quantify the informal labor market in real time.',
      'MSME transaction patterns reveal supply chains, trade corridors, and commercial networks formal data does not cover.',
      'Aggregated, this produces a parallel economic map — complementary to (and sometimes contradicting) official statistics.'
    ]
  },
  {
    title: 'Financial product demand signals',
    lede: 'AI agent interaction data creates a new category of intent signal.',
    points: [
      'Questions to AI financial agents reveal unmet product needs. Thousands asking about insurance, savings, or investments is real-time demand data.',
      'Financial literacy gaps in agent interactions show where new products would find traction.',
      'Stated business ambitions in loan applications, aggregated by sector, reveal emerging industry trends before formal data sees them.'
    ]
  },
  {
    title: 'Onchain network intelligence',
    lede: "Different in kind. Once a wallet is shared, the blockchain does the data collection. Combined with KYC, each wallet becomes a node in a global economic graph.",
    points: [
      'Counterparty graphs reveal family clusters, business partnerships, supplier networks, informal lending circles.',
      'Cross-border remittance corridors visible at the wallet level in real time — actual transactions, actual amounts, actual frequency.',
      'Stablecoin balances as a dollarization signal. Holding behavior is a leading inflation indicator that beat official data by weeks in Argentina, Nigeria, and Turkey.',
      'Cross-platform identity resolution links wallets, fintech identities, and gig identities into a single economic footprint — formal and informal, traditional and crypto.',
      'Geographic ground-truthing fixes the biggest weakness in current onchain analytics: today most of it guesses geography from IP and exchange relationships.'
    ]
  }
]

export default function DataOpportunity(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <CaseHero
        eyebrow="Brief · Fintech & alt data"
        title="Micro signals, macro insights"
        lede="Global fintech companies sit on the most granular behavioral and financial data ever collected on emerging-market populations — and almost none of them know how to extract macro intelligence from it. This brief lays out what's there, what it produces when aggregated properly, and why it matters for alt data."
        meta={[
          { k: 'Type',     v: 'Ideation brief' },
          { k: 'Status',   v: 'Draft for discussion' },
          { k: 'Coverage', v: '4B+ users across Africa, Southeast Asia, Latin America, South Asia' },
          { k: 'Topics',   v: 'Fintech · Alt data · Onchain' },
          { k: 'Author',   v: 'Naviya Kothari — Onchain Finance @ Tala' }
        ]}
      />

      <CaseSection kicker="Premise">
        <p>
          Global fintech companies have spent the last decade-plus underwriting credit with alternate data —
          which means they already collect, structure, and act on behavioral and financial signals from populations
          that are nearly invisible in conventional datasets.
        </p>
        <p>
          Most of them know the data is valuable. Almost none of them know how to extract macro intelligence
          from it, or how to package it for buyers who would pay a premium for it.
        </p>
        <Pull>
          The gap is not data collection. Fintechs already have the infrastructure.
          The gap is aggregation, standardization, and packaging.
        </Pull>
      </CaseSection>

      <CaseSection kicker="The raw material" title="What fintech companies actually collect">
        <p>
          Longitudinal behavioral data, collected with user consent, tied to verified identities,
          and updated continuously as customers transact. Eleven categories worth listing out.
        </p>
        <DataList items={CATEGORIES} />
        <Reactions id="data-categories" prompt="Which category surprised you?" />
      </CaseSection>

      <CaseSection kicker="The output" title="What this data produces at scale">
        <p>
          Each category above is useful on its own. Aggregated across millions of users, across countries, over
          years, they produce macro-level intelligence products that do not currently exist at this granularity
          or recency.
        </p>
        <NumberedList items={USE_CASES} />
      </CaseSection>

      <CaseSection kicker="Forward-looking" title="Agentic wallets">
        <p>
          Wallets controlled by AI agents are starting to exist. As fintech customers delegate transaction
          authority to agents — for savings automation, yield, recurring payments — agent-controlled wallets
          will become a meaningful share of onchain volume.
        </p>
        <ul className="bullets">
          <li>Classifying agent-controlled vs human-controlled wallets becomes a new data product.</li>
          <li>Agent-to-agent transactions produce a parallel economic layer with no equivalent in traditional finance.</li>
          <li>The ratio of agent-driven to human-driven volume in any market becomes a forward indicator of digital infrastructure adoption.</li>
          <li>Almost no alt data company is positioned to capture this. First-mover advantage is meaningful.</li>
        </ul>
      </CaseSection>

      <CaseSection kicker="Why it matters" title="The alt data gap, restated">
        <p>
          Alt data has built deep coverage of developed markets — credit card spend, satellite imagery, web
          traffic, social sentiment. Emerging-market coverage stays thin, largely because the data infrastructure
          is fragmented and hard to access.
        </p>
        <p>What an alt data partner brings to this:</p>
        <ul className="bullets">
          <li>Standardize heterogeneous formats across companies, countries, and regulatory regimes.</li>
          <li>Apply privacy, consent, and anonymization frameworks that make the data commercially usable.</li>
          <li>Build derived intelligence products — inflation indices, sentiment scores, stratification maps — that command premium pricing.</li>
          <li>Create a commercial model where fintechs are compensated fairly for data contribution, incentivizing participation.</li>
          <li>Provide coverage of 4B+ people underrepresented in existing alt data products.</li>
          <li>Treat onchain as a first-class category, not a bolt-on. Almost no alt data company has KYC-anchored wallet data at scale, and almost none have a serious read on agentic wallet activity.</li>
        </ul>
        <Pull>
          Without this, the data stays siloed across hundreds of fintechs — each holding a piece of a much larger
          picture. Or it gets acquired piecemeal by brokers with no governance and no accountability.
        </Pull>
      </CaseSection>

      <CaseSection kicker="Receipts" title="Proof points" tone="summary">
        <ul className="bullets">
          <li><strong>Electoral prediction in Kenya.</strong> Tala data — SMS sentiment + app installs — predicted electoral outcomes from a single fintech in a single market. Aggregated across companies and countries, the signal gets dramatically stronger.</li>
          <li><strong>Credit scoring via device data.</strong> Device metadata alone — phone model, app portfolio, connectivity — predicts creditworthiness with bureau-comparable accuracy where bureau coverage is thin.</li>
          <li><strong>Airtime as income proxy.</strong> Telco top-up patterns are a validated proxy for income level and stability across African and Southeast Asian markets.</li>
          <li><strong>Photo-based business verification.</strong> Submitted shop photos are already used for underwriting. The same images captured repeatedly create a visual time series for price and inventory tracking.</li>
          <li><strong>Stablecoin flows as inflation signal.</strong> In Argentina, Nigeria, and Turkey, onchain stablecoin balance growth has consistently led official inflation data by weeks. Fintechs enabling crypto already see this at the wallet level.</li>
        </ul>
        <ReflectionPrompt id="data-opp" prompt="If you ran an alt-data partnership, which intelligence product would you build first?" />
        <ReadComplete id="data-opp" reward={5} />
      </CaseSection>
    </CaseFrame>
  )
}
