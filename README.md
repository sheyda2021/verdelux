# Verdelux 🌿

A pixel-perfect, front-end implementation of the **Verdelux** plant-shop design — built from a Figma design and turned into a fast, fully static React site. Three linked pages (Home ↔ Shop ↔ Product detail), a real working cart with persistence, and an accessible, animated UI.

> Design by **Sheyda Asadi**. Front-end build in React + TypeScript.

## ✨ Highlights

- **Faithful to the design** — layout, palette, and type carried over from Figma into Tailwind design tokens.
- **A real shopping cart** — add / remove / change quantity, live badge count and subtotal, with a slide-over drawer. State is managed by a pure `useReducer` and persisted to `localStorage`, so a cart survives a page reload.
- **Client-side demo checkout** — checkout clears the cart and shows a confirmation with a mock order reference. It is intentionally front-end only: **no backend, no payment, no database.**
- **Accessibility** — accessible star ratings (single labelled `role="img"`), the hero carousel dots are real `<button>`s with `aria-current`, the cart drawer is a proper `role="dialog"` (Escape to close, focus management, scroll lock), and a consistent keyboard focus ring across the app.
- **Performance** — below-the-fold images use native `loading="lazy"` + `decoding="async"`; the hero image stays eager for a fast first paint.
- **Tested** — unit tests for the cart reducer and selectors, integration tests for cart persistence/rehydration, and a11y tests for the star component (Vitest + Testing Library).

## 🧱 Tech stack

| Area | Choice |
|------|--------|
| Build | [Vite 6](https://vite.dev/) |
| UI | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Routing | react-router-dom v6 (`HashRouter` — static-host friendly) |
| Animation | Framer Motion |
| Testing | Vitest + @testing-library/react + jest-dom (jsdom) |
| Linting | ESLint 9 (flat config) + typescript-eslint |

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5181)
```

## 📜 Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc`) then build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run coverage` | Run tests with a coverage report |
| `npm run lint` | Lint the project with ESLint |

## 🌐 Deploying (static hosting)

The app is a fully static bundle — build it and serve the `dist/` folder from any static host (Netlify, Vercel, GitHub Pages, an S3 bucket, etc.):

```bash
npm run build
```

`HashRouter` is used deliberately so deep links (e.g. `/#/shop`) work on any static host without server-side route rewrites.

## 🗂️ Project structure

```
src/
  assets.ts            # single bundled asset map (images)
  data.ts              # product catalogue — single source of truth
  main.tsx             # app entry: HashRouter + CartProvider
  App.tsx              # routes + layout (Navbar / Footer / CartDrawer)
  cart/
    cartReducer.ts     # pure, testable cart logic + selectors
    CartContext.tsx    # provider, localStorage persistence, useCart()
    *.test.*           # cart unit + integration tests
  components/          # Navbar, Footer, ProductCard, CartDrawer, Stars, motion…
  pages/               # Home, Shop, ShopDetail
```

## 🧭 Design decisions

- **Slim persistence.** Only `{ id, qty }` is saved to `localStorage`; on load, ids are re-mapped against the live catalogue, so saved carts never carry stale prices or product details.
- **Cart drawer state lives in the cart context.** The Navbar renders in two places (the Home hero overlay and the global bar), so keeping drawer open/close state in context avoids prop-drilling.
- **Honest demo checkout.** Rather than fake a "successful payment", the checkout is clearly presented as a front-end demo — matching the no-backend constraint of this portfolio piece.

## ⚠️ Scope

This is a **front-end portfolio project**. There is no server, no database, and no real payment processing — product data is a local catalogue and checkout is a client-side demo.

## 👋 About & contact

Designed and built by **Sheyda Asadi** — a front-end developer who cares about pixel-accuracy, accessibility, and clean, tested code.

I'm currently **open to front-end / React opportunities**. If you like this project, I'd love to connect:

- ⭐ **Follow me on GitHub:** [@sheyda2021](https://github.com/sheyda2021)
- 💼 **LinkedIn:** [Sheyda Asadi](https://www.linkedin.com/in/sheyda-asadi-a171b2334/)
- ✉️ **Email:** sheida94asadi@gmail.com

If this project caught your eye, a ⭐ on the repo and a follow mean a lot — and feel free to reach out about working together!

