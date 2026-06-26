import { motion } from 'framer-motion'
import interior from '../assets/about-photo.jpg'
import logo from '../assets/Logo.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background photo */}
      <img
        src={interior}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Botanical green overlay — lets the space breathe through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(44,74,46,0.62) 0%, rgba(44,74,46,0.68) 60%, rgba(26,26,26,0.85) 100%)',
        }}
      />

      {/* SVG filter: maps dark brown → #F2A934 orange, light cream → white */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="hero-logo-color" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.0179 0.0601 0.0061 0 0.937
                      0.1182 0.3977 0.0402 0 0.583
                      0.2796 0.9405 0.0950 0 0.016
                      0      0      0      1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <motion.img
          {...fadeUp(0.1)}
          src={logo}
          alt="Protein Monkey"
          className="h-20 md:h-28 w-auto object-contain mb-10"
          style={{ filter: 'url(#hero-logo-color)' }}
        />

        <motion.h1
          {...fadeUp(0.3)}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6"
        >
          Where Wellness
          <br />
          Meets Luxury
        </motion.h1>

        <motion.p
          {...fadeUp(0.5)}
          className="font-sans text-base md:text-lg font-light text-cream/75 tracking-wide max-w-md mb-12"
        >
          Fresh. Intentional. Unforgettable.
          <br />
          Tampa's most beautiful healthy café.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.a
            {...fadeUp(0.65)}
            href="#menu"
            className="px-8 py-3.5 border border-monkey-orange text-monkey-orange font-sans font-light tracking-widest text-sm uppercase hover:bg-monkey-orange hover:text-dark-cocoa transition-all duration-300"
          >
            Explore Our Menu
          </motion.a>
          <motion.a
            {...fadeUp(0.78)}
            href="https://www.doordash.com/store/protein-monkey-tampa-23748556/24404582/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 font-sans font-semibold tracking-widest text-sm uppercase text-dark-cocoa transition-all duration-300 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #F2A934 0%, #F7C067 100%)' }}
          >
            Order on DoorDash
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">Scroll</span>
        <motion.div
          className="w-px h-10 bg-cream/30"
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
