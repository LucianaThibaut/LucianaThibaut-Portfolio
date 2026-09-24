import ProgressBar from './components/ProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Competencies from './components/Competencies'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#perfil" className="skip-link">Saltar al contenido</a>
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Competencies />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
