import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import imgWaffles from '../assets/menu-waffles.jpg'
import imgShake from '../assets/ProteinShake.jpg'
import imgTea from '../assets/menu-loaded-tea.jpg'
import imgCoffee from '../assets/menu-protein-coffee.jpg'

gsap.registerPlugin(ScrollTrigger, SplitText)

const menuItems = [
  {
    num: '01',
    category: 'Protein Waffles',
    menuId: 'waffles',
    description: 'Crispy on the outside, macro-friendly on the inside. A Protein Monkey staple.',
    image: imgWaffles,
    alt: 'Protein Monkey waffles with strawberries and chocolate drizzle',
    objectPosition: 'center',
  },
  {
    num: '02',
    category: 'Protein Shakes',
    menuId: 'shakes',
    description: 'Thick, indulgent, and loaded with protein. From classics to seasonal creations.',
    image: imgShake,
    alt: 'Protein Monkey seasonal protein shake',
    objectPosition: 'center',
  },
  {
    num: '03',
    category: 'Loaded Teas',
    menuId: 'juice-tea',
    description: 'Energizing, refreshing, and made with real fruit. As beautiful as they are delicious.',
    image: imgTea,
    alt: 'Protein Monkey peach loaded tea',
    objectPosition: 'center',
  },
  {
    num: '04',
    category: 'Protein Coffee',
    menuId: 'coffee',
    description: 'Your morning ritual, elevated. Rich cold coffee blended with protein.',
    image: imgCoffee,
    alt: 'Protein Monkey iced protein coffee',
    objectPosition: 'center',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function MenuCard({ item }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/menu#${item.menuId}`} className="block">
        {/* Image */}
        <div className="overflow-hidden aspect-[4/3]">
          <motion.img
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: item.objectPosition }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Text */}
        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif italic text-monkey-orange/60 text-sm select-none">{item.num}</span>
            <div className="w-4 h-px bg-monkey-orange/30" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-charcoal mb-2 leading-snug">
            {item.category}
          </h3>
          <p className="font-sans font-light text-sm leading-relaxed text-charcoal/60">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

export default function MenuHighlights() {
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
    <section id="menu" className="bg-cream py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 lg:mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div ref={lineRef} className="w-8 h-px bg-monkey-orange origin-left" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-monkey-orange">The Menu</span>
          </div>
          <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl font-semibold text-charcoal leading-tight">
            Crafted With Care
          </h2>
          <p className="font-sans font-light text-sm text-charcoal/50 mt-2 tracking-wide">
            Every item made fresh, every time.
          </p>
        </motion.div>

        {/* ── Desktop: 2×2 grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="hidden md:grid grid-cols-2 gap-6 lg:gap-8"
        >
          {menuItems.map((item) => (
            <MenuCard key={item.category} item={item} />
          ))}
        </motion.div>

        {/* ── Mobile: horizontal scroll carousel ── */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide">
            {menuItems.map((item) => (
              <Link
                key={item.category}
                to={`/menu#${item.menuId}`}
                className="snap-start flex-shrink-0 w-[80vw]"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: item.objectPosition }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-serif italic text-monkey-orange/60 text-sm select-none">{item.num}</span>
                      <div className="w-4 h-px bg-monkey-orange/30" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal mb-1.5 leading-snug">
                      {item.category}
                    </h3>
                    <p className="font-sans font-light text-sm leading-relaxed text-charcoal/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Swipe hint */}
          <p className="text-center font-sans text-xs text-charcoal/30 tracking-widest uppercase mt-1">
            Swipe to explore
          </p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link
            to="/menu"
            className="inline-block px-8 py-3.5 border border-monkey-orange text-monkey-orange font-sans font-light tracking-widest text-sm uppercase hover:bg-monkey-orange hover:text-cream transition-all duration-300"
          >
            See Full Menu
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
