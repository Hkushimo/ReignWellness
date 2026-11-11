// Update milestone statuses as the preview changes. These are not time or fee estimates.
export const developmentMilestones = [
  { title: 'Homepage foundation', detail: 'Featured IVs, booking steps, founder story, service areas and FAQs.', ready: true },
  { title: 'IV collection', detail: 'Six infusions with prices, individual detail pages and branded bag images.', ready: true },
  { title: 'Brand direction', detail: 'Finished logos are in the preview. Final approval of the overall visual direction is pending.', ready: false },
  { title: 'Memberships & pricing', detail: 'Both membership cards and vitamin and medication price tables are in the preview.', ready: true },
  { title: 'Services organization', detail: 'Separate IV and Vitamin Injections pages, Services navigation and IV-first add-on guidance.', ready: true },
  { title: 'Content & design approval', detail: 'Client review of treatment copy, imagery, policies and membership terms before launch.', ready: false },
  { title: 'Contact & launch experience', detail: 'Working inquiry method and public “Booking coming soon” messaging.', ready: false },
  { title: 'Testing & handover', detail: 'Final device and link checks, Cloudflare setup, client approval and launch files.', ready: false },
]

// Publish a new dated summary only when Hakeem requests a splash-screen update.
// Keep this date fixed between updates; never derive it from the visitor's clock.
export const latestWorkUpdate = {
  date: '2026-11-10',
  dateLabel: 'November 10, 2026',
  summary: 'The finished Reign Wellness logos and matching IV bag artwork are now in the website preview.',
  items: [
    { title: 'Finished website branding', detail: 'Applied the finished wordmark to the header, footer, and splash screen, using the full-color version on light backgrounds and the white version on dark backgrounds. The finished RW monogram is now the browser tab icon.' },
    { title: 'Updated IV bag labels', detail: 'Applied the finished RW monogram to the clear round labels for all six infusions. Each bag keeps its color-coded treatment name. The updated artwork appears in the homepage hero, IV menu, and individual infusion pages.' },
    { title: 'Print logo package', detail: 'Replaced the earlier print exports with the finished wordmark and RW monogram in full-color and white versions. The package includes transparent PNGs and matching SVGs.' },
  ],
  verification: 'The updated branding and IV artwork passed the production build and deployed to the shared preview. Final content and design approval, booking readiness, and launch checks are still pending.',
}
