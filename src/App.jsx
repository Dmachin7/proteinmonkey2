import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MenuHighlights from './components/MenuHighlights'
import Reviews from './components/Reviews'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import useSmoothScroll from './hooks/useSmoothScroll'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <MenuHighlights />
      <Reviews />
      <VisitUs />
    </main>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
