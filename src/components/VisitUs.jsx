import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function VisitUs() {
  const lineRef = useRef(null)
  const headingRef = useRef(null)

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
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      return () => split.revert()
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="visit" className="bg-cream py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div ref={lineRef} className="w-8 h-px bg-gold origin-left" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">Find Us</span>
            </div>

            <h2 ref={headingRef} className="font-serif text-5xl md:text-6xl font-semibold text-charcoal leading-tight mb-5">
              Come Find Us
            </h2>

            <p className="font-sans font-light text-base text-charcoal/55 leading-relaxed mb-12 max-w-sm">
              Tucked into the heart of West Park Village — come for the shakes, stay for the atmosphere. Dogs welcome.
            </p>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-2">Address</p>
                <p className="font-sans font-light text-base text-charcoal/80 leading-relaxed">
                  10110 Montague St<br />
                  Tampa, FL 33626
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-2">Hours</p>
                <p className="font-sans font-light text-base text-charcoal/80 leading-relaxed">
                  Monday – Saturday: 9 AM – 5 PM<br />
                  Sunday: 10 AM – 3 PM
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-2">Phone</p>
                <a
                  href="tel:+17863763441"
                  className="font-sans font-light text-base text-charcoal/80 hover:text-botanical-green transition-colors duration-200"
                >
                  (786) 376-3441
                </a>
              </div>
            </div>

            {/* DoorDash — natural continuation of contact info */}
            <div className="mt-12 pt-10 border-t border-gold/20">
              <p className="font-sans font-light text-sm text-charcoal/50 mb-5 tracking-wide">
                Can't make it in? Order ahead.
              </p>
              <a
                href="https://www.doordash.com/store/protein-monkey-tampa-23748556/24404582/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 rounded-xl font-sans font-semibold text-white text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-85 hover:scale-[1.02] active:scale-100"
                style={{ backgroundColor: '#FF3008' }}
              >
                Order on DoorDash
              </a>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[520px] bg-botanical-green shadow-xl"
          >
            <iframe
              title="Protein Monkey location"
              src="https://maps.google.com/maps?q=Protein+Monkey,+10110+Montague+St,+Tampa,+FL+33626&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
