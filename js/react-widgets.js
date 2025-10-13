// Lightweight React widgets loaded via CDN; safe for a static site.
(function () {
    // Load React and ReactDOM from CDN if not present
    function loadScript(src, cb) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = cb;
        s.async = false;
        document.head.appendChild(s);
    }

    function ensureReact(next) {
        if (window.React && window.ReactDOM) return next();
        loadScript('https://unpkg.com/react@18/umd/react.production.min.js', function () {
            loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', next);
        });
    }

    ensureReact(function () {
        const e = React.createElement;

        // Simple bouncing avatar component (CSS only)
        function BouncyAvatar() {
            const style = {
                width: '72px',
                height: '72px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                display: 'inline-block',
                boxShadow: '0 6px 18px rgba(37,99,235,0.18)',
                animation: 'bounce 2s ease-in-out infinite'
            };

            // inject keyframes once
            if (!document.getElementById('bouncy-avatar-style')) {
                const s = document.createElement('style');
                s.id = 'bouncy-avatar-style';
                s.textContent = `@keyframes bounce { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }`;
                document.head.appendChild(s);
            }

            return e('div', { style: style, title: '👋 Naviya' });
        }

        // Mini Lucy demo - no network calls. Accepts a prompt and returns canned responses.
        function LucyMini() {
            const [prompt, setPrompt] = React.useState('');
            const [reply, setReply] = React.useState(null);

            function onSubmit(e) {
                e.preventDefault();
                const p = prompt.trim().toLowerCase();
                if (!p) return setReply('Try asking: "How should I price a small loan?"');

                // simple canned heuristics
                if (p.includes('loan') || p.includes('underwrite')) {
                    setReply('Start with ability to pay, then add behaviour signals and cross-check with local cashflow proxies. Keep thresholds conservative for pilots.');
                } else if (p.includes('crypto') || p.includes('remittance')) {
                    setReply('Consider stablecoin rails for settlement and on/off ramps with local partners. Watch regulatory and UX friction closely.');
                } else if (p.includes('coach') || p.includes('lucy')) {
                    setReply('Lucy is helpful when coached with concrete goals and example outcomes. Start with 3 short prompts and iterate.');
                } else {
                    setReply('Interesting! That sounds like a great thread to expand into a short essay.');
                }
            }

            return e('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
                e(BouncyAvatar, {}),
                e('div', { style: { flex: 1 } },
                    e('form', { onSubmit: onSubmit },
                        e('input', {
                            value: prompt,
                            onChange: (ev) => setPrompt(ev.target.value),
                            placeholder: 'Ask Lucy a product question (example: "loan pricing")',
                            style: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb' }
                        }),
                        e('div', { style: { marginTop: 8, display: 'flex', gap: 8 } },
                            e('button', { type: 'submit', style: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff' } }, 'Ask Lucy'),
                            e('button', { type: 'button', onClick: () => { setPrompt(''); setReply(null); }, style: { padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' } }, 'Clear')
                        )
                    ),
                    reply ? e('div', { style: { marginTop: 10, padding: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 } }, reply) : null
                )
            );
        }

        // Mount widgets into specific roots if present
        try {
            const roots = [
                { id: 'about-widget-root', comp: LucyMini },
                { id: 'thoughts-widget-root', comp: LucyMini },
                { id: 'contact-widget-root', comp: LucyMini }
            ];

            roots.forEach(r => {
                const el = document.getElementById(r.id);
                if (el && !el.hasChildNodes()) {
                    ReactDOM.createRoot(el).render(React.createElement(r.comp));
                }
            });
        } catch (err) {
            // If anything fails, bail silently — site should still function without widgets
            console.warn('react-widgets failed to mount:', err);
        }
    });
})();
