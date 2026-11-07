import { useEffect, type RefObject } from 'react'

/** Enhance visible content only when motion is supported; no scroll interception. */
export function useSiteMotion(root: RefObject<HTMLElement | null>, page: string, enabled: boolean) {
  useEffect(() => {
    const container = root.current
    if (!enabled || !container || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    // Keep hero-art out: parent opacity/translate isolates the bags' multiply blending.
    const targets = Array.from(container.querySelectorAll<HTMLElement>(
      '.hero-copy > *, .brand-ribbon, .section-heading, .product-card, .water-sculpture, .care-grid > div:last-child, .step, .membership-card, .founder-panel, .founder-copy, .area-grid > div, .faq-section > div:first-child, .faq-list details, .final-cta, .menu-intro > *, .detail-header, .detail-image, .detail-copy, .detail-next, .addon-booking-note, .addon-table, .medications, .service-crosslink'
    ))
    const clear = () => {
      observer?.disconnect()
      targets.forEach(target => {
        target.classList.remove('motion-reveal', 'motion-visible')
        target.style.removeProperty('--reveal-delay')
      })
    }
    const setup = () => {
      clear()
      if (preference.matches) return
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-visible')
          observer?.unobserve(entry.target)
        })
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
      targets.forEach(target => {
        const siblings = Array.from(target.parentElement?.children ?? [])
        const staggered = target.matches('.product-card, .step, .membership-card, .faq-list details, .hero-copy > *, .menu-intro > *')
        target.style.setProperty('--reveal-delay', `${staggered ? Math.min(siblings.indexOf(target) % 3, 2) * 70 : 0}ms`)
        target.classList.add('motion-reveal')
        observer?.observe(target)
      })
    }
    setup()
    preference.addEventListener('change', setup)
    return () => { clear(); preference.removeEventListener('change', setup) }
  }, [root, page, enabled])
}
