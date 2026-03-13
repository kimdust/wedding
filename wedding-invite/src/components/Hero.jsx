import heroImage from "../assets/images/hero.png"
import arrowDown from "../assets/icons/arrow-down.png"

function Hero() {
    return (
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <h1>
                We're getting
                <br />
                Married
            </h1>
            <div className="hero-scroll">
                <img src={arrowDown} alt="scroll" />
                <p>SCROLL</p>
            </div>
        </section>
    )
}

export default Hero