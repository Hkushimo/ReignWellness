# Reign Wellness

React + Vite demo for Reign Wellness, a nurse-led mobile IV infusion and vitamin therapy business in Massachusetts.

## New branded experience

The current entry point imports `src/Landing.tsx` and `src/landing.css`. The previous `App.tsx` and `styles.css` are retained as legacy reference, not displayed. The private-preview splash briefing is preserved with the new logo and colors.

- Homepage: featured IVs, four booking steps, both memberships, founder story, 16 service areas, FAQs, and demo booking/inquiry actions.
- IV menu: `#/menu`, with all six infusions.
- Vitamin Injections: `#/injections`, with seven vitamin price options, a prescription medication add-on section, and IV-first booking guidance. Both categories are available through Services navigation.
- Treatment pages: `#/iv/hydrate`, `#/iv/boost`, `#/iv/perform`, `#/iv/defend`, `#/iv/glow`, `#/iv/reboot`.
- Content: `src/content.ts`. The original serif logo silhouette in `public/assets/reign-wordmark-transparent.png` is used with navy/white lettering and a blue droplet through CSS alpha masks. The water-logo explorations remain saved separately. Product images: `public/assets/iv/`. Fluid appearance remains provisional pending clinical confirmation.
- Copy `.env.example` to `.env` to supply approved HTTPS Jane booking links for each service and membership. `VITE_DEMO_MODE` defaults to true: no booking button opens Jane until explicitly set to false. Public Vite variables must never contain secrets.
- Instagram is shown only when `VITE_INSTAGRAM_URL` is provided. Inquiry forms, reviews, contact details, clinical policies, and real payment/intake processing are not fabricated.
- Before launch: obtain client authorization and finalize clinical content, fluid appearance, appointment durations, preparation guidance, privacy/consent/cancellation/membership terms, contact routing, and Jane links. Review the demo `noindex` tag in `index.html`.
- The build now uses standard `index.html`; `source-index.html` is legacy. The current development preview is on `main`. GitHub Pages uses GitHub Actions to build and publish `dist`; do not switch Pages to publishing the raw branch.

## Local development

```bash
npm install
npm run dev
```

The production build is created with `npm run build` and can be previewed with `npm run preview`.

## Content and configuration

- The older logo and inspiration-board files are retained but unused by the new page.
- The current site uses local product imagery and Jane link configuration. Acuity and Unsplash references in the legacy component do not affect the new experience.

## GitHub Pages deployment

The Vite config uses a relative base path (`./`), so the build is compatible with a repository URL such as `https://hkushimo.github.io/ReignWellness/`.

1. Push this project to the `main` branch of the GitHub repository.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Add a workflow that runs `npm ci`, `npm run build`, and uploads the `dist` directory using `actions/upload-pages-artifact` and `actions/deploy-pages`.
4. If you add a custom domain later, update the Pages settings and keep the Vite base path under review.

No backend, payment flow, patient data collection, or CRM is included in this prototype.
