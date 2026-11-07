import { useEffect, useRef, useState } from 'react'

export function WaterSculpture() {
  const sculpture = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!sculpture.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    observer.observe(sculpture.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={sculpture} className={`water-sculpture ${visible ? 'water-sculpture--visible' : ''}`} aria-hidden="true">
    <div className="water-sculpture__aura" />
    <div className="water-sculpture__orbit water-sculpture__orbit--back" />
    <div className="water-sculpture__float">
      <div className="water-sculpture__body"><div className="water-sculpture__light" /><div className="water-sculpture__current" /><div className="water-sculpture__rim" /></div>
    </div>
    <div className="water-sculpture__bead water-sculpture__bead--one" />
    <div className="water-sculpture__bead water-sculpture__bead--two" />
    <div className="water-sculpture__bead water-sculpture__bead--three" />
    <div className="water-sculpture__pool"><i /><i /><i /></div>
    <div className="water-sculpture__caption"><span>THE ART OF FEELING WELL</span><p>A little more <em>flow.</em></p></div>
  </div>
}
