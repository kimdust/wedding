import Hero from "./components/Hero"
import Invitation from "./components/Invitation"
import Gallery from "./components/Gallery"
import Gift from "./components/Gift"
import Location from "./components/Location"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="page">
      <Hero />
      <div className="content">
        <Invitation />
        <Gallery />
        <Location />
        <Gift />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App