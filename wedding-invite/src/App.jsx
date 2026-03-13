import Hero from "./components/Hero"
import Invitation from "./components/Invitation"
import Gallery from "./components/Gallery"
import Gift from "./components/Gift"
import Location from "./components/Location"
import Contact from "./components/Contact"

function App() {
  return (
    <div className="container">
      <Hero />
      <Invitation />
      <Gallery />
      <Gift />
      <Location />
      <Contact />
    </div>
  )
}

export default App