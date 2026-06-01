import React from 'react'
import { CaseFrame, CaseHero, CaseSection, VersionCard, MetricTable, ChangeList, Pull, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

export default function Lucy(){
  return (
    <CaseFrame>
      <CaseHero
        eyebrow="Case study · Tala"
        title="Lucy"
        lede="The first AI loan officer and business coach for Kenyan micro-entrepreneurs. Three versions, ten months, one moving thesis."
        meta={[
          { k: 'Market',  v: 'Nairobi, Kenya' },
          { k: 'Period',  v: 'Feb 2025 – present' },
          { k: 'Role',    v: 'Product lead, Onchain Finance @ Tala' },
          { k: 'Stack',   v: 'GPT-4 + RAG · web app · text / voice / photo input' },
          { k: 'Partner', v: 'EXP — field ops for acquisition & onboarding' }
        ]}
      />

      <div className="lucy-stats">
        <div className="lucy-stat"><span className="lucy-stat-num">10M+</span><span className="lucy-stat-label">borrowers Tala has served</span></div>
        <div className="lucy-stat"><span className="lucy-stat-num">8</span><span className="lucy-stat-label">markets</span></div>
        <div className="lucy-stat"><span className="lucy-stat-num">3</span><span className="lucy-stat-label">Lucy versions shipped</span></div>
        <div className="lucy-stat"><span className="lucy-stat-num">6 wk</span><span className="lucy-stat-label">to first ground signal</span></div>
        <div className="lucy-stat"><span className="lucy-stat-num">80%</span><span className="lucy-stat-label">said they'd be very disappointed</span></div>
      </div>

      <CaseSection kicker="Why" title="The problem Tala kept seeing">
        <p>
          Tala has served ten million borrowers across Kenya, Mexico, India, and the Philippines since 2012 — uncollateralized
          credit disbursed in minutes through a phone. The best customers were always micro-entrepreneurs: mama mbogas, kiosk
          operators, salon owners, boda boda mechanics. They borrow to grow, not to consume.
        </p>
        <p>The product didn't know that. Five things were converging:</p>
        <ul className="bullets">
          <li>Credit treated entrepreneurs the same as every other borrower.</li>
          <li>The relationship was purely transactional — no coaching between loans.</li>
          <li>Cheap credit was being commoditized. Pricing wasn't a moat.</li>
          <li>The signal we'd built underwriting on (Google data) was getting sparser.</li>
          <li>AI hadn't reached our customer segments yet — and wasn't built for Swahili, low literacy, busy lives, or thin data.</li>
        </ul>
        <p>Lucy was a bet that the durable moat could be intimate customer understanding, not price.</p>
      </CaseSection>

      <CaseSection kicker="Hypothesis" title="What we were testing">
        <p>Three bets, stacked:</p>
        <ol className="numbered">
          <li>An image-first, conversation-driven loan app would feel novel enough to sustain interest in a new AI friend.</li>
          <li>A storefront photo would tell us enough about footfall to supplement other underwriting signals.</li>
          <li>Personalized coaching layered on credit would lift repayment, retention, and reported business outcomes.</li>
        </ol>
        <p className="secondary">
          Underneath: a secondary bet that conversational data — goals, risk tolerance, business reasoning — would
          underwrite better than behavioral signal alone.
        </p>
      </CaseSection>

      <CaseSection kicker="Experiments" title="Three versions, three different products">
        <VersionCard
          tag="V1"
          name="Lucy 1.0 — The Magic Loan App"
          date="April 2025"
          mood="struggling"
          lede="Built as a daily coaching tool. Long-form responses, educational tone, heavy onboarding to capture profile and goals up front."
        >
          <h3>What the field told us at six weeks</h3>
          <ul className="bullets">
            <li><strong>Engagement was episodic, not habitual.</strong> Customers came when something was wrong — a stock decision, a supplier change — not on a schedule.</li>
            <li><strong>They scrolled past long messages</strong> and anchored only on bolded phrases.</li>
            <li><strong>Voice input was unusable in open-air markets.</strong> Ambient noise killed it. Not an edge case — the default.</li>
            <li><strong>Onboarding needed hand-holding</strong> from EXP agents. Customers who tried alone abandoned.</li>
          </ul>

          <h3>Numbers</h3>
          <MetricTable rows={[
            { k: 'Overall return engagement', v: '~60% returned at least once post-loan' },
            { k: 'Return engagement, verified business owners', v: '71%' },
            { k: 'Reporting positive business outcomes at 8 weeks', v: '61%' },
            { k: "Would be very disappointed if Lucy disappeared", v: '80%' },
            { k: 'Repayment', v: 'Below viable threshold' }
          ]} />

          <Pull>
            80% loved her in principle. Fewer than 60% used her in practice.
            She was a decision accelerator, not a habit product — and we'd built for a behavior that didn't exist.
          </Pull>

          <h3>Quotes that moved the needle</h3>
          <ul className="quotes">
            <li>"It kept scrolling and I didn't know where I left off."</li>
            <li>"I only wanted the loan. Once I got it, I didn't see the need to keep chatting."</li>
          </ul>

          <Reactions id="lucy-v1" prompt="Did 1.0's failure make sense?" />
        </VersionCard>

        <VersionCard
          tag="V2"
          name="Lucy 2.0 — Decision Partner"
          date="Late July 2025"
          mood="working"
          lede="Same thesis, different shape. Lucy's job became: help someone decide faster. Not teach them from scratch."
        >
          <h3>What changed</h3>
          <ChangeList items={[
            { from: 'open-ended',  to: '3-day sequence',           label: 'Onboarding' },
            { from: 'teacher',     to: 'advisor',                  label: 'Tone' },
            { from: 'long explainers', to: 'one idea, depth on request', label: 'Output' },
            { from: 'broad',       to: 'segmented, real owners',   label: 'Acquisition' },
            { from: 'primary',     to: 'de-emphasized',            label: 'Voice' },
            { from: 'rescue',      to: 'recognition of capability', label: 'Credit framing' }
          ]} />

          <h3>Lucy 2.1 — fewer onboarding tasks, August 2025</h3>
          <p>A minor revision that gave us the clearest signal yet on what actually worked.</p>

          <MetricTable rows={[
            { k: 'Engagement pattern',       v: 'Confirmed episodic — spikes around real problems' },
            { k: 'High-fit segment',         v: 'Growth-oriented owners who used Lucy to think, not learn' },
            { k: 'Low-fit segment',          v: 'Survival-driven users, loan-first mindset, employees acting for owners' },
            { k: 'Trust mechanism',          v: 'Concrete wins in days (save KES 200, change a display, add one SKU)' },
            { k: 'Coaching format that won', v: 'Short, bolded, one direction, opt-in to depth' },
            { k: 'Speed vs engagement',      v: 'Slower disbursement → higher engagement quality' }
          ]} />

          <h3>What customers said</h3>
          <ul className="quotes">
            <li>"Lucy confirmed what I was already planning to do."</li>
            <li>"It helped me decide, not learn from scratch."</li>
            <li>"Lucy trusted me — I had to repay."</li>
            <li>"It feels peaceful. I don't hide from Tala anymore."</li>
          </ul>

          <Pull>Repayment motivation had shifted from compliance to relationship preservation.</Pull>

          <Reactions id="lucy-v2" prompt="React to the v2 shift" />
        </VersionCard>

        <VersionCard
          tag="V3"
          name="Lucy 3.0 — Thesis"
          date="In design · Nov 2025"
          status="in design"
          mood="early"
          lede="Decouple coaching from free credit. Charge a subscription for the coaching itself. Filter for customers who'll pay for the relationship — not the loan that comes with it."
        >
          <p>
            By October, the credit product underneath Lucy was creating misaligned incentives. Fast, easy loans pulled the
            wrong users. The combination worked best when credit felt earned, contextual, and tied to demonstrated engagement.
            Lucy 3.0 separates the products to test the part we actually want to compound.
          </p>
        </VersionCard>
      </CaseSection>

      <CaseSection kicker="Ruled out" title="What we stopped believing">
        <ul className="bullets">
          <li><strong>Voice as accessibility.</strong> Markets are loud. Voice fails by default, not by exception.</li>
          <li><strong>AI as independent trust-builder.</strong> Trust transferred from the EXP agent to Lucy — not the other way. Joint onboarding wasn't optional.</li>
          <li><strong>High-bandwidth assumptions.</strong> Low-end phones, expensive data, intermittent connections. Designs that assume reliable internet fail quietly, not loudly.</li>
        </ul>
      </CaseSection>

      <CaseSection kicker="What the tech actually required">
        <ul className="bullets">
          <li><strong>Localization in the architecture, not on top.</strong> Sheng, Kenyan market examples, and literacy-appropriate language lived in the system prompts. Generic models produced plausible-but-irrelevant guidance.</li>
          <li><strong>RAG as a ground truth layer.</strong> Without it, Lucy gave confidently wrong advice a Nairobi vendor would clock immediately.</li>
          <li><strong>Human-in-the-loop review.</strong> Cultural appropriateness and gender inclusivity got reviewed by humans, not just internal QA. Adversarial testing caught responses that read as prescriptive on lending — a line Lucy was engineered not to cross.</li>
          <li><strong>Constraint-first design.</strong> The product that works on a feature phone in a noisy market is not the product you'd design assuming a mid-range phone and stable WiFi.</li>
        </ul>
      </CaseSection>

      <CaseSection kicker="Takeaways" title="What I'd carry into the next one" tone="summary">
        <MetricTable rows={[
          { k: 'Usage is episodic',                       v: 'Design for decision moments, not daily habits' },
          { k: 'High-fit users come to think, not learn', v: 'Position as advisor, not teacher' },
          { k: 'Trust is built through proof',            v: 'Deliver a concrete win before asking for anything' },
          { k: 'Fast loans pull opportunistic users',     v: 'Credit design shapes engagement quality' },
          { k: 'Customers repay for future value',        v: 'Relationship framing beats collection framing' },
          { k: 'Voice fails in markets',                  v: 'Design for constraints, not averages' },
          { k: 'Human-AI handoffs are non-negotiable',    v: 'Lucy extends trust; she doesn\'t create it from scratch' },
          { k: 'Acquisition quality > scale',             v: 'Segment before you grow' }
        ]} />
      </CaseSection>

      <CaseSection kicker="Next" title="Mexico, and the open question">
        <p>
          The next market is Mexico. The coaching architecture holds. The assumptions about user behavior, trust, and credit
          design reset for every new geography — translation isn't localization.
        </p>
        <p>
          The bigger question Lucy is still asking — whether an LLM can be a genuine financial decision partner for low-income
          entrepreneurs at scale, across markets, across languages, with real credit attached — doesn't have a complete answer
          yet. We're further down the road than anyone else who's tried.
        </p>
        <ReflectionPrompt id="lucy" prompt="What would you take into the Mexico build?" />
        <ReadComplete id="lucy" reward={5} />
      </CaseSection>
    </CaseFrame>
  )
}
