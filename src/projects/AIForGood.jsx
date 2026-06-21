import React from 'react'
import { CaseFrame, CaseSection, Axes, Pull, NumberedList, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

const REFRAME = [
  { k: 'The usual version',
    v: "A safety panel, an ethics board, a pilot program, a grant. Worthy, but small, and mostly happening where the technology already is." },
  { k: 'The bigger lever',
    v: "AI has the largest marginal impact on the people who currently have the least access to it. The good at scale is getting capable AI to them, not adding another guardrail where it already lives." },
  { k: 'What scale actually requires',
    v: "Good intentions don't scale. Distribution does. The question is which existing rails can carry AI to billions of people, and what has to be true for it to land." }
]

const CONCRETE = [
  {
    title: 'Put the agent where the value lands',
    lede: "The AI that reaches a last-mile customer is the one attached to something that already touches their money, not a standalone good-cause app they have to be talked into.",
    points: [
      'A credit-and-coaching agent that lifts repayment and reports real business outcomes, like Lucy at Tala, is AI for good that also has a reason to exist commercially.',
      'The financial benefit is the carrot. In these markets, a concrete win with money attached is the only thing that reliably changes behavior.',
      'Built this way, the good and the business case point the same direction, which is the only version that survives past the pilot.'
    ]
  },
  {
    title: 'Automate the parts of a job nobody wanted',
    lede: "AI isn't really killing jobs. It's killing the parts of jobs nobody liked doing in the first place. At scale, that's a lot of returned time.",
    points: [
      'The win is a loan officer, a health worker, or a teacher who spends less time on forms and more time on people.',
      'The design choice that matters: build tools that increase what a person can do, not ones that quietly replace their judgment.'
    ]
  },
  {
    title: 'Turn fintech data into intelligence for the people who govern these markets',
    lede: "The same behavioral data that underwrites a loan can produce real-time inflation, sentiment, and informal-economy signals that official statistics miss by months.",
    points: [
      'Continuous, granular reads where census and survey data are years stale and thin.',
      'Done with consent and governance, this gives governments and NGOs a clearer picture of the people they serve, in time to act on it.',
      "Done carelessly, it's surveillance. The line is consent, aggregation, and who the intelligence is actually for."
    ]
  },
  {
    title: 'Build for the language, the literacy, and the phone people actually have',
    lede: "Most of the good gets lost in the last mile. A model fluent in English produces plausible, useless guidance for someone code-switching in a noisy market.",
    points: [
      'Localization in the architecture, not bolted on top: dialect, code-switching, and literacy level designed in from the start.',
      'One idea per turn, in their language, on a feature phone. That is most of the difference between an agent that helps and one that demos.'
    ]
  }
]

export default function AIForGood(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <section className="case-hero essay-hero">
        <p className="case-eyebrow">Essay · Position</p>
        <h1 className="essay-h1">
          <span className="hl hl-a">AI for good</span>{' '}
          at scale is a{' '}
          <span className="hl hl-b">distribution problem</span>,{' '}
          not a{' '}
          <span className="hl hl-c">goodness problem</span>.
        </h1>
        <p className="case-lede">
          Most of what gets called "AI for good" is small and happening where the technology already is. The larger
          good is getting capable AI to the people who've had the least of everything, and that's a question about
          rails, incentives, and the last mile, not about good intentions.
        </p>
        <dl className="case-meta">
          <div className="case-meta-row"><dt>Type</dt><dd>Position</dd></div>
          <div className="case-meta-row"><dt>Topics</dt><dd>AI · Access · Emerging markets</dd></div>
          <div className="case-meta-row"><dt>Author</dt><dd>Naviya Kothari, Onchain Finance @ Tala</dd></div>
        </dl>
      </section>

      <CaseSection kicker="The reframe" title="What 'AI for good' usually means, and why it's too small">
        <p>
          When people say "AI for good," they usually mean a safety panel, an ethics board, a pilot, or a grant. All
          worthy. All small, and almost all of it happening in the places where the technology already lives. I keep
          coming back to a simpler fact: AI helps the most the people who currently have the least access to it. The
          marginal value of a capable agent is enormous for someone who has never had a bank, an advisor, or a
          second opinion, and modest for someone who already has all three.
        </p>
        <Axes items={REFRAME} />
        <Pull>If AI's largest marginal impact is on the people with the least access to it, then the most good you can do is close that access gap. Everything else is a rounding error by comparison.</Pull>
      </CaseSection>

      <CaseSection kicker="The hard part" title="Scale is a distribution problem">
        <p>
          Good intentions don't scale. A mission-driven app still has to be found, trusted, understood, and used by
          someone whose data is expensive and whose day is full. The thing that reaches billions of people isn't a
          standalone "for good" product. It's AI embedded into a workflow that already touches the part of their life
          where value lands, carried on rails that already reach them.
        </p>
        <p>
          That's why I spend my time on the unglamorous infrastructure: fintech distribution, agents attached to
          credit and savings, the onchain rails that finally reach these users. Not because the rails are the good
          part, but because nothing reaches scale without them. The fastest path to AI doing real good for billions
          of people runs through the boring question of who already has their trust and their attention.
        </p>
        <Reactions id="ai-good-distribution" prompt="Agree that distribution is the bottleneck, not goodness?" />
      </CaseSection>

      <CaseSection kicker="Concretely" title="What it looks like when it works">
        <p>
          I want to be specific, because "AI for good" collapses into a slogan the moment it stops being concrete.
          Four shapes I've either built or watched work:
        </p>
        <NumberedList items={CONCRETE} />
      </CaseSection>

      <CaseSection kicker="How it goes wrong" title="The honest failure modes">
        <p>
          The same mechanisms that make this powerful make it easy to do harm while calling it help. I'd rather name
          the failure modes than pretend they aren't there:
        </p>
        <ul className="bullets">
          <li><strong>Extraction dressed as inclusion.</strong> Reaching underserved users is also a way to harvest their data and attention. If the user isn't clearly better off in a way they'd recognize, it isn't good, whatever the deck says.</li>
          <li><strong>Dependency instead of agency.</strong> A tool that quietly takes over someone's decisions hasn't increased their agency, it's rented it. The test I use: does this leave the person more capable when the tool isn't there, or less?</li>
          <li><strong>"For good" as theater.</strong> A pilot that's designed to be photographed and never to scale is a marketing line, not impact. If it can't survive without the grant, it was never the thing.</li>
          <li><strong>Confident, wrong, and unaccountable.</strong> An agent that gives a poor person bad financial advice with total confidence does real damage. Bounding the cost of being wrong is not a nice-to-have here, it's the whole job.</li>
        </ul>
        <Pull>The through-line, for me, isn't making AI smarter. It's redesigning the human systems around intelligence so that more people actually get the upside.</Pull>
        <p>
          That's the work I care about: not AI as a cause, but AI as the thing that finally reaches the people every
          prior wave skipped, built carefully enough that it leaves them with more agency than it found.
        </p>
        <ReflectionPrompt id="ai-for-good" prompt="What's the most overrated and most underrated 'AI for good' idea right now?" />
        <ReadComplete id="ai-for-good" reward={5} />
      </CaseSection>
    </CaseFrame>
  )
}
