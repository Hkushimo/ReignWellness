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
  summary: 'A more cohesive product collection and a cleaner, softer homepage presentation.',
  items: [
    { title: 'Six refreshed IV images', detail: 'Created matching clear-label images for Hydrate, Boost, Perform, Defend, Glow, and Reboot, with a small centered logo and treatment names in their coordinating colors. Applied across the homepage, menu, and individual IV pages.' },
    { title: 'Refined homepage hero', detail: 'Removed the rectangular backgrounds from the featured bags, softened their angles, and replaced the solid backdrop with a subtle blue glow and water rings. Continuous floating motion remains.' },
    { title: 'Logo & label exploration', detail: 'Restored the original lowercase logo with a glossy blue droplet. Saved alternate logo concepts and a universal physical-label concept with six selection circles for review. Final branding remains subject to approval.' },
    { title: 'Preserved earlier designs', detail: 'Kept the previous IV image sets and logo options so directions can be compared without losing earlier work.' },
  ],
  verification: 'All six collection images load and the production build passes. Final device testing, content approval, and launch checks are still ahead.',
}
