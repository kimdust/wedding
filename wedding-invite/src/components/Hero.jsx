import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../assets/images/hero.png";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <img className="hero_img" src={heroImage} alt="Our Wedding Day" />
      <div className="hero_title" ref={titleRef}>
        <p className="hero_title_font1">OUR</p>
        <p className="hero_title_font2">WEDDING</p>
        <p className="hero_title_font1">DAY</p>
      </div>
    </section>
  );
}

export default Hero;