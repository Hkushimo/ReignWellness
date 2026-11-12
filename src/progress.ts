// Update milestone statuses as the preview changes. These are not time or fee estimates.
export const developmentMilestones = [
  { title: 'Homepage foundation', detail: 'Featured IVs, booking steps, founder story, service areas and FAQs.', ready: true },
  { title: 'IV collection', detail: 'Six infusions with prices, individual detail pages and branded bag images.', ready: true },
  { title: 'Brand direction', detail: 'Brand direction is approved. The finished wordmark, RW monogram, and colors are applied across the preview.', ready: true },
  { title: 'Memberships & pricing', detail: 'Both membership cards and vitamin and medication price tables are in the preview.', ready: true },
  { title: 'Services organization', detail: 'Separate IV and Vitamin Injections pages, Services navigation and IV-first add-on guidance.', ready: true },
  { title: 'Content & design approval', detail: 'Client review of treatment copy, imagery, policies and membership terms before launch.', ready: false },
  { title: 'Contact & launch experience', detail: 'Working inquiry method and public “Booking coming soon” messaging.', ready: false },
  { title: 'Testing & handover', detail: 'Final device and link checks, Cloudflare setup, client approval and launch files.', ready: false },
]

// Publish a new dated summary only when Hakeem requests a splash-screen update.
// Keep this date fixed between updates; never derive it from the visitor's clock.
export const latestWorkUpdate = {
  date: '2026-11-11',
  dateLabel: 'November 11, 2026',
  summary: 'The brand is approved, the first four Instagram posts are ready for review, and custom domain setup is underway.',
  items: [
    { title: 'Approved brand across the preview', detail: 'The finished Reign Wellness wordmark and RW monogram are in use across the website and all six IV bag designs. The print package includes transparent PNGs and matching SVGs.' },
    { title: 'Four Instagram posts prepared', detail: 'Created a wellness lifestyle series featuring Hydrate, Perform, and Glow. Each graphic has a matching caption and alt text ready for review.' },
    { title: 'Cloudflare hosting setup', detail: 'Connected the GitHub repository to Cloudflare and began configuring the Reign Wellness domain. The custom domain is still being verified.' },
  ],
  verification: 'Final site and content review, custom domain verification, booking readiness, and launch checks are still pending.',
}
