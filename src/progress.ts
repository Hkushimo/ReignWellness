// Update milestone statuses as the preview changes. These are not time or fee estimates.
export const developmentMilestones = [
  { title: 'Homepage foundation', detail: 'Featured IVs, booking steps, founder story, service areas and FAQs.', ready: true },
  { title: 'IV collection', detail: 'Six infusions with prices, individual detail pages and branded bag images.', ready: true },
  { title: 'Brand direction', detail: 'Proposed logo, colors and overall visual direction are awaiting client approval.', ready: false },
  { title: 'Memberships & pricing', detail: 'Both membership cards and vitamin and medication price tables are in the preview.', ready: true },
  { title: 'Services organization', detail: 'Separate IV and Vitamin Injections pages, Services navigation and IV-first add-on guidance.', ready: true },
  { title: 'Content & design approval', detail: 'Client review of treatment copy, imagery, policies and membership terms before launch.', ready: false },
  { title: 'Contact & launch experience', detail: 'Working inquiry method and public “Booking coming soon” messaging.', ready: false },
  { title: 'Testing & handover', detail: 'Final device and link checks, Cloudflare setup, client approval and launch files.', ready: false },
]

// Publish a new dated summary only when Hakeem requests a splash-screen update.
// Keep this date fixed between updates; never derive it from the visitor's clock.
export const latestWorkUpdate = {
  date: '2026-11-06',
  dateLabel: 'November 6, 2026',
  summary: 'Refining the experience, from service browsing to the smallest visual details.',
  items: [
    { title: 'Services & membership details', detail: 'Added the separate Vitamin Injections page and Services navigation, clarified add-on booking, and aligned the Essentials B12 discount with the agreement.' },
    { title: 'Desktop & mobile refinement', detail: 'Improved service-page spacing, moved treatment names and prices above images on phones, aligned catalog links, and refined navigation and keyboard focus.' },
    { title: 'New visual direction', detail: 'Introduced blue and white water-inspired logo concepts and coordinated the page colors. Branding remains subject to your approval.' },
    { title: 'Motion & polish', detail: 'Added section reveals, continuous floating IV bags, an animated water sculpture, and refined interactions, with support for reduced-motion preferences.' },
  ],
  verification: 'Production build checked; key desktop and mobile layouts and navigation reviewed. Final launch testing is still ahead.',
}
