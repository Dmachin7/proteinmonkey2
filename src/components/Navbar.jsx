import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/Logo.png'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/menu', isRoute: true },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Order', href: '/#visit' },
  { label: 'Visit Us', href: '/#visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const solid = scrolled || menuOpen || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* SVG filter: dark brown → #F2A934 orange, light cream → white (used when over hero) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="nav-logo-color" colorInterpolationFilters="sRGB">
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cream/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="Protein Monkey"
            className="h-11 w-auto object-contain transition-all duration-500"
            style={{
              filter: solid
                ? 'brightness(0) invert(67%) sepia(52%) saturate(834%) hue-rotate(352deg) brightness(99%) contrast(102%)'
                : 'url(#nav-logo-color)',
            }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.isRoute ? (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`relative text-sm font-light tracking-widest uppercase group transition-colors duration-300 ${
                    solid ? 'text-charcoal hover:text-botanical-green' : 'text-cream/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative text-sm font-light tracking-widest uppercase group transition-colors duration-300 ${
                    solid ? 'text-charcoal hover:text-botanical-green' : 'text-cream/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            )
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-px origin-center transition-colors ${solid ? 'bg-charcoal' : 'bg-cream'}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`block w-6 h-px ${solid ? 'bg-charcoal' : 'bg-cream'}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-px origin-center ${solid ? 'bg-charcoal' : 'bg-cream'}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-cream border-t border-gold/20 overflow-hidden"
          >
            <ul className="flex flex-col py-6 px-6 gap-6">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-charcoal text-base font-light tracking-widest uppercase hover:text-botanical-green transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-charcoal text-base font-light tracking-widest uppercase hover:text-botanical-green transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
