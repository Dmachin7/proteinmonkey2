import { Instagram, Facebook } from 'lucide-react'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Order', href: '#order' },
  { label: 'Visit Us', href: '#visit' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/proteinmonkey/',
    Icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/proteinmonkey/',
    Icon: Facebook,
  },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <img
              src={logo}
              alt="Protein Monkey"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="font-serif italic text-cream/60 text-sm">
              Fueling Tampa, one shake at a time.
            </p>
          </div>

          {/* Nav links */}
          <ul className="flex flex-wrap gap-6 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-sans text-xs tracking-widest uppercase text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream/50 hover:text-gold transition-colors duration-200"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div className="w-full h-px bg-gold/20 mb-8" />

        {/* Copyright */}
        <p className="font-sans text-xs text-cream/30 tracking-widest text-center">
          © 2025 Protein Monkey. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
