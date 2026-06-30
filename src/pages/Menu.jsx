import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { menuCategories } from '../data/menuData'

gsap.registerPlugin(ScrollTrigger)

function MenuItemCard({ item, num }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-serif italic text-monkey-orange/60 text-sm select-none">{num}</span>
        <div className="w-4 h-px bg-monkey-orange/30" />
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug">{item.name}</h3>
        <span className="flex-shrink-0 font-sans text-sm font-medium text-gold whitespace-nowrap mt-1">
          {item.price}
        </span>
      </div>
      {item.description && (
        <p className="font-sans font-light text-sm leading-relaxed text-charcoal/60">{item.description}</p>
      )}
    </div>
  )
}

export default function Menu() {
  const lineRef = useRef(null)
  const headingRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: 'left', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="bg-cream min-h-screen">
      {/* Page header */}
      <section className="bg-botanical-green pt-36 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div ref={lineRef} className="w-8 h-px bg-gold origin-left" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">The Full Menu</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 ref={headingRef} className="font-serif text-5xl md:text-6xl font-semibold text-cream leading-tight">
            Our Menu
          </h1>
          <p className="mt-5 font-sans font-light text-base md:text-lg text-cream/70 max-w-xl mx-auto">
            Thoughtfully made, protein-forward, and just as beautiful as it is good for you.
          </p>
        </motion.div>
      </section>

      {/* Sticky category tabs */}
      <nav
        className="sticky top-20 z-30 bg-cream/95 backdrop-blur-md border-b border-gold/20"
        aria-label="Menu categories"
      >
        <ul className="flex items-center gap-1 px-4 sm:px-6 py-3 overflow-x-auto scrollbar-hide max-w-5xl mx-auto">
          {menuCategories.map((cat) => (
            <li key={cat.id} className="flex-shrink-0">
              <a
                href={`#${cat.id}`}
                className="block px-4 py-2 font-sans text-xs tracking-[0.15em] uppercase whitespace-nowrap text-charcoal/60 hover:text-botanical-green transition-colors duration-200"
              >
                {cat.tab}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
        {menuCategories.map((cat) => (
          <motion.section
            id={cat.id}
            key={cat.id}
            className="scroll-mt-36"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mb-2">{cat.label}</h2>
            {cat.note && (
              <p className="font-sans font-light text-sm italic text-charcoal/50 mb-7">{cat.note}</p>
            )}
            <div className={`grid sm:grid-cols-2 gap-5 ${cat.note ? '' : 'mt-7'}`}>
              {cat.items.map((item, i) => (
                <MenuItemCard key={item.name} item={item} num={String(i + 1).padStart(2, '0')} />
              ))}
            </div>

            {cat.id === 'kids' && (
              <p className="mt-7 font-sans font-light text-sm italic text-charcoal/50">
                Ask about our gluten-free and dairy-free options
              </p>
            )}
          </motion.section>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 pb-24 text-center">
        <p className="font-sans font-light text-sm text-charcoal/45 max-w-md mx-auto">
          Menu items and pricing may vary. Visit us in Tampa, FL for the full experience.
        </p>
      </div>
    </main>
  )
}
