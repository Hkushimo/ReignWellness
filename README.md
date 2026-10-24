# Reign Wellness

Premium single-page React + Vite prototype for Reign Wellness, a mobile IV hydration and wellness business.

## Local development

```bash
npm install
npm run dev
```

The production build is created with `npm run build` and can be previewed with `npm run preview`.

## Content and configuration

- The client-provided logo reference is stored at `public/assets/reign-logo.jpg`; the inspiration board is stored for reference at `public/assets/inspiration-board.jpg` and is not displayed on the page.
- Set `VITE_ACUITY_BOOKING_URL` in a local `.env` file when the final Acuity scheduling link is available. Without it, the booking panel intentionally shows a “Booking coming soon” demo state.
- Replace the Unsplash image URLs in `src/App.tsx` with approved, locally stored/licensed image assets before production launch. The current remote images are editorial placeholders for this concept demo.

## GitHub Pages deployment

The Vite config uses a relative base path (`./`), so the build is compatible with a repository URL such as `https://hkushimo.github.io/ReignWellness/`.

1. Push this project to the `main` branch of the GitHub repository.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Add a workflow that runs `npm ci`, `npm run build`, and uploads the `dist` directory using `actions/upload-pages-artifact` and `actions/deploy-pages`.
4. If you add a custom domain later, update the Pages settings and keep the Vite base path under review.

No backend, payment flow, patient data collection, or CRM is included in this prototype.
