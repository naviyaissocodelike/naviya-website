# naviya-website

This repository contains a small personal website and a Vite + React prototype for a redesigned "Puzzle Vault" landing experience.

Quick start (Vite)

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the Vite entry page at the URL shown in the terminal (default http://localhost:5173). The Vite entry file is `index.vite.html`.

Notes
- A zero-build UMD React prototype still exists at `index.html` (uses `js/app.js` and `css/app.css`) for fast experiments.
- The Vite React app source lives under `src/` and uses Framer Motion for animations (`Coin` flip demo).

Troubleshooting
- If you see an error about `Cannot find module '@vitejs/plugin-react'`, install dev dependencies (or run `npm install` from the repo root). We added `@vitejs/plugin-react` to `devDependencies` in `package.json` — this plugin must be installed before `vite` can load the config.

# naviya-website


