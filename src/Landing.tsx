import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight, ArrowRight, Check, ChevronDown, Menu, X, MapPin, Heart, ShieldCheck, ArrowLeft } from 'lucide-react'
import { treatments, injections, medications, towns, faqs } from './content'
import { developmentMilestones, latestWorkUpdate } from './progress'
import { useSiteMotion } from './useSiteMotion'
import { WaterSculpture } from './WaterSculpture'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`
const readyMilestones = developmentMilestones.filter(item => item.ready).length
const demoMode = import.meta.env.VITE_DEMO_MODE !== 'false'
const nav = [['How it works', '#how-it-works'], ['Memberships', '#memberships'], ['Our story', '#about']] as const
const safeUrl = (value: unknown) => typeof value === 'string' && /^https:\/\//.test(value) ? value : undefined
function Logo({ light = false }: { light?: boolean }) {
  return <span className={`wordmark wordmark--primary ${light ? 'wordmark--primary-light' : ''}`}><img src={asset(light ? 'reign-primary-white.png' : 'reign-primary-navy.png')} alt="Reign Wellness" /></span>
}const serviceLinks = [['IV Infusions', '#/menu'], ['Vitamin Injections', '#/injections']] as const
function ServicesNav({ current, mobile = false, onNavigate }: { current: string; mobile?: boolean; onNavigate?: () => void }) {
  const disclosureRef = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (disclosureRef.current && !disclosureRef.current.contains(event.target as Node)) disclosureRef.current.open = false
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [])
  const links = serviceLinks.map(([label, href]) => <a key={href} href={href} aria-current={current === href ? 'page' : undefined} onClick={event => { const disclosure = event.currentTarget.closest('details'); if (disclosure) disclosure.open = false; onNavigate?.() }}>{label}</a>)
  if (mobile) return <div className="mobile-services"><span>Services</span>{links}</div>
  return <details ref={disclosureRef} className="services-nav" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus() } }}><summary>Services <ChevronDown size={15} /></summary><div className="services-nav__links">{links}</div></details>
}
function ServiceCategories({ current }: { current: string }) {
  return <nav className="service-categories" aria-label="Service categories">{serviceLinks.map(([label, href]) => <a key={href} href={href} aria-current={current === href ? 'page' : undefined}>{label}<ArrowUpRight size={16} /></a>)}</nav>
}
function ProductCard({ treatment, index }: { treatment: typeof treatments[number]; index: number }) {
  return <a className="product-card" href={`#/iv/${treatment.id}`} style={{ '--tint': treatment.tint } as CSSProperties}><div className="product-image"><span className="product-index">0{index + 1} / SIGNATURE IV</span><img src={asset(`iv/round/reign-${treatment.id}.png`)} alt={`Reign ${treatment.name} IV infusion bag with a round clear label and ${treatment.colorName} accent`} loading="lazy" /><span className="product-arrow"><ArrowUpRight size={22} /></span></div><div className="product-heading"><h3>Reign {treatment.name}</h3><span>${treatment.price}</span></div><p>{treatment.focus}</p><span className="product-link">Explore infusion <ArrowRight size={15} /></span></a>
}
function Landing() {

  const [showSplash, setShowSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerRaised, setHeaderRaised] = useState(false)
  const [hash, setHash] = useState(window.location.hash || '#/')
  const [notice, setNotice] = useState('')
  const noticeRef = useRef<HTMLDialogElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const route = hash.startsWith('#/') ? hash : '#/'
  const selected = treatments.find(t => route === `#/iv/${t.id}`)
  const isMenu = route === '#/menu'
  const isInjections = route === '#/injections'
  useSiteMotion(mainRef, route, !showSplash)
  useEffect(() => {
    const updateHeader = () => setHeaderRaised(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])
  useEffect(() => {
    const onHash = () => { setHash(window.location.hash || '#/'); setMenuOpen(false) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : ''
    if (showSplash) enterRef.current?.focus({ preventScroll: true })
    return () => { document.body.style.overflow = '' }
  }, [showSplash])
  useEffect(() => {
    if (showSplash) return
    if (hash.startsWith('#/') || hash === '') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      mainRef.current?.focus({ preventScroll: true })
    } else {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.tabIndex = -1
        target.focus({ preventScroll: true })
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      }
    }
    document.title = `${selected ? `Reign ${selected.name}` : isMenu ? 'IV Infusions' : isInjections ? 'Vitamin Injections' : 'Wellness Delivered to You'} | Reign Wellness`
  }, [hash, showSplash, selected, isMenu, isInjections])
  useEffect(() => { if (notice) noticeRef.current?.showModal() }, [notice])
  function book(label = 'appointment', key = '') {
    const url = safeUrl(import.meta.env[key ? `VITE_JANE_${key.toUpperCase()}_URL` : 'VITE_JANE_BOOKING_URL'])
    if (!demoMode && url) { window.open(url, '_blank', 'noopener,noreferrer'); return }
    setNotice(demoMode ? `You’re viewing the Reign Wellness demo. ${label === 'appointment' ? 'Appointment booking' : label} will open in Jane once booking is approved for launch. No appointment or payment has been created.` : 'Online booking is not available yet. Please check back for the approved Jane booking link.')
  }
  const inquiry = () => setNotice('Inquiries will open when Reign Wellness launches. The demo does not send or store your contact details. Travel fees and service availability will be confirmed before booking.')
  function leaveSplash() { setShowSplash(false); requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true })) }
  return <>
    {showSplash && <div className="demo-splash development-splash" role="dialog" aria-modal="true" aria-labelledby="demo-title" aria-describedby="progress-description" onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); enterRef.current?.focus() } }}>
      <div className="demo-splash__mark"><Logo light /></div>
      <div className="demo-splash__content">
        <p className="eyebrow">Private development preview</p>
        <h1 id="demo-title">Your website,<br /><em>taking shape.</em></h1>
        <p id="progress-description" className="demo-splash__description">Explore what’s built so far and see what’s next. This is a working preview; content and design are still subject to your approval.</p>
        <div className="development-progress">
          <div className="development-progress__label"><span id="milestone-label">Preview milestones</span><strong>{readyMilestones} of {developmentMilestones.length} in place</strong></div>
          <progress aria-labelledby="milestone-label" aria-describedby="milestone-note" value={readyMilestones} max={developmentMilestones.length} />
          <p id="milestone-note">Milestones shown equally, not a measure of time spent or final approval.</p>
        </div>
        <section className="development-update" aria-labelledby="latest-work-title">
          <div className="development-update__heading"><h2 id="latest-work-title">Latest work</h2><time dateTime={latestWorkUpdate.date}>{latestWorkUpdate.dateLabel}</time></div>
          <p className="development-update__intro">{latestWorkUpdate.summary}</p>
          <ul>{latestWorkUpdate.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ul>
          <p className="development-update__verification"><ShieldCheck size={16} aria-hidden="true" />{latestWorkUpdate.verification}</p>
        </section>
        <div className="development-columns">
          {[true, false].map(ready => <section key={String(ready)} aria-label={ready ? 'Available to preview' : 'Still to come'}>
            <h2><span className={ready ? 'development-dot development-dot--ready' : 'development-dot'} />{ready ? 'Available to preview' : 'Still to come'}</h2>
            <ul>{developmentMilestones.filter(item => item.ready === ready).map(item => <li key={item.title}><span className="development-item-icon" aria-hidden="true">{ready ? <Check size={16} /> : <ArrowRight size={16} />}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ul>
          </section>)}
        </div>
        <p className="development-jane"><strong>Booking follows your readiness.</strong> Jane booking and membership links will be connected and tested once supplied and confirmed. The website can launch with booking coming soon.</p>
        <button ref={enterRef} className="button button-gold" onClick={leaveSplash}>Explore the preview <ArrowRight size={18} /></button>
        <p className="demo-splash__credit">Designed & developed by <strong>Hakeem Kushimo</strong></p>
      </div>
      <span className="demo-splash__footer">Reign Wellness · In development</span>
    </div>}
    <div inert={showSplash} className="site-shell"><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); mainRef.current?.focus(); mainRef.current?.scrollIntoView() }}>Skip to content</a><div className="announcement"><span><span className="tiny-dot" /> Nurse-led care across Massachusetts.</span><span className="demo-label">{demoMode ? 'PRIVATE DEMO' : 'BY APPOINTMENT'}</span></div>
      <header className={`site-header ${headerRaised ? 'site-header--raised' : ''}`}><div className="header-inner"><a href="#/" aria-label="Reign Wellness home"><Logo /></a><nav className="desktop-nav" aria-label="Main navigation"><ServicesNav current={selected ? "#/menu" : route} />{nav.map(([label, link]) => <a href={link} key={label} >{label}</a>)}</nav><div className="header-actions"><button className="button button-dark header-book" onClick={() => book()}>Book an appointment <ArrowUpRight size={16} /></button><button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></div>{menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation"><ServicesNav current={selected ? "#/menu" : route} mobile onNavigate={() => setMenuOpen(false)} />{nav.map(([label, link]) => <a href={link} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}<button onClick={() => { setMenuOpen(false); book() }}>Book an appointment <ArrowUpRight size={18} /></button></nav>}</header>
      <main id="main" ref={mainRef} tabIndex={-1}>
        {selected ? <><section className="section detail-section"><a className="text-link back-link" href="#/menu"><ArrowLeft size={17} /> Back to our menu</a><div className="detail-grid"><div className="detail-image" style={{ background: selected.tint }}><img src={asset(`iv/round/reign-${selected.id}.png`)} alt={`Reign ${selected.name} infusion concept`} /></div><div className="detail-header"><p className="eyebrow">Signature IV infusion · {selected.focus}</p><h1>Reign <em>{selected.name}.</em></h1><p className="detail-price">${selected.price}<span>per infusion · travel fees may apply</span></p></div><div className="detail-copy"><p className="detail-description">{selected.description}</p><h3>What’s inside</h3><ul className="ingredient-list">{selected.ingredients.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>{selected.id === 'reboot' && <p className="fine-print">Ondansetron may be available when clinically appropriate, following consultation and prescription authorization.</p>}<button className="button button-dark" onClick={() => book(`Reign ${selected.name}`, selected.id)}>Book this infusion <ArrowUpRight size={18} /></button><p className="fine-print">Health history, screening, and provider authorization are required before treatment. Final ingredients follow approved clinical protocols. Product imagery is illustrative; fluid appearance is awaiting clinical confirmation.</p></div></div></section><section className="detail-next section"><p className="eyebrow">Find your fit</p><h2>Explore the full collection.</h2><a className="button button-outline" href="#/menu">View all infusions <ArrowRight size={17} /></a></section></>
        : isMenu ? <><section className="section menu-intro"><p className="eyebrow">Services / IV Infusions</p><h1>Your wellness.<br /><em>Your kind of care.</em></h1><p>Explore six signature IV infusions. Our clinical team determines what’s appropriate for you.</p><ServiceCategories current={route} /></section><section className="section catalog" id="iv-menu"><div className="product-grid">{treatments.map((t, i) => <ProductCard treatment={t} index={i} key={t.id} />)}</div><p className="fine-print">Travel fees may apply. All treatments require clinical eligibility and approved protocols. Fluid colors shown are provisional.</p><div className="service-crosslink"><div><h2>Personalize your infusion.</h2><p>Explore optional vitamins and medication add-ons before choosing your IV in Jane.</p></div><a className="button button-outline" href="#/injections">View vitamin options <ArrowRight size={17} /></a></div></section></>
        : isInjections ? <><section className="section menu-intro"><p className="eyebrow">Services / Vitamin Injections</p><h1>A little extra care.<br /><em>Made personal.</em></h1><p>Explore the vitamins that can complement your IV infusion, with care tailored by our clinical team.</p><ServiceCategories current={route} /></section><section className="section injection-catalog"><div className="section-heading"><div><p className="eyebrow">Vitamin Injections</p><h2>Explore your options.</h2></div><p>Vitamin options and prices, at a glance.</p></div><aside className="addon-booking-note" aria-label="How vitamin add-ons work"><strong>Available with an IV infusion.</strong> Vitamins cannot be booked individually. Choose your IV in Jane first, then select available add-ons at the prices listed here. Eligibility and administration are determined by our clinical protocols and medical director.</aside><table className="addon-table"><caption>Vitamin & wellness injection pricing</caption><thead><tr><th scope="col">Add-on</th><th scope="col">Price</th></tr></thead><tbody>{injections.map(item => <tr key={item.name}><th scope="row">{item.name}<span>{item.copy}</span></th><td>${item.price}</td></tr>)}</tbody></table><div className="medications"><div><p className="eyebrow">Prescription medication add-ons</p><h3>Care guided by a licensed provider.</h3><p>A medical consultation, appropriate screening, and authorization from a licensed prescribing provider are required. Availability depends on clinical eligibility, approved protocols, and provider discretion.</p></div><div><table className="addon-table"><caption>Prescription medication add-on pricing</caption><thead><tr><th scope="col">Add-on</th><th scope="col">Price</th></tr></thead><tbody>{medications.map(item => <tr key={item.name}><th scope="row">{item.name}<span>{item.focus}</span></th><td>${item.price}</td></tr>)}</tbody></table><p className="fine-print">Medication add-ons are available only with an IV infusion and require appropriate medical authorization.</p></div></div><div className="service-crosslink"><div><h2>Start with your IV.</h2><p>Find your infusion, then personalize your visit through Jane when booking opens.</p></div><a className="button button-dark" href="#/menu">Explore IV infusions <ArrowRight size={17} /></a></div></section></>
        : <>
          <section className="hero"><div className="hero-inner"><div className="hero-copy"><p className="eyebrow"><span className="tiny-dot" /> Mobile IV infusion & vitamin therapy</p><h1>Wellness,<br />delivered<br /><em>to you.</em></h1><p className="hero-lede">Personalized wellness, in your own space. Nurse-led IV infusions and vitamin therapy brought to your home, office, or preferred location.</p><div className="button-row"><a className="button button-dark" href="#/menu">Find your infusion <ArrowUpRight size={18} /></a><a className="text-link" href="#how-it-works">How it works <ArrowRight size={16} /></a></div><div className="hero-location"><MapPin size={16} /><span>Boston · North Shore · South Shore & beyond</span></div></div><div className="hero-art"><div className="hero-halo" /><span className="hero-art-caption">A LITTLE CARE.<br />RIGHT WHERE YOU ARE.</span><img className="hero-bag hero-bag-back" src={asset('iv/round/reign-boost-cutout.png')} alt="Reign Boost infusion with a round clear label and golden-yellow accent" fetchPriority="high" /><img className="hero-bag hero-bag-front" src={asset('iv/round/reign-hydrate-cutout.png')} alt="Reign Hydrate infusion with a round clear label and sky-blue accent" fetchPriority="high" /><div className="hero-tag"><span className="tag-icon"><Heart size={19} strokeWidth={1.5} /></span><div>Nurse-led. Personally delivered.<small>Thoughtful care, on your terms.</small></div></div><span className="hero-edition">THE REIGN COLLECTION / 01</span></div></div></section>
          <div className="brand-ribbon"><span>Hydrate.</span><i /><span>Revitalize.</span><i /><span>Restore.</span><p>Make room for your well-being.</p></div>
          <section className="section collection" id="treatments"><div className="section-heading"><div><p className="eyebrow">Meet your wellness menu</p><h2>A little more<br /><em>in your corner.</em></h2></div><div className="section-aside"><p>From everyday hydration to post-workout recovery, find a starting point that fits your routine.</p><a className="text-link" href="#/menu">Explore the full menu <ArrowUpRight size={17} /></a></div></div><div className="product-grid">{treatments.slice(0, 3).map((t, i) => <ProductCard treatment={t} index={i} key={t.id} />)}</div><div className="collection-foot"><span>Six signature infusions. Care tailored to you.</span><a href="#/menu" className="text-link">View all six <ArrowRight size={16} /></a></div></section>
          <section className="care-band"><div className="section care-grid"><WaterSculpture /><div><p className="eyebrow">Professional care. A personal experience.</p><h2>Your space.<br />Your pace.<br /><em>Your well-being.</em></h2><p>Wellness should feel accessible, comfortable, and personal. Reign combines professional nursing care with the convenience of coming to you—so caring for yourself fits into your day.</p><div className="care-points"><span><ShieldCheck size={18} /> Clinical screening before treatment</span><span><Heart size={18} /> Personalized, nurse-led care</span><span><MapPin size={18} /> Your home, office, or approved location</span></div></div></div></section>
          <section className="section how-section" id="how-it-works"><div className="section-heading"><div><p className="eyebrow">From your first click to your front door</p><h2>Settle in.<br /><em>We’ll come to you.</em></h2></div><p>A simple booking process, with thoughtful clinical care built in.</p></div><div className="steps">{[['Choose your IV', 'Explore our six signature IV infusions and find the option that interests you.'], ['Book through Jane', 'Select your IV in Jane first, then choose available add-ons and your preferred appointment date, time, and location.'], ['Complete your assessment', 'Complete your health history and screening. A licensed provider determines eligibility and authorizes treatment when appropriate.'], ['Relax & Reign', 'A qualified healthcare professional arrives at your location to provide your approved treatment.']].map(([title, copy], i) => <article className="step" key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
          <section className="membership-section" id="memberships"><div className="section"><div className="section-heading"><div><p className="eyebrow">A little consistency. A little care.</p><h2>Wellness has<br /><em>a place in your routine.</em></h2></div><p>Two ways to make regular self-care part of your month.</p></div><div className="membership-grid">{[{ name: 'Essentials', price: 190, caption: 'Your monthly moment of care.', key: 'essentials', features: ['One IV infusion of choice per month', '25% off travel fees', '5% off add-ons', '$10 off Vitamin B12'] }, { name: 'Elite', price: 360, caption: 'More room for your well-being.', key: 'elite', features: ['Two IV infusions per month', '50% off travel fees', 'One complimentary Vitamin B12 injection', '10% off add-ons'] }].map((plan, i) => <article className={`membership-card ${i ? 'membership-card-elite' : ''}`} key={plan.key}><div className="plan-top"><span>REIGN {plan.name.toUpperCase()}</span><span>0{i + 1}</span></div><p className="plan-price">${plan.price}<span>/ month</span></p><p className="plan-caption">{plan.caption}</p><ul>{plan.features.map(feature => <li key={feature}><Check size={17} />{feature}</li>)}</ul><button className={`button ${i ? 'button-gold' : 'button-outline'}`} onClick={() => book(`Reign ${plan.name} enrollment`, plan.key)}>Join Reign {plan.name} <ArrowUpRight size={17} /></button><p className="plan-terms">Three-month minimum commitment, then month-to-month.</p></article>)}</div><p className="fine-print">Scheduling, unused-service policies, and eligible add-ons will be finalized before enrollment opens.</p></div></section>
          <section className="section founder-section" id="about"><div className="founder-panel"><p className="eyebrow">A note from our founder</p><p className="founder-statement">“Prioritizing your well-being should feel empowering, accessible, and personal.”</p><span className="founder-signature">Reyna, RN</span><span className="founder-role">FOUNDER · REIGN WELLNESS</span></div><div className="founder-copy"><p className="eyebrow">Rooted in nursing. Built around you.</p><h2>Good care begins<br /><em>with a person.</em></h2><p>Reign Wellness was founded by Reyna, a Registered Nurse with a passion for patient care, preventive wellness, and helping individuals prioritize their well-being.</p><p>With a background in nursing and patient-centered care, she created Reign to bring personalized services directly to clients. Her goal is simple: clinical professionalism, with a comfortable, welcoming experience.</p><a className="text-link" href="#service-areas">See where we come to you <ArrowRight size={17} /></a></div></section>
          <section className="service-area-section" id="service-areas"><div className="section area-grid"><div><p className="eyebrow"><MapPin size={15} /> Massachusetts, we’re coming to you</p><h2>Close to home.<br /><em>Wherever that is.</em></h2><p>Serving Boston, the North Shore, the South Shore, and beyond. Your home, office, or preferred approved location becomes your space for care.</p><button className="button button-dark" onClick={inquiry}>Check service availability <ArrowUpRight size={17} /></button></div><div><div className="town-list">{towns.map(town => <span key={town}>{town}</span>)}</div><p className="area-note"><strong>Don’t see your town?</strong> We may still be able to come to you. Reach out to confirm availability. Travel fees may apply.</p></div></div></section>
          <section className="section faq-section" id="faq"><div><p className="eyebrow">A few things to know</p><h2>Feel informed.<br /><em>Feel at ease.</em></h2><p>Answers to help you plan your first Reign experience.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>
          <section className="section final-cta" id="contact"><div><p className="eyebrow">Make some room for yourself</p><h2>Your next moment<br /><em>of care starts here.</em></h2><p>Explore the menu or get in touch about your location, a private gathering, or a future group wellness experience.</p></div><div><button className="button button-dark" onClick={() => book()}>Book an appointment <ArrowUpRight size={18} /></button><button className="text-link" onClick={inquiry}>Ask us a question <ArrowRight size={17} /></button></div></section>
        </>}
      </main>
      <footer><div className="section footer-top"><div><a href="#/" aria-label="Reign Wellness home"><Logo light /></a><p>Personalized mobile IV infusion<br />& vitamin therapy.</p><span className="footer-tagline">Hydrate. Revitalize. Restore.</span></div><div className="footer-links"><span>EXPLORE</span><a href="#/menu">IV Infusions</a><a href="#/injections">Vitamin Injections</a><a href="#memberships">Memberships</a><a href="#about">Our story</a><a href="#service-areas">Service areas</a></div><div className="footer-links"><span>LET’S CONNECT</span><a href="#faq">FAQs</a><button onClick={inquiry}>Contact & group inquiries</button><button onClick={() => book()}>Book through Jane <ArrowUpRight size={13} /></button>{safeUrl(import.meta.env.VITE_INSTAGRAM_URL) && <a href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>}</div></div><div className="footer-bottom section"><p>Services require health screening and clinical approval. Information is for general education and does not guarantee outcomes. Treatment descriptions and clinical protocols are subject to medical review before launch.</p><div><span>© {new Date().getFullYear()} Reign Wellness LLC</span><span>{demoMode ? 'Demo only · Booking is not yet open' : 'Massachusetts · By appointment'}</span><button onClick={() => setNotice('Privacy, consent, cancellation, and membership terms are being finalized and will be reviewed before public launch. This demo does not collect patient information or accept payments.')}>Policies & terms</button></div></div></footer>
    </div>
    <dialog ref={noticeRef} className="notice-dialog" onClose={() => setNotice('')} onClick={e => { if (e.target === e.currentTarget) noticeRef.current?.close() }}><button className="dialog-close" aria-label="Close message" onClick={() => noticeRef.current?.close()}><X size={21} /></button><p className="eyebrow">Reign Wellness</p><h2>{demoMode ? 'A little preview.' : 'Coming soon.'}</h2><p>{notice}</p><button className="button button-dark" onClick={() => noticeRef.current?.close()}>Keep exploring <ArrowRight size={16} /></button></dialog>
  </>
}
export default Landing
