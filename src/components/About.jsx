import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import imgInterior from '../assets/about-photo.jpg'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function About() {
  const lineRef = useRef(null)
  const headingRef = useRef(null)
  const imgWrapRef = useRef(null)
  const wipeRef = useRef(null)
  const photoRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: 'power2.out',
          transformOrigin: 'left',
          scrollTrigger: { trigger: lineRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      const split = new SplitText(headingRef.current, { type: 'lines', linesClass: 'overflow-hidden' })
      gsap.fromTo(
        split.lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      gsap.set(photoRef.current, { scale: 1.2 })
      gsap.timeline({
        scrollTrigger: { trigger: imgWrapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
        .to(wipeRef.current, { scaleX: 0, duration: 1.1, ease: 'power3.inOut', transformOrigin: 'right' })
        .to(photoRef.current, { scale: 1, duration: 1.4, ease: 'power3.out' }, '-=1.0')

      return () => split.revert()
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="bg-cream py-28 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

          {/* Left: Text — the primary column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div ref={lineRef} className="w-8 h-px bg-gold origin-left" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">Our Story</span>
            </div>

            {/* Large editorial heading */}
            <h2 ref={headingRef} className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal leading-[1.05] mb-8">
              A Space Made
              <br />
              <em className="not-italic text-botanical-green">With Intention</em>
            </h2>

            <p className="font-sans font-light text-base md:text-lg leading-relaxed text-charcoal/70 max-w-xl mb-12">
              Protein Monkey isn't just a café — it's an experience. Owners Luis and Emily designed
              every detail of this space to make you feel something. From the living green wall to
              the rattan lights overhead, everything here is intentional. And the food? Just as
              thoughtful. Fresh ingredients, macro-friendly options, and flavors that make healthy
              eating feel like a treat.
            </p>

            {/* Callouts — inline, no badges */}
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-botanical-green/70 font-medium">
              🌿 Family Owned &nbsp;·&nbsp; 🐾 Dog Friendly &nbsp;·&nbsp; 📊 Macro Friendly
            </p>
          </motion.div>

          {/* Right: Product photo — offset upward into the hero space */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:-mt-32 relative"
          >
            <div ref={imgWrapRef} className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
              <img
                ref={photoRef}
                src={imgInterior}
                alt="Protein Monkey interior — checkered floors, rattan lights, living green wall"
                className="w-full h-full object-cover"
              />
              <div ref={wipeRef} className="absolute inset-0 bg-botanical-green origin-right" aria-hidden="true" />
            </div>
            {/* Subtle gold frame offset */}
            <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border border-gold/25 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
