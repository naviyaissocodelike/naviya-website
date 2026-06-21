import React from 'react'
import { CaseFrame, CaseHero, CaseSection, NumberedList, Stats, Pull, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

const HEADLINE_STATS = [
  { num: '2',        label: 'agents shipped into emerging markets' },
  { num: '+30%',     label: 'retention lift from onboarding redesign (N=5K)' },
  { num: '20%→8%',   label: 'hallucination rate after the production finetune loop' },
  { num: '−40%',     label: 'training loss from the same loop' }
]

/* Each lesson: a premise line, then how it showed up in Lucy and Luna, then the rule I'd hand someone. */
function Field({ lucy, luna, rule }){
  return (
    <ul className="bullets">
      {lucy && <li><strong>Lucy.</strong> {lucy}</li>}
      {luna && <li><strong>Luna.</strong> {luna}</li>}
      <li><strong>What I'd tell you.</strong> {rule}</li>
    </ul>
  )
}

const LESSONS = [
  {
    title: 'Start from the constraint, not the capability',
    lede: "The first instinct is to design around what the model can do. That's the wrong order. Design around what the user's world allows, then see how much capability survives the trip.",
    children: <Field
      lucy="Voice input was unusable in open-air markets. Ambient noise killed it, and that was the default, not an edge case. Anything that assumed reliable internet, a mid-range phone, or a quiet room failed quietly instead of loudly."
      rule="Write the constraints down before the features: phone tier, bandwidth, literacy, language, ambient conditions, where trust starts. The product that works on a feature phone in a loud market is a different product than the one you'd build for a laptop. Build that one."
    />
  },
  {
    title: 'Meet them where they already are',
    lede: "The interface isn't a place you make the user come to. It's the channel they already live in.",
    children: <Field
      lucy="Image-first and conversation-driven, because a storefront photo did double duty: it held attention, and it gave us something to underwrite against. Onboarding couldn't be solo. Customers who tried alone abandoned. Trust transferred from the human field agent to Lucy, never the other way, so joint onboarding wasn't optional."
      luna="The chat interface is the product. The bet was that customers arrive through a conversation, not a loan application. A mascot with a face, a few taps, money movement built natively into the thread."
      rule="Pick the channel by where trust and habit already are, whether that's chat, WhatsApp, USSD, or SMS, not by what's elegant to build. And plan the human-to-agent handoff on purpose. The agent extends trust a person created. It rarely makes trust from cold."
    />
  },
  {
    title: 'Put localization in the architecture, not on top',
    lede: "Translation is not localization. A model fluent in English will produce plausible, irrelevant guidance in Nairobi, and a local will clock it in one line.",
    children: <Field
      lucy="Sheng, Kenyan market examples, and literacy-appropriate phrasing lived in the system layer, not in a post-processing pass. Customers scrolled past long messages and anchored on the one bolded phrase. The format that won: short, one idea, bolded, with depth available on request, not by default."
      rule="Put dialect, code-switching, and literacy level into the architecture. Constrain output length and shape to how the user actually reads. One idea per turn. Lead with the thing they'll act on."
    />
  },
  {
    title: 'Prompt for persona and authority, one idea at a time',
    lede: "Prompting an EM financial agent is mostly two decisions: who the agent is, and what it's allowed to say.",
    children: <Field
      lucy="The highest-leverage change across versions was tone, from teacher to advisor. The customers who fit best came to think, not to learn. The agent was also engineered not to cross into prescriptive lending advice, a line adversarial testing existed to police."
      luna="Every behavior was specified before it was built. We wrote the agent's actions as Gherkin / BDD scenarios, turned those into acceptance criteria, and kept one source-of-truth spec the whole team could read, test against, and hand to QA. Prompt engineering as a spec, not a vibe."
      rule="Fix the persona first. The high-fit user tells you which one. Bound the agent's authority anywhere a confident wrong answer causes harm. And write behaviors down as testable specs so prompt changes are reviewable instead of folklore."
    />
  },
  {
    title: 'Use RAG as the ground-truth floor',
    lede: "Without a retrieval floor, the model gives confident, wrong, locally implausible advice. RAG isn't for cleverness here. It's for not being wrong in a way the customer catches instantly.",
    children: <Field
      lucy="RAG was the ground-truth layer: product facts, financial specifics, market context. Pulled in, not hallucinated."
      rule="Ground anything factual or financial in retrieval. Treat the model as the reasoning and tone layer, and RAG as the floor it can't drop through."
    />
  },
  {
    title: 'Build the habit by paying out a win',
    lede: "Engagement in this segment is episodic, not habitual. People come when something is wrong, not on a schedule. You earn the habit by paying out a concrete win, fast.",
    children: <Field
      lucy="Trust got built through proof: a real result in days. Save KES 200, change a display, add one SKU. Redesigning onboarding with gamification and behavioral nudging lifted retention 30% on a 5,000-person cohort."
      luna="Missions, a weekly leaderboard, and XP unlocks were core to the MVP, not decoration. The progression built the savings habit faster than any UX pattern I'd tried, and Luna-as-a-character drove a real reaction that kept people coming back."
      rule="Don't design for the daily habit you wish existed. Design for the decision moment, then use light progression and a fast, concrete win to pull the next visit forward."
    />
  },
  {
    title: 'Build the eval stack from outcomes up',
    lede: "No benchmark covers these users. So you build an eval stack, strongest signal to weakest, and you trust each layer only as far as it has earned.",
    children: (
      <>
        <ol className="numbered">
          <li><strong>Real outcomes are ground truth.</strong> Did they repay, act, grow, return. Engaged Lucy users repaid at higher rates and reported real business outcomes. Outcome-linked evals are the most defensible thing you can build, and almost nobody can, because almost nobody is deployed against real users with money attached.</li>
          <li><strong>Local human raters calibrate everything else.</strong> Native speakers grading outputs are slow and expensive, so you use them to set the gold standard and to train the automated judge to match their taste, not for volume.</li>
          <li><strong>Behavioral telemetry is your continuous, literacy-free signal.</strong> Re-engagement, drop-off, where they bail to a human. It works for users who'll never fill out a survey.</li>
          <li><strong>Calibrated LLM judges give scale.</strong> Once the judge agrees with your humans, you can let it cover volume.</li>
          <li><strong>Synthetic users give coverage and red-teaming.</strong> At Luna we turned customer research into emulated personas, real failure modes included, and simulated full conversations against the agent to generate scored training data with known ground truth.</li>
        </ol>
        <p className="secondary">Outcomes, then local raters, then behavioral signal, then judges, then synthetic. Anyone selling you a single number for a last-mile agent is selling you a confident stranger.</p>
      </>
    )
  },
  {
    title: 'Calibrate the judge, then go read the transcripts',
    lede: "A generic judge mis-scores a Sheng coaching turn because it has no idea what good looks like there. So you make the judge local, and you keep a direct line to the raw thing.",
    children: <Field
      luna="We ran a Claude Opus LLM-as-judge scoring accuracy, tone, and cultural fit, which let us iterate without launching on real users every cycle. Scored conversations became training data, and a LoRA finetune got a smaller model closer to actual Tala user patterns over time."
      lucy={<>The finetuning loop in production cut hallucination from 20% to 8% and dropped training loss 40%. But the signal that moved decisions most wasn't a metric, it was the raw quotes. <em>"It kept scrolling and I didn't know where I left off." "Lucy trusted me, I had to repay."</em> Behavioral data plus the customer's own words beat any dashboard.</>}
      rule="Use rubric-driven judging with explicit local criteria: culturally appropriate, literacy-appropriate, one actionable step, stayed inside its authority. Measure judge-versus-human agreement so you know whether to trust it. Then never stop reading raw transcripts. The quote is where the insight is."
    />
  }
]

const META = [
  { k: 'Usage is episodic.',                 v: 'Design for the decision moment, not a daily habit.' },
  { k: "Trust transfers, it doesn't spawn.", v: "The agent extends a human's credibility. Plan the handoff." },
  { k: 'Constraints are the spec.',          v: 'Design for the feature phone in the loud market, not the average.' },
  { k: "Translation isn't localization.",    v: 'Every new market resets the assumptions about behavior, trust, and language. The architecture holds. The content doesn\'t.' },
  { k: 'Outcomes are the only eval that matters in the end.', v: 'Everything else is a proxy you calibrate against them.' }
]

export default function AgentPlaybook(){
  return (
    <CaseFrame
      tone="think"
      backLabel="Back"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      <CaseHero
        eyebrow="Playbook · Field notes"
        title="Shipping an AI agent for emerging-market customers"
        lede="Most of what you learn building an AI agent for a last-mile customer contradicts the defaults. This is the playbook I'd hand someone deploying their first one, built from shipping two: Lucy, a production credit-and-coaching agent for Kenyan micro-entrepreneurs at Tala, and Luna, an end-to-end universal-agent MVP now on the road to production."
        meta={[
          { k: 'Markets', v: 'Nairobi, Kenya · Tala customers across 8 EM markets' },
          { k: 'Agents',  v: 'Lucy (in production) · Luna (MVP → shipping)' },
          { k: 'Stack',   v: 'GPT-4 / Claude · RAG · LoRA · LLM-as-judge · self-custodial wallets' },
          { k: 'Role',    v: 'Built both end to end: product, prompts, evals, deployment' },
          { k: 'Author',  v: 'Naviya Kothari, Onchain Finance @ Tala' }
        ]}
      />

      <Stats items={HEADLINE_STATS} />

      <CaseSection kicker="The premise">
        <p>
          An agent that demos is not an agent that works. The gap between the two is where every emerging-market
          deployment lives, and almost none of the standard playbook survives the trip. Your user is on a feature
          phone in a noisy market, code-switching between two languages, with expensive data and thin literacy,
          making a decision where a wrong answer costs them money. Design for that user, not for the model's ceiling.
        </p>
        <p>
          I've now built two agents into that reality. Lucy went to real Kenyan micro-entrepreneurs with credit
          attached and got measured on repayment. Luna was built end to end in a hackathon as Tala's always-on
          finance friend, memory and missions and money movement included, and is now being resourced toward
          production. One taught me what holds up in the field. The other taught me how to stand the whole stack
          up fast. The lessons below are the intersection.
        </p>
        <Pull>Design for the feature phone in the loud market, not the average. That one constraint reshapes the whole product.</Pull>
      </CaseSection>

      <CaseSection kicker="The playbook" title="Eight things that held across both agents">
        <NumberedList items={LESSONS} />
        <Reactions id="agent-playbook" prompt="Which of these would you have learned the hard way too?" />
      </CaseSection>

      <CaseSection kicker="What transfers" title="The meta-lessons, across two very different agents" tone="summary">
        <ul className="bullets">
          {META.map(m => (
            <li key={m.k}><strong>{m.k}</strong> {m.v}</li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection kicker="Why it's the FDE skill set">
        <p>
          A forward-deployed engineer does three things: builds with the model inside a real customer's constraints,
          gets it to actually work in production, and hands the method to the team so it outlives them. That's this
          document. Lucy is the proof I can take an agent end to end into the hardest deployment conditions there are
          and get measured on outcomes. Luna is the proof I can architect and stand up the whole stack fast: memory,
          money movement, evals, finetuning, BDD specs. The playbook itself is the proof I can turn that into
          something a team can run without me.
        </p>
        <p>
          I've done it twice, in conditions almost no eval covers, and written down how. That's the job.
        </p>
        <ReflectionPrompt id="agent-playbook" prompt="Building your first agent for a hard market? Tell me what you're stuck on." />
        <ReadComplete id="agent-playbook" reward={5} />
      </CaseSection>
    </CaseFrame>
  )
}
