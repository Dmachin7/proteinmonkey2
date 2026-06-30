import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const handleClick = (e) => {
      const link = e.target.closest('a[href*="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      const hashIndex = href.indexOf('#')
      if (hashIndex === -1) return
      const path = href.slice(0, hashIndex)
      const hash = href.slice(hashIndex)
      if (hash.length <= 1) return
      // Cross-page anchor link (e.g. "/#about" while on /menu) — let the browser navigate normally
      if (path && path !== window.location.pathname) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -80, duration: 1.5 })
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])
}
