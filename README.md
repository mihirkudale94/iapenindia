# IAPEN India

Public website and member portal for the Indian Association for Parenteral and
Enteral Nutrition. React 18 single-page app built with Vite.

## Getting started

Requires Node.js 20.19 or newer.

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env` and fill in the Web3Forms key before testing any
form submission; without it, forms render but cannot deliver.

## Scripts

| Script                 | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Dev server with hot module replacement |
| `npm run build`        | Production build into `dist/`          |
| `npm run preview`      | Serve the production build locally     |
| `npm run lint`         | ESLint over the whole repo             |
| `npm run lint:fix`     | ESLint with autofix                    |
| `npm run format`       | Prettier write                         |
| `npm run format:check` | Prettier check — this is what CI runs  |
| `npm test`             | Vitest, single run                     |
| `npm run test:watch`   | Vitest in watch mode                   |

CI runs format, lint, test and build on Node 20 and 22. A Husky pre-commit hook
runs `lint-staged` over staged files.

## Project structure

```
src/
├── app/                      Application shell — mounted once, never per page
│   ├── App.jsx               Layout: chrome, <main>, Suspense boundary
│   ├── providers/            Every cross-cutting provider, in one place
│   └── router/
│       ├── AppRoutes.jsx     Route table; each page is a lazy chunk
│       └── legacyRedirects.js Slugs kept alive from the old WordPress site
├── assets/                   Images imported by JS (hashed, inlined if small)
├── components/
│   ├── layout/               Navbar, Footer — the persistent page frame
│   ├── ui/                   Generic, reusable, no domain knowledge
│   └── widgets/              Self-contained features with their own state
├── context/                  React context providers
├── data/                     Static content: official JSON + editorial copy
├── pages/                    One file per route, plus its *.module.css
└── styles/                   Global stylesheet, split by concern
    ├── index.css             Entry point; imports everything in cascade order
    ├── base/                 Tokens, element defaults, utilities, animations
    ├── layout/               Containers, navbar, footer
    ├── components/           Buttons, cards, forms, badges, spinner
    └── pages/                Page-level global styles
```

### Conventions

**Imports** use the `@` alias for anything outside the current folder, so moving
a file never rewrites a chain of `../../`:

```js
import Navbar from '@/components/layout/Navbar';
```

The alias is declared once in `vite.config.js` and mirrored in `jsconfig.json`
for editor navigation.

**Styling** has two homes, and the choice is not a matter of taste:

- A page's own layout goes in `src/pages/<Page>.module.css` — CSS Modules scope
  the class names, so nothing leaks.
- Anything shared, or any selector other pages rely on, goes in
  `src/styles/`. `index.css` imports the partials **in cascade order**, not
  alphabetically, because several rules there win on source order alone.
  `base/overrides.css` is the holding pen for those; fold its rules into the
  partial that owns them whenever you touch that partial.

**Routes** are declared only in `src/app/router/AppRoutes.jsx`. Pages are lazy
so a visitor downloads one route, not the whole site.

### Notes on dependencies

`prop-types` is a direct dependency even though this codebase does not use
PropTypes: `react-simple-maps@3` imports it at runtime and declares it as a
peer, so dropping it breaks `/chapters` in a production install.

## Content sources

`src/data/*Official.json` is scraped from the live association site by the
Python scripts in `scripts/`. Re-run those to refresh chapter, core-group and
leadership listings rather than hand-editing the JSON.
