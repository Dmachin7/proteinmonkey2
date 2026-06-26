import { motion } from 'framer-motion'

const featured = {
  quote:
    'Everything is extremely fresh and tastes amazing. You would never know you\'re eating something healthy.',
  author: 'Brittany H.',
}

const secondary = [
  {
    quote: 'The pride the owner has for his shop and customers is evident. Highly recommend.',
    author: 'Pablo A.',
  },
  {
    quote: 'Protein Monkey is a staple to Westchase and West Park Village. Couldn\'t recommend this place more.',
    author: 'Cody M.',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-24 lg:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-16 lg:mb-20"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
            What People Are Saying
          </span>
        </motion.div>

        {/* Feature pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-20 lg:mb-28"
        >
          {/* Decorative large quote mark — behind text */}
          <span
            className="absolute -top-8 -left-4 font-serif text-gold/10 select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(120px, 18vw, 220px)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative">
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-snug max-w-3xl">
              {featured.quote}
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="w-6 h-px bg-gold" />
              <div>
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/50 mr-3">
                  {featured.author}
                </span>
                <span className="text-gold text-sm">★★★★★</span>
              </div>
            </footer>
          </blockquote>
        </motion.div>

        {/* Secondary reviews — simple text, no cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 pt-12 border-t border-gold/20"
        >
          {secondary.map((r) => (
            <div key={r.author}>
              <span className="text-gold text-sm block mb-4">★★★★★</span>
              <p className="font-sans font-light text-base leading-relaxed text-charcoal/70 mb-5">
                "{r.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-gold/50" />
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal/40">
                  {r.author}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
