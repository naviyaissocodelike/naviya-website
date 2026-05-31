# naviya-website

Source for [naviya.xyz](https://naviya.xyz) — a personal site built to feel like exploring a mind, not reading a resume.

Sections: About · Think (essays) · Build (code, products, communities) · Rogue Thoughts · Play (riddles, coin arcade, activity tiles).

Built with Vite + React + React Router. No component library, no CMS — everything is hand-rolled.

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Project layout

```
src/
├── App.jsx                     Routes — home + case study pages
├── styles.css                  All styles (single file, no CSS-in-JS)
├── components/
│   ├── VaultHome.jsx           Main page — all sections, coin arcade, riddle vault
│   └── CaseStudy.jsx           Case study page template
├── projects/                   Individual project pages (Lucy, Luna, etc.)
└── data/
    └── riddles.js              Riddle bank for the arcade
```

## Adding content

**New essay** — add an entry to the `ESSAYS` array in `VaultHome.jsx`.

**New repo tile** — add an entry to the `REPOS` array in `VaultHome.jsx` with `name`, `lang`, `problem`, `why`, `learned`, and `href`.

**New case study** — create a component in `src/projects/`, add a route in `App.jsx`, and set `onSite: true` + `href: '/your-route'` in the essay or repo entry.

**New riddle** — add to `src/data/riddles.js` with `q` (question), `a` (answer), and `hint`.
