import ProgressBar from './components/ProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#perfil" className="skip-link">Saltar al contenido</a>
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <div className="container" aria-hidden="true"><div className="divider" /></div>
        <About />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </>
  )
}
