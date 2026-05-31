# Shipping an agentic AI for emerging-market customers

### A field playbook, built from two agents

*Draft. Voice modeled on the Lucy case study. Luna details pulled from the hackathon deck. Edit freely, then I'll convert it to a site page.*

---

**Eyebrow:** Playbook · Field notes
**Lede:** Most of what you learn building an AI agent for a last-mile customer contradicts the defaults. This is the playbook I'd hand someone deploying their first one. It's built from shipping two: Lucy, a production credit-and-coaching agent for Kenyan micro-entrepreneurs at Tala, and Luna, an end-to-end universal-agent MVP built in a hackathon and now on the road to production.

**Meta**

| | |
|---|---|
| Markets | Nairobi, Kenya · Tala customer base across 8 EM markets |
| Agents | Lucy (in production) · Luna (MVP → shipping) |
| Stack | GPT-4 / Claude · RAG · LoRA · LLM-as-judge · self-custodial wallets |
| Role | Built both end to end. Product, prompts, evals, deployment. |

---

## The premise

An agent that demos is not an agent that works. The gap between the two is where every emerging-market deployment lives, and almost none of the standard playbook survives the trip. Your user is on a feature phone in a noisy market, code-switching between two languages, with expensive data and thin literacy, making a decision where a wrong answer costs them money. Design for that user, not for the model's ceiling.

I've now built two agents into that reality. Lucy went to real Kenyan micro-entrepreneurs with credit attached and got measured on repayment. Luna was built end to end in a hackathon as Tala's "always-on finance friend," memory and missions and money movement included, and is now being resourced toward production. One taught me what holds up in the field. The other taught me how to stand the whole stack up fast. The lessons below are the intersection.

---

## 0. Start from the constraint, not the capability

The first instinct is to design around what the model can do. Wrong order. Design around what the user's world allows, then see how much capability survives.

- **Lucy:** voice input was unusable in open-air markets. Ambient noise killed it. Not an edge case, the default. Designs that assume reliable internet, a mid-range phone, or a quiet room fail quietly, not loudly.
- **Best practice:** write the constraints down before the features. Phone tier, bandwidth, literacy, language, ambient conditions, trust starting point. The product that works on a feature phone in a loud market is a different product than the one you'd design for a laptop. Build that one.

---

## 1. The front end: meet them where they already are

The interface is not a place you make the user come to. It's the channel they already live in.

- **Lucy:** image-first and conversation-driven, because a storefront photo did double duty, novelty that held attention and a signal we could underwrite against. Onboarding could not be solo. Customers who tried alone abandoned. Trust transferred from the human EXP agent to Lucy, never the other way, so joint onboarding wasn't optional.
- **Luna:** the chat interface *is* the product. The bet was that customers arrive through a conversation, not a loan application. A mascot with a face, a few taps, money movement built natively into the thread.
- **Best practice:** pick the channel by where trust and habit already are (chat, WhatsApp, USSD, SMS), not by what's elegant to build. And plan the human-to-agent handoff explicitly. The agent extends trust that a person created. It rarely manufactures trust cold.

---

## 2. Simplify the language: localization in the architecture, not on top

Translation is not localization. A model fluent in English will produce plausible, irrelevant guidance in Nairobi and a local will clock it in one line.

- **Lucy:** Sheng, Kenyan market examples, and literacy-appropriate phrasing lived in the system layer, not in a post-processing pass. Customers scrolled past long messages and anchored only on the bolded phrase. The output format that won: short, one idea, bolded, with depth available on request, not by default.
- **Best practice:** put dialect, code-switching, and literacy level into the architecture. Constrain output length and shape to how the user actually reads. One idea per turn. Lead with the thing they'll act on.

---

## 3. Prompt engineering: persona, authority, and one idea at a time

Prompting an EM financial agent is mostly two decisions: who the agent is, and what it's allowed to say.

- **Lucy:** the highest-leverage change across versions was tone, from teacher to advisor. High-fit customers came to *think*, not to *learn*. The agent was also engineered not to cross into prescriptive lending advice, a line adversarial testing was built to police.
- **Luna:** every behavior was specified before it was built. We wrote the agent's actions as Gherkin / BDD scenarios, turned those into acceptance criteria, and kept one source-of-truth spec the whole team could read, test against, and hand to QA. Prompt engineering as a spec, not a vibe.
- **Best practice:** fix the persona first, the high-fit user tells you which one. Bound the agent's authority explicitly, especially anywhere a confident wrong answer causes harm. And write behaviors down as testable specs so prompt changes are reviewable, not folklore.

---

## 4. RAG for ground truth

Without a retrieval floor, the model gives confident, wrong, locally-implausible advice. RAG isn't for cleverness here. It's for not being wrong in a way the customer catches instantly.

- **Lucy:** RAG was the ground-truth layer. Product facts, financial specifics, market context. Pulled in, not hallucinated.
- **Best practice:** ground anything factual or financial in retrieval. Treat the model as the reasoning and tone layer, and RAG as the floor it can't drop through.

---

## 5. Gamification: build the habit by delivering a win

Engagement in this segment is episodic, not habitual. People come when something is wrong, not on a schedule. You earn the habit by paying out a concrete win fast.

- **Lucy:** trust got built through proof, a real result in days, save KES 200, change a display, add one SKU. Redesigning onboarding with gamification and behavioral nudging lifted retention 30% (N=5K).
- **Luna:** missions, a weekly leaderboard, and XP unlocks were core to the MVP, not decoration. Gamified progression compressed financial habit formation faster than any UX pattern I'd tried, and Luna-as-a-character drove a genuine "wow" that kept people coming back.
- **Best practice:** don't design for daily habit you wish existed. Design for the decision moment, then use light progression and a fast, concrete win to pull the next visit forward.

---

## 6. Evaluations: build the stack from outcomes up

No benchmark covers these users. So you build an eval stack, strongest signal to weakest, and you trust each layer only as far as it's earned.

1. **Real outcomes are ground truth.** Did they repay, act, grow, return. At Lucy, engaged users repaid at higher rates and reported real business outcomes. Outcome-linked evals are the most defensible thing you can build, and almost nobody can, because almost nobody is deployed against real users with money attached.
2. **Local human raters calibrate everything else.** Native speakers grading outputs are slow and expensive, so you use them to set the gold standard and to train the automated judge to match their taste, not for volume.
3. **Behavioral telemetry is your continuous, literacy-free signal.** Re-engagement, drop-off, where they bail to a human. It works for users who'll never fill out a survey.
4. **Calibrated LLM judges give scale.** More below.
5. **Synthetic users give coverage and red-teaming.** At Luna we turned customer research into emulated personas, real failure modes included, and simulated full conversations against the agent to generate scored training data with known ground truth. Synthetic for breadth, humans for truth, and re-anchor constantly because synthetic users drift.

- **Best practice:** outcomes, then local raters, then behavioral signal, then judges, then synthetic. Anyone selling you a single number for a last-mile agent is selling you a confident stranger.

---

## 7. Judging and raw feedback: calibrate the judge, then listen to the field

A generic judge mis-scores a Sheng coaching turn because it has no idea what good looks like there. So you make the judge local, and you keep a direct line to the raw thing.

- **Luna:** we ran a Claude Opus LLM-as-judge scoring accuracy, tone, and cultural fit, which let us iterate without launching on real users every cycle. Scored conversations then became training data, LoRA fine-tuning so a smaller model got sharper on actual Tala user patterns over time.
- **Lucy:** the finetuning loop in production cut hallucination from 20% to 8% and dropped training loss 40%. And the signal that moved decisions most wasn't a metric, it was raw quotes. *"It kept scrolling and I didn't know where I left off." "Lucy trusted me, I had to repay."* Behavioral data plus the customer's own words beat any dashboard.
- **Best practice:** rubric-driven judging with explicit local criteria (culturally appropriate, literacy-appropriate, one actionable step, stayed inside its authority). Measure judge-versus-human agreement so you know whether to trust it. Then never stop reading raw transcripts. The quote is where the insight is.

---

## What transfers across markets and customers

The meta-lessons, the ones that held across two very different agents:

- **Usage is episodic.** Design for the decision moment, not a daily habit.
- **Trust transfers, it doesn't spawn.** The agent extends a human's credibility. Plan the handoff.
- **Constraints are the spec.** Design for the feature phone in the loud market, not the average.
- **Translation isn't localization.** Every new market resets the assumptions about behavior, trust, and language. The architecture holds. The content doesn't.
- **Outcomes are the only eval that matters in the end.** Everything else is a proxy you calibrate against them.

---

## Why this is the FDE skill set

A forward-deployed engineer does three things: builds with the model inside a real customer's constraints, gets it to actually work in production, and hands the method to the team so it outlives them. That's this document. Lucy is the proof I can take an agent end to end into the hardest deployment conditions there are and get measured on outcomes. Luna is the proof I can architect and stand up the whole stack, memory, money movement, evals, fine-tuning, BDD specs, fast. The playbook itself is the proof I can turn that into something a team can run without me.

I've done it twice, in conditions almost no eval covers, and written down how. That's the job.

---

*[FILL once confirmed: Luna team credit if you want it named (Naviya, Kenne, Malia, Piyush). Any Luna metrics you're comfortable sharing. Lucy V3 subscription thesis if you want to extend the "where this goes" thread.]*
