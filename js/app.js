/* Simple React SPA using UMD builds loaded in index.html
   Uses React 18 UMD (React, ReactDOM available on window)
*/
(function () {
  console.log('[app.js] loaded');
  const e = React.createElement;
  // Small helper to create elements
  function Header() {
    return e('header', { className: 'header' },
      e('div', { className: 'brand' },
        e('div', { style: { width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 } }, 'N'),
        e('h1', null, 'Naviya')
      ),
      e('nav', { className: 'nav' },
        e('a', { href: '#vault' }, 'Vault'),
        e('a', { href: 'pages/about.html' }, 'About'),
        e('a', { href: 'pages/thoughts.html' }, 'Thoughts')
      )
    );
  }

  // VaultHome and sections
  function VaultHome() {
    const [unlocked, setUnlocked] = React.useState({});
    const [activePanel, setActivePanel] = React.useState(null);
    const [puzzleState, setPuzzleState] = React.useState({ input: '', unlocked: false });

    const icons = [
      { id: 'about', label: 'Core', hint: "What's under the surface?", title: 'About' },
      { id: 'build', label: 'Build', hint: 'Not your typical angel', title: 'Build' },
      { id: 'thoughts', label: 'Think', hint: 'Money is a means, not the end', title: 'Thoughts' },
      { id: 'puzzle', label: '?', hint: 'Try me', title: 'Puzzle' }
    ];

    // secret riddle/answer
    const secret = 'entropy';
    const riddle = "I increase the more you give me away. What am I?";

    function toggleUnlock(id) {
      setUnlocked(prev => ({ ...prev, [id]: !prev[id] }));
      setActivePanel(id);
    }

    function submitPuzzle() {
      if (puzzleState.input.trim().toLowerCase() === secret) {
        setPuzzleState({ ...puzzleState, unlocked: true });
        setUnlocked(prev => ({ ...prev, puzzle: true }));
      } else {
        alert('Try again');
      }
    }

    return e('div', { className: 'app' },
      e(Header, {}),
      e('div', { className: 'vault' },
        e('div', { className: 'vault-left' },
          e('h2', { className: 'hero-title' }, 'Puzzle Vault'),
          e('p', { className: 'hero-sub' }, 'A minimal vault — click icons to unlock sections.'),

          e('div', { className: 'icons' }, icons.map(ic => e('div', {
            key: ic.id, className: 'icon', role: 'button', tabIndex: 0,
            onClick: () => toggleUnlock(ic.id), onKeyDown: (e) => { if (e.key === 'Enter') toggleUnlock(ic.id); }
          },
            e('div', { className: 'hint' }, ic.hint),
            e('div', { style: { fontSize: 28, fontWeight: 700 } }, ic.label),
            e('div', { className: 'icon-label' }, ic.title)
          ))),

          activePanel ? e('div', { className: 'panel' },
            renderPanel(activePanel, { unlocked, puzzleState, setPuzzleState, submitPuzzle })
          ) : null
        ),

        e('div', { className: 'vault-right' },
          e('div', { className: 'vault-box' },
            e('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
              e('div', { className: 'avatar', role: 'img', 'aria-label': 'Naviya avatar' }, 'N'),
              e('div', null, e('strong', null, 'Naviya'), e('div', { className: 'muted' }, 'AI & Crypto Product'))
            ),
            e('div', { style: { marginTop: 12 } },
              e('p', null, 'Email: ', e('a', { href: 'mailto:naviya@districtangels.com' }, 'naviya@districtangels.com')),
              e('p', null, 'Social: ', e('a', { href: '#', onClick: (e) => e.preventDefault() }, 'twitter'), ' · ', e('a', { href: '#', onClick: (e) => e.preventDefault() }, 'linkedin'))
            )
          )
        )
      )
    );
  }

  function renderPanel(name, ctx) {
    switch (name) {
      case 'about':
        return e(AboutPanel, {});
      case 'build':
        return e(BuildPanel, {});
      case 'thoughts':
        return e(ThoughtsPanel, {});
      case 'puzzle':
        return e(PuzzlePanel, { puzzleState: ctx.puzzleState, setPuzzleState: ctx.setPuzzleState, submitPuzzle: ctx.submitPuzzle });
      default:
        return null;
    }
  }

  function AboutPanel() {
    return e('div', null,
      e('h3', null, 'The Core Layer'),
      e('div', { className: 'panel' },
        e('p', null, e('strong', null, 'What I build:'), ' Money systems, capital bridges, behavioral tools'),
        e('p', null, e('strong', null, 'How I move:'), ' Curious, rigorous, future-facing'),
        e('p', null, e('strong', null, 'What I value:'), ' Agency > access > autonomy'),
        e('p', null, e('button', { onClick: () => alert('"Agency is freedom to choose." — sci-fi quote placeholder') }, 'agency'))
      )
    );
  }

  function BuildPanel() {
    const projects = [
      { title: 'Tala — AI / Crypto rails', blurb: 'Lending logic, Lucy, crypto pilots', href: 'pages/tala.html' },
      { title: 'District Angels', blurb: 'Investor collective & fellowship', href: '#' },
      { title: 'Fellowship', blurb: 'Venture fellowship and deal rooms', href: '#' }
    ];
    return e('div', null,
      e('h3', null, 'Under the Hood'),
      e('div', { style: { display: 'grid', gap: 12 } }, projects.map((p, i) => e('div', { key: i, className: 'panel' },
        e('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          e('div', { className: 'coin', onClick: () => alert(`Flip coin for ${p.title}`) }, '🪙'),
          e('div', null, e('strong', null, p.title), e('div', { className: 'muted' }, p.blurb))
        )
      )))
    );
  }

  function ThoughtsPanel() {
    const tags = ['Money', 'Systems', 'Culture', 'Optionality', 'Failure', 'Maslow', 'Sci-fi'];
    const [preview, setPreview] = React.useState(null);
    return e('div', null,
      e('h3', null, 'Mental Models'),
      e('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } }, tags.map((t) => e('button', { key: t, className: 'icon-label', onMouseEnter: () => setPreview(`Preview for ${t}`), onMouseLeave: () => setPreview(null) }, t))),
      preview ? e('div', { className: 'panel', style: { marginTop: 12 } }, preview) : null,
      e('div', { style: { marginTop: 12 } }, e('button', { onClick: () => alert('Vending a random thought: Keep small experiments cheap.') }, 'Drop a coin (vending)'))
    );
  }

  function PuzzlePanel({ puzzleState, setPuzzleState, submitPuzzle }) {
    return e('div', null,
      e('h3', null, 'Puzzle Vault'),
      e('div', { className: 'panel' },
        e('p', null, riddle),
        e('input', { value: puzzleState.input, onChange: (e) => setPuzzleState({ ...puzzleState, input: e.target.value }), placeholder: 'Your answer' }),
        e('div', { style: { marginTop: 8 } }, e('button', { onClick: submitPuzzle, className: 'btn btn-primary' }, 'Submit')),
        puzzleState.unlocked ? e('div', { style: { marginTop: 12 } }, e('strong', null, 'Unlocked!'), e('p', null, 'Secret: This post is hidden — congrats.')) : null
      )
    );
  }

  function App() {
    return e(VaultHome);
  }

  // Inject small animation keyframes used by rays
  (function injectKeyframes() {
    if (document.getElementById('app-keyframes')) return;
    const s = document.createElement('style');
    s.id = 'app-keyframes';
    s.textContent = `@keyframes ray-float { 0% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(2deg) translateY(-6px);} 100% { transform: rotate(-2deg) translateY(0);} }`;
    document.head.appendChild(s);
  })();

  // Mount the app
  try {
    ReactDOM.createRoot(document.getElementById('root')).render(e(App));
  } catch (err) {
    console.error('Mount failed', err);
  }

})();
