import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MenuHighlights from './components/MenuHighlights'
import Reviews from './components/Reviews'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuHighlights />
        <Reviews />
        <VisitUs />
      </main>
      <Footer />
    </>
  )
}
