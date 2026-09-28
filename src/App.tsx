import Architecture from './components/Architecture'
import Benchmark from './components/Benchmark'
import Evaluation from './components/Evaluation'
import Evidence from './components/Evidence'
import Experiments from './components/Experiments'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Loop from './components/Loop'
import Projects from './components/Projects'
import Workflow from './components/Workflow'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-signal focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Loop />
        <Projects />
        <Evaluation />
        <Benchmark />
        <Experiments />
        <Workflow />
        <Evidence />
        <Architecture />
      </main>
      <Footer />
    </>
  )
}
