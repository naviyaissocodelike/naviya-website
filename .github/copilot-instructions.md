<!-- Project-specific Copilot/AI instructions for contributors and automated agents -->
# Copilot instructions — naviya-website

This is a small, static personal website (plain HTML/CSS/JS). The guidance below helps an AI coding agent be immediately productive when making edits, adding pages, or fixing styling/UX details.

Key files
- `index.html` — homepage list of content links. Uses `.container` and `.content-list` structure.
- `css/style.css` — single stylesheet. Look here for global variables (CSS custom properties) and page-specific classes such as `.page-container`, `.page-header`, `.page-content`, `.highlight-box`.
- `js/script.js` — site interactions (typewriter, animated bullets, cursor trail, greeting, loading animation). Be conservative: keep behavior performant and avoid extraneous DOM changes.
- `pages/*.html` — simple page template. Each page links back to `../index.html` and reuses `page-container` semantics.

Big picture & conventions
- This is a static, single-origin website — there are no build steps, frameworks, or server code. Changes are HTML/CSS/vanilla JS edits only.
- Pages follow a repeated template: include `../css/style.css`, a `.page-container` wrapping a `.page-header` (contains a `.back-link` to `index.html`) and `.page-content`. When adding pages, copy an existing file in `pages/` and update the title and content.
- Styling aims for minimalism: prefer using existing CSS custom properties (`--accent-color`, `--text-color`, etc.) rather than adding many new colors. Reuse `.highlight-box`, `.substack-embed`, and `.back-link` for consistent UI.
- JS should avoid heavy allocations or leaking DOM nodes. The site expects simple progressive enhancement: features must not break basic navigation when JS is disabled.

Developer workflows
- Local preview: open `index.html` (or any page) in the browser. No build or npm scripts required.
- For quick CSS/JS iterations, use the browser DevTools and refresh the file. If experimenting with new pages, add them under `pages/` and link from `index.html`.

Patterns & examples
- Add new list entries on the homepage using:
  - `<li><a href="pages/your-page.html">Short description</a></li>`
  - For sub-links use the `.sub-list` structure as in `index.html`.
- Page template example: copy `pages/nomadic-2022.html` or `pages/tala.html`. Keep relative asset paths (`../css/style.css`).
- When changing accent color, prefer updating `:root` or using the JS helper in `js/script.js` which updates `--accent-color`.

Edge cases and guardrails for AI edits
- Do not remove the `link` tags to Google Fonts; design assumes Inter is available.
- Avoid adding external JS libraries. If an enhancement requires a library, explain the reason and add it only after approval.
- Keep `index.html` markup semantics intact — screen readers and simple browsers should still see the list and links.
- Performance: keep heavy animations optional (tied to user interaction or disabled for small screens). See `js/script.js` for current animation approach.

When to open a PR vs. small edits
- Small copy/style/typo fixes: edit files directly and open a PR with a short description.
- Structural changes (new JS behavior, external deps, major layout changes): include a short rationale and screenshots or before/after notes in the PR.

Files to reference when troubleshooting
- `js/script.js` — interactive features and potential sources of layout jank
- `css/style.css` — global variables, responsive breakpoints, and page component styles
- `pages/*.html` — canonical page structure and examples

If anything in these instructions is unclear or incomplete, ask for the specific area (styling, JS, page template, or workflow) and I'll provide examples or clarifications.
