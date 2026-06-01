import React from 'react'
import { CaseFrame, CaseHero, Pull, Reactions, ReflectionPrompt, ReadComplete } from '../components/CaseStudy'

const DIVE_LESSONS = [
  {
    depth: '0ft',
    title: 'Calm is a trained response, not a personality trait.',
    body:  "I almost didn't make it to the open water. Mask clearing broke me for two days in the pool — flooded mask, water up my nose, eyes stinging. I inhaled a gallon of salt water. I was scared I'd start resenting the water, and that felt like a real loss.",
    apply: "What changed wasn't technique. I stopped debating capability and started training the nervous system. Deep inhale. Deep exhale. Anywhere I feel 'not ready' gets the same playbook now."
  },
  {
    depth: '20ft',
    title: 'Your body is an instrument, not a vessel.',
    body:  "Lungs as buoyancy. Posture as motion. Peripheral vision as equilibrium. The math of diving is mostly your body cooperating with the water — angle, breath, awareness.",
    apply: "I run my life almost entirely cognitively. That leaves performance on the table. The body has signal the brain can't reach."
  },
  {
    depth: '60ft',
    title: 'Awe resets your standards permanently.',
    body:  "Hovering at 60 feet, an orange fish cutting past, a washed-out blue that doesn't exist in any Pantone catalog — my mind went genuinely blank. The way you feel reading something with soul. Untouched, original, vibrant.",
    apply: "I cannot build a life that excludes awe and expect satisfaction. It doesn't go away — it just gets buried."
  },
  {
    depth: '80ft',
    title: 'Constraints sharpen, freedom dilutes.',
    body:  "Limited air. Limited motion. Limited visibility. And I became sharper, not duller. Constraints preserve the wonder — you never get numb to a thing you can't stay inside of.",
    apply: "My current life probably has too much optionality. Diluted intensity. The next move should narrow on purpose, not widen."
  },
  {
    depth: '100ft',
    title: "I don't need to be the protagonist to feel fulfilled.",
    body:  "Standing at 100 feet, reefs in front of me, I thought of the 14ers I'd climbed — same valley shape, but this one had color and movement and owed me nothing. I wasn't the protagonist of the story. I was a spectator. And that, somehow, was more than enough.",
    apply: "This directly contradicts how I've been building. If I ignore it, I'll build an impressive but hollow life. I won't ignore it."
  }
]

export default function LivingAquatic(){
  return (
    <CaseFrame
      tone="ocean"
      backLabel="Back to surface"
      footLink={{ to: '/#think', label: 'More writing →' }}
    >
      {/* Decorative bubbles rising in the background */}
      <div className="bubbles" aria-hidden>
        <span style={{ left: '8%',  animationDelay: '0s'   }} />
        <span style={{ left: '20%', animationDelay: '3.5s' }} />
        <span style={{ left: '40%', animationDelay: '1.2s' }} />
        <span style={{ left: '62%', animationDelay: '4.8s' }} />
        <span style={{ left: '78%', animationDelay: '2.1s' }} />
        <span style={{ left: '92%', animationDelay: '5.5s' }} />
      </div>

      <CaseHero
        eyebrow="Field notes · Underwater"
        title="Living aquatic."
        lede="Getting scuba-certified in Honduras. The first time the surface closed above me, and the five things I came back with."
        meta={[
          { k: 'Where',     v: 'Honduras → Belize' },
          { k: 'When',      v: '2025' },
          { k: 'Max depth', v: '100 ft' },
          { k: 'Cert',      v: 'PADI Open Water' },
          { k: 'Came back', v: 'With a new equilibrium' }
        ]}
      />

      <section className="case-section aq-section">
        <h2 className="aq-h2">on the surface closing</h2>
        <p className="aq-lead">
          There's no way to prepare for the moment the surface closes above you and the world goes
          quiet. Not silent — there's a hum down there, a low ambient resonance — but quiet in
          the way that matters. All the noise you carry just… stops mattering.
        </p>
        <p>
          My mind organized what I came back with into two things: the sheer wonder of being underwater, and
          what it asked of me personally. Both deserve their own treatment.
        </p>
      </section>

      <SectionDivider />

      <section className="case-section aq-section">
        <h2 className="aq-h2">on the water itself</h2>
        <p>
          The first thing that stunned me was the <strong>gear</strong>. Someone — many someones —
          had to sacrifice themselves in the pursuit of answers in the deep blue to make this possible.
          The BCD, the regulator, the tank engineered to hold pressure at 150 feet. I am standing on the
          shoulders of giants every time I descend.
        </p>
        <p>
          And then there's the physics of your own body. Lungs as balloons. Angle as navigation. Peripheral
          vision as equilibrium. You become an instrument, not just a passenger.
        </p>
        <p>
          The closest analogy I have is <strong>astronaut</strong>. Floating through water has this
          delayed quality to it — nothing responds the way it does on land — and suddenly you understand
          why people become obsessed.
        </p>
        <Pull>
          You're hovering at 100 feet, an orange fish cuts past you, the background is this washed-out blue
          that doesn't exist in any Pantone catalog, and your mind goes genuinely blank. Not in a dissociative
          way. In the way you feel reading something with soul.
        </Pull>
        <p>
          What I love most: <strong>constraints preserve the wonder</strong>. You can't stay forever. Air is
          finite. That limitation means every dive retains its full weight. You never get numb to it.
        </p>
        <p>
          And water is generous. It keeps teaching. You never step into the same current twice. A sea cucumber
          retreats into a rock. A remora attaches itself to a turtle for protection. Things happen to you and
          you simply receive them. No directing. No curating. Just presence.
        </p>
        <Reactions id="aquatic-water" prompt="Felt this somewhere yourself?" />
      </section>

      <SectionDivider />

      <section className="case-section aq-section">
        <h2 className="aq-h2">on what it asked of me</h2>
        <p>
          I almost didn't make it to the open water. Mask clearing — flooding your mask completely, water up
          your nose, eyes stinging, and staying calm enough to clear it — broke me for two days in the pool.
          I inhaled a gallon of salt water. I felt demoralized. I was scared I'd start resenting the water,
          which felt like a real loss.
        </p>
        <p>
          Forty-five Reddit threads and one extended ChatGPT conversation later, I cracked it. What changed
          wasn't technique. It was that I stopped debating whether I could do it and just trained the nervous
          system response. <strong>Deep inhale. Deep exhale.</strong> You don't need your nose to breathe. Your
          mouth carries you forward.
        </p>
        <Pull>
          Calm isn't a personality trait I either have or don't.
          It's a trained response. I proved that to myself in a pool in Honduras.
        </Pull>
        <p>
          The lizard brain is 90% of the problem underwater. You can't think your way through water up your
          nose or suddenly blurry vision. You can only breathe through it. And once you learn that — really
          learn it, in your body, not just your head — you start to apply it everywhere.
        </p>
      </section>

      <SectionDivider />

      <section className="case-section aq-section aq-log-section">
        <h2 className="aq-h2">five dives, five things</h2>
        <p className="aq-sub">
          The lessons sorted themselves into a kind of dive log — each one anchored to the depth I was at
          when it landed.
        </p>
        <DiveLog entries={DIVE_LESSONS} />
      </section>

      <SectionDivider />

      <section className="case-section aq-section">
        <h2 className="aq-h2">what I'm doing with this</h2>
        <p>
          I want to be concrete. None of this matters if it doesn't change the next quarter.
        </p>
        <div className="aq-protocols">
          <Protocol n="01" title="An awe pipeline, scheduled">
            Not "travel more." Designed as a system. One nature-intensive experience every 6–8 weeks — diving,
            mountains, something immersive. One micro-dose weekly — long swim, sensory deprivation, silence
            without a phone. If it isn't on a calendar, it dies.
          </Protocol>
          <Protocol n="02" title="Constraint as the career filter">
            The question isn't big company vs. family office vs. entrepreneurship. The question is which
            path preserves intensity and presence. I don't need freedom. I need intentional constraint and
            ownership.
          </Protocol>
          <Protocol n="03" title="A panic-to-control protocol">
            Physiological reset (breathe). Narrow scope (what matters in the next ten minutes). Act, don't
            analyze. Underwater, it kept me alive. Above water, it works on career decisions, social anxiety,
            high-stakes moments. Same playbook.
          </Protocol>
          <Protocol n="04" title="Rebalance the identity stack">
            Operator and investor have been 80% of who I am. Explorer and experiencer have been 20%. That
            ratio needs to shift. Not to 50/50 — maybe 65/35. Enough to stay sane and sharp.
          </Protocol>
        </div>
      </section>

      <SectionDivider />

      <section className="case-section aq-section aq-close">
        <p className="aq-close-line">
          Water holds the great unknown. As with space, it has creatures that excite and induce fears beyond
          the helm of our imaginations. But it's also where we come from. The answers to ourselves — and
          beyond — may live there.
        </p>
        <p className="aq-close-line">
          I don't know yet what I'll do with that.
        </p>
        <p className="aq-close-line aq-close-final">
          But I know I'll go back down. And I know what I'll be looking for.
        </p>

        <ReflectionPrompt id="aquatic" prompt="When did you last feel something reset your standards?" />
        <ReadComplete id="aquatic" reward={5} />
      </section>
    </CaseFrame>
  )
}

/* ---------- inline components ---------- */

function SectionDivider(){
  return (
    <div className="aq-divider" aria-hidden>
      <svg width="100%" height="20" viewBox="0 0 800 20" preserveAspectRatio="none">
        <path
          d="M0,10 Q100,0 200,10 T400,10 T600,10 T800,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function DiveLog({ entries }){
  return (
    <ol className="dive-log">
      {entries.map((e, i) => (
        <li key={i} className="dive-entry">
          <div className="dive-marker">
            <span className="dive-no">{String(i + 1).padStart(2, '0')}</span>
            <span className="dive-depth">{e.depth}</span>
          </div>
          <div className="dive-body">
            <h3 className="dive-title">{e.title}</h3>
            <p className="dive-text">{e.body}</p>
            <p className="dive-apply"><span className="dive-apply-label">What it means →</span> {e.apply}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Protocol({ n, title, children }){
  return (
    <div className="aq-protocol">
      <span className="aq-protocol-num">{n}</span>
      <div>
        <h3 className="aq-protocol-title">{title}</h3>
        <p className="aq-protocol-body">{children}</p>
      </div>
    </div>
  )
}
