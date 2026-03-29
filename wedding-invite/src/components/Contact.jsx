import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import sampleImg from "../assets/images/sample.jpg";
import callIcon from "../assets/icons/call.png";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const manPhone = "01031667652";
  const womanPhone = "01063921098";

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            // markers: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" ref={sectionRef}>
      <h2>CONTACT</h2>
      <div className="contact_wrap">
        <div className="contact_item man">
          <img src={sampleImg} alt="샘플" />
          <button className="contact_btn man_contact" onClick={() => handleCall(manPhone)}>
            <img src={callIcon} alt="신랑에게 연락하기" />
            신랑에게 연락하기
          </button>
        </div>
        <div className="contact_item woman">
          <img src={sampleImg} alt="샘플" />
          <button className="contact_btn woman_contact" onClick={() => handleCall(womanPhone)}>
            <img src={callIcon} alt="신부에게 연락하기" />
            신부에게 연락하기
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact