/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Botanical palette
        'botanical-green': '#2C4A2E',
        'sage': '#7A9E7E',
        'cream': '#F5F0E8',
        'gold': '#C9A84C',
        'charcoal': '#1A1A1A',
        // Protein Monkey brand palette
        'monkey-orange': '#F2A934',
        'deep-orange': '#D8871F',
        'light-orange': '#F7C067',
        'dark-cocoa': '#481D07',
        'cream-white': '#FCFCF8',
        'monkey-tan': '#E6BB7A',
        'soft-cream': '#FFF7E8',
        'dark-brown': '#2B1204',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
