import heroImage from "../assets/images/hero.png";

function Hero() {
  return (
    <div
      className="hero_bg_layer"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero_inner">
        <h1>
          We're getting
          <br />
          Married
        </h1>
      </div>
    </div>
  );
}

export default Hero;