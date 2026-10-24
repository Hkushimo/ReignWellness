import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, ChevronDown, Clock3, Menu, MoveRight, Sparkles, X } from 'lucide-react'

const imageBase = 'https://images.unsplash.com'
const images = {
  hero: `${imageBase}/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1800&q=85`,
  treatment: `${imageBase}/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=85`,
  recovery: `${imageBase}/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85`,
  nutrients: `${imageBase}/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=85`,
  about: `${imageBase}/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85`,
  lifestyle: `${imageBase}/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=85`,
}
const navItems = [['Home', '#home'], ['Treatments', '#treatments'], ['About', '#about'], ['Service Areas', '#service-areas'], ['FAQ', '#faq']] as const
const treatments = [
  { number: '01', title: 'Hydration Therapy', copy: 'A considered starting point for a more replenished, restored-feeling day.', image: images.treatment },
  { number: '02', title: 'Wellness & Recovery', copy: 'Thoughtful support for the moments when your routine calls for a reset.', image: images.recovery },
  { number: '03', title: 'Vitamin & Nutrient Support', copy: 'Explore personalized options designed around your wellness goals.', image: images.nutrients },
]
const faqs = [
  ['How does mobile IV hydration work?', 'Mobile IV hydration is designed to bring a guided wellness experience to your preferred setting. A qualified provider will discuss the available options and answer questions before any service is considered.'],
  ['Where are services available?', 'Service areas are being finalized for this initial concept. Please use the booking link to check current availability and location coverage.'],
  ['How can I schedule an appointment?', 'Select “Book Through Acuity” to explore appointment options. The booking link is intentionally configurable and will be activated once the client provides the final scheduling URL.'],
  ['How can I learn which services may be appropriate for me?', 'A provider can help you understand the available options and whether a service may be a fit. This website is for general information only and is not a substitute for medical advice.'],
] as const

function Logo({ compact = false }: { compact?: boolean }) {
  const [failed, setFailed] = useState(false)
  const logoPath = `${import.meta.env.BASE_URL}assets/reign-logo.png`
  return failed ? <a className={`logo-fallback ${compact ? 'logo-fallback--compact' : ''}`} href="#home" aria-label="Reign Wellness home"><span>REIGN</span><small>WELLNESS</small></a> : <a className="logo-image-wrap" href="#home" aria-label="Reign Wellness home"><img src={logoPath} alt="Reign Wellness" onError={() => setFailed(true)} /></a>
}
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const bookingUrl = import.meta.env.VITE_ACUITY_BOOKING_URL as string | undefined
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.14 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  const bookingProps = bookingUrl ? { href: bookingUrl, target: '_blank', rel: 'noreferrer' } : { href: '#booking' }
  return <div className="site-shell">
    <div className="announcement"><span>Luxury wellness, delivered to your door.</span><a href="#treatments">Explore Treatments <ArrowUpRight size={13} /></a></div>
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><div className="header-actions"><a className="button button--nav" {...bookingProps}>Book Appointment <MoveRight size={16} /></a><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="mobile-book" {...bookingProps} onClick={() => setMenuOpen(false)}>Book Appointment <MoveRight size={16} /></a></nav>}</header>
    <main>
      <section className="hero section-pad" id="home"><div className="hero-copy"><p className="eyebrow">Mobile IV Hydration & Wellness</p><h1>Wellness,<br /><em>On Your Terms.</em></h1><p className="hero-lede">Experience personalized mobile IV hydration and wellness services designed to bring comfort and convenience to your day.</p><div className="button-row"><a className="button button--primary" href="#treatments">Explore Treatments <MoveRight size={17} /></a><a className="button button--text" {...bookingProps}>Book Your Experience <ArrowUpRight size={16} /></a></div><p className="hero-note"><span className="note-dot" /> Available by appointment</p></div><div className="hero-visual"><div className="hero-image-wrap"><img src={images.hero} alt="Serene wellness setting with a soft blue robe and glass of water" /><div className="image-caption"><span>01</span><span>Premium Mobile IV Hydration & Wellness</span></div></div><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /></div></section>
      <section className="value-strip"><div className="value-inner">{['Personalized Experiences', 'Wellness Brought to You', 'Comfort Meets Convenience'].map((item, i) => <div className="value-item" key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div></section>
      <section className="section-pad treatments-section" id="treatments"><Reveal><div className="section-intro"><div><p className="eyebrow">The Reign Experience</p><h2>Discover Your<br /><em>Wellness Experience</em></h2></div><p className="section-aside">A more personal approach to feeling your best, thoughtfully brought to you.</p></div></Reveal><div className="treatment-grid">{treatments.map((treatment) => <Reveal key={treatment.title} className="treatment-card"><div className="treatment-image"><img src={treatment.image} alt="" /><span>{treatment.number}</span></div><div className="treatment-content"><h3>{treatment.title}</h3><p>{treatment.copy}</p><a href="#booking">Learn More <ArrowUpRight size={15} /></a></div></Reveal>)}</div><p className="disclaimer"><Sparkles size={14} /> Treatment information shown for illustrative purposes and pending client approval.</p></section>
      <section className="about-section" id="about"><div className="about-image"><img src={images.about} alt="Calm, sunlit wellness room with a treatment table" /><span className="vertical-label">The Reign Philosophy</span></div><Reveal className="about-copy"><p className="eyebrow">A Thoughtful Approach</p><h2>Wellness That<br /><em>Comes To You.</em></h2><p>Reign Wellness is built around a simple idea: your wellness experience should feel personal, convenient, and thoughtfully designed. Explore mobile services that fit your lifestyle.</p><a className="inline-link" href="#how-it-works">Our Philosophy <MoveRight size={16} /></a></Reveal></section>
      <section className="steps-section section-pad" id="how-it-works"><Reveal><div className="section-intro section-intro--center"><div><p className="eyebrow">The Simple Part</p><h2>Make Space For<br /><em>Feeling Good.</em></h2></div></div></Reveal><div className="steps-grid">{[['01', 'Explore Your Options', 'Start with a look at the services designed around your needs.'], ['02', 'Choose Your Appointment', 'Find a time and setting that feel right for your day.'], ['03', 'Enjoy Your Experience', 'Settle in. Your wellness moment is on its way to you.']].map(([num, title, copy]) => <Reveal className="step" key={num}><span className="step-number">{num}</span><span className="step-icon"><Clock3 size={18} strokeWidth={1.4} /></span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>
      <section className="lifestyle-section" id="service-areas"><img src={images.lifestyle} alt="Woman resting in a calm, light-filled wellness space" /><div className="lifestyle-overlay"><p className="eyebrow">Designed Around You</p><h2>A More Personal<br /><em>Approach to Wellness.</em></h2><p>Your space. Your schedule. Your moment to recharge.</p><a className="button button--light" href="#booking">Begin Your Experience <MoveRight size={17} /></a></div></section>
      <section className="booking-section section-pad" id="booking"><Reveal><div className="booking-panel"><div><p className="eyebrow">Your Next Chapter</p><h2>Your Wellness<br /><em>Experience Begins Here</em></h2><p>Explore appointment options and find a time that works for you.</p></div><div className="booking-action">{bookingUrl ? <a className="button button--primary" {...bookingProps}>Book Through Acuity <ArrowUpRight size={16} /></a> : <><button className="button button--primary" onClick={() => document.getElementById('booking-status')?.classList.add('is-active')}>Book Through Acuity <ArrowUpRight size={16} /></button><p id="booking-status" className="booking-status">Booking coming soon — the final scheduling link will be added here.</p></>}</div></div></Reveal></section>
      <section className="faq-section section-pad" id="faq"><Reveal><div className="section-intro"><div><p className="eyebrow">Good To Know</p><h2>Questions,<br /><em>Answered.</em></h2></div><p className="section-aside">A few helpful notes for your first Reign experience.</p></div></Reveal><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={19} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Logo compact /><p>Mobile IV hydration & wellness, thoughtfully delivered.</p></div><div className="footer-links"><div><p className="footer-label">Explore</p>{navItems.slice(0, 3).map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><div><p className="footer-label">Connect</p><a href="#booking">Book an Appointment</a><span className="placeholder-label">Social links coming soon</span></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Reign Wellness</span><span>Initial concept · Client-facing prototype</span></div></footer>
  </div>
}
export default App
