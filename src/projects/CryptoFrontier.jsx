import React from 'react'
import { CaseFrame, CaseSection, Axes, Stats, Pull, NumberedList, Timeline, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

const PROPERTIES = [
  { k: 'Dollar access',
    v: "Stablecoins put a dollar balance in a phone in a country where the local currency loses value every month. That's not a feature of crypto. For a lot of people it's the whole reason to show up." },
  { k: 'Borderless settlement',
    v: "Onchain rails move value across borders in minutes for cents, with no correspondent bank in the middle. The remittance corridors the old system priced like a luxury get cheap and fast." },
  { k: 'Programmable + transparent',
    v: "Once a transaction is onchain it's public, permanent, and queryable. That's a settlement layer an agent can read, build credit on, and act through without asking anyone's permission." }
]

const RECEIPTS = [
  { num: '$54B',  label: 'stablecoin transactions across Africa, 2024' },
  { num: '7M+',   label: 'Opera MiniPay wallets' },
  { num: '5M+',   label: 'Flutterwave wallets' },
  { num: '4M+',   label: 'Yellow Card wallets' }
]

const USE_CASES = [
  {
    title: 'Stablecoin payroll and remittances',
    lede: 'The diaspora rails are the wedge. Pay someone in USDC, settle in minutes, let them hold dollars or cash out locally.',
    points: [
      'Remittance fees that ran 6-9% collapse toward the cost of a transaction.',
      'The recipient holds a stable store of value instead of watching it erode between payday and spend.',
      'Employers and platforms paying gig and remote workers across borders skip the correspondent banking maze entirely.'
    ]
  },
  {
    title: 'Onchain credit',
    lede: 'Once income and savings live in a wallet, the wallet becomes the underwriting signal. Credit stops depending on a bureau that never covered these people.',
    points: [
      'Repayment history, counterparty graphs, and stablecoin balances are visible and verifiable at the wallet level.',
      'Lending can be collateralized, programmatic, and settled onchain, which lowers the cost of being wrong for a lender entering a thin-data market.',
      'This is the rail Lucy and agents like her eventually run on: the credit decision and the money movement in the same place.'
    ]
  },
  {
    title: 'Savings and yield that actually reach people',
    lede: 'Dollar savings with a yield, accessible from a feature phone, is a product most of these markets have never been offered.',
    points: [
      'Onchain yield products can be packaged inside a fintech the customer already trusts.',
      'The carrot is concrete and financial, which is the only kind that reliably changes behavior in these markets.'
    ]
  },
  {
    title: 'Agentic finance',
    lede: 'Self-custodial wallets are something an AI agent can hold and act through. That makes the agent an economic actor, not just an advisor.',
    points: [
      'Agents can run recurring payments, savings sweeps, and yield rotation within parameters the user sets.',
      'Agent-controlled wallets become a measurable share of onchain volume, and a forward indicator of how fast a market is digitizing.',
      'The interesting part is what happens when agents transact with other agents on rails built for exactly that.'
    ]
  }
]

const WINDOW = [
  { when: 'Now',          title: 'The foundations are deploying.', body: 'Celo, Base, Solana and others are sitting on treasuries they need to put to work, and they are writing checks to get users onchain through fintechs.' },
  { when: '12-24 months', title: 'The rails get laid.',            body: 'Fintechs move their fiat operations onchain. Wallets, balances, and onchain activity accumulate inside a handful of ecosystems.' },
  { when: 'After that',   title: 'Displacement gets expensive.',   body: "Once a market's users, data, and habits are locked into a chain, switching them is hard. Whoever is embedded when the rails are laid keeps the position." }
]

export default function CryptoFrontier(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <section className="case-hero essay-hero">
        <p className="case-eyebrow">Essay · Thesis</p>
        <h1 className="essay-h1">
          <span className="hl hl-a">Crypto</span>{' '}
          is the{' '}
          <span className="hl hl-b">final rail</span>{' '}
          to{' '}
          <span className="hl hl-c">emerging-market use cases</span>.
        </h1>
        <p className="case-lede">
          Every prior wave of finance was built for someone else. Crypto is the first set of rails that reaches the
          people the bureau, the card networks, and SWIFT all skipped, and the companies laying those rails right now
          are deciding who gets there first.
        </p>
        <dl className="case-meta">
          <div className="case-meta-row"><dt>Type</dt><dd>Thesis</dd></div>
          <div className="case-meta-row"><dt>Topics</dt><dd>Crypto · Stablecoins · Fintech · Emerging markets</dd></div>
          <div className="case-meta-row"><dt>Author</dt><dd>Naviya Kothari, Onchain Finance @ Tala</dd></div>
        </dl>
      </section>

      <CaseSection kicker="The setup" title="The people every prior wave skipped">
        <p>
          Banking was built for people with steady, documented income. Card networks were built on top of banking.
          SWIFT was built for institutions moving large sums between rich countries. Each wave assumed the
          infrastructure of the last one, and each one skipped the same few billion people: thin files, informal
          income, a currency that loses value faster than they can save it.
        </p>
        <p>
          Mobile money was the first thing that actually reached them, and it worked. But it stays trapped inside one
          telco, in one country, behind one company's rails. The value can't easily leave the building. For the half
          of the world that needs cross-border, dollar-denominated, programmable money, mobile money is a local
          patch, not a global rail.
        </p>
        <Pull>The gap was never that these people don't transact. It's that nobody built rails that reached them and connected to everyone else.</Pull>
      </CaseSection>

      <CaseSection kicker="Why crypto" title="The rail, not just another app">
        <p>
          I don't think about stablecoins as a crypto story. I think about them as a backbone for the people SWIFT
          never served. Three properties are what make crypto a rail instead of one more app fighting for a home
          screen:
        </p>
        <Axes items={PROPERTIES} />
        <p>
          Put together, that's dollar access, cheap cross-border settlement, and a transparent ledger an agent can
          build on. No prior wave offered all three to a person on a feature phone. That's the part that makes this
          structural and not just another cycle.
        </p>
        <Reactions id="crypto-rail" prompt="Buying the rail-not-app framing?" />
      </CaseSection>

      <CaseSection kicker="The opening" title="Why it's the final frontier, not just the next one">
        <p>
          Here's the part that makes the timing matter. The capital is already moving, on purpose. Think of
          blockchains like nation-states: they need users in their ecosystems to justify their token economies, so
          the mass-retail fight in crypto looks a lot like the mass-retail fight in AI, concentrated among four or
          five chains. The foundations behind them are sitting on treasuries they need to deploy, and they are paying
          to get users onchain through the fintechs those users already trust.
        </p>
        <Stats items={RECEIPTS} />
        <p>
          Once a chain has enough users with wallet data and onchain activity locked in, it can deliver more
          compelling results multiplicatively, the same way foundation-model companies eventually will with bespoke
          models. The market closes around whoever got there first. That's why I call it the final frontier and not
          the next one: this is the last distribution layer that reaches these users, and the position is being
          claimed now.
        </p>
        <Timeline items={WINDOW} />
      </CaseSection>

      <CaseSection kicker="The payoff" title="What gets built once the rails are there">
        <p>
          The rail is the boring part. What it unlocks is the point. Each of these is hard or impossible on the old
          infrastructure and becomes straightforward once value lives in a wallet:
        </p>
        <NumberedList items={USE_CASES} />
      </CaseSection>

      <CaseSection kicker="Where I could be wrong" title="The honest caveats">
        <p>
          I want to be fair to the other side, because crypto has overpromised in emerging markets before and the
          objections are real:
        </p>
        <ul className="bullets">
          <li><strong>Regulation is the swing factor.</strong> Stablecoin and crypto rules are still being written in most of these markets, and a hostile ruling can close a corridor overnight. The thesis assumes regulators land somewhere workable, which is not guaranteed.</li>
          <li><strong>"Stable" is doing a lot of work.</strong> Depegs, reserve quality, and issuer risk are real. A dollar balance is only as good as the thing backing it, and the people who can least afford a loss are the ones holding it.</li>
          <li><strong>Custody and UX still lose people.</strong> Seed phrases and gas fees are how you lose a first-time user. The version of this that works hides the crypto completely behind a fintech the customer already knows.</li>
          <li><strong>This has been promised before.</strong> "Crypto banks the unbanked" has been a pitch for a decade with thin results. What's different now is stablecoin volume that's actually being used to move money, and foundations with the treasuries and the motive to subsidize adoption. If that capital dries up, the timeline stretches.</li>
        </ul>
        <Pull>The bet isn't that crypto is good. It's that stablecoin rails are the first infrastructure that reaches these users and connects them to everyone else, and that the position is being claimed right now.</Pull>
        <ReflectionPrompt id="crypto-frontier" prompt="Where do you think this thesis is weakest?" />
        <ReadComplete id="crypto-frontier" reward={5} />
      </CaseSection>
    </CaseFrame>
  )
}
