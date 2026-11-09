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
  date: '2026-11-09',
  dateLabel: 'November 7–9, 2026',
  summary: 'Recent work focused on refining the brand, creating a consistent IV collection, and carrying the updated colors through the website.',
  items: [
    { title: 'Client-led logo refinements', detail: 'Explored lowercase, monogram, and uppercase-style directions, and prepared a side-by-side comparison to support the decision. The current preview uses the preferred uppercase-style lettering with a smaller, softer droplet and lighter blues.' },
    { title: 'Transparent logos for every background', detail: 'Prepared clean transparent versions for light and dark sections, removed background artifacts, and adjusted logo sizing in the desktop and mobile header, footer, and preview splash screen.' },
    { title: 'Six matching round-label IV images', detail: 'Created a consistent clear, round-label treatment for Hydrate, Boost, Perform, Defend, Glow, and Reboot. Each bag has a small logo and its treatment name in a coordinating color. Earlier image sets are preserved for comparison.' },
    { title: 'Refreshed collection and floating hero bags', detail: 'Applied the new bag set to the collection and individual treatment pages, with transparent cutouts for the animated homepage hero. The bags currently carry the RW monogram; matching them to the latest wordmark is still pending.' },
    { title: 'Yellow accents throughout the website', detail: 'Added restrained yellow touches to the main homepage button, section markers, booking arrows, step indicators, membership cards, and selected navigation details while retaining the blue foundation.' },
    { title: 'Published preview updates', detail: 'Built and published the recent design updates through GitHub Pages so they can be reviewed on the shared preview. Previous logo versions and image sets remain saved.' },
  ],
  verification: 'Production builds and recent deployments passed. Final brand and content approval, device and link testing, Jane readiness, launch setup, and handover remain pending. This preview is not the public launch.',
}
