import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowDown from "../assets/icons/arrow-down.png";
import arrowLeft from "../assets/icons/arrow-left.png";
import arrowRight from "../assets/icons/arrow-right.png";
import closeIcon from "../assets/icons/close.png";

import img1 from "../assets/images/gallery/gallery1.jpg";
import img2 from "../assets/images/gallery/gallery2.jpg";
import img3 from "../assets/images/gallery/gallery3.jpg";
import img4 from "../assets/images/gallery/gallery4.jpg";
import img5 from "../assets/images/gallery/gallery5.jpg";
import img6 from "../assets/images/gallery/gallery6.jpg";
import img7 from "../assets/images/gallery/gallery7.jpg";
import img8 from "../assets/images/gallery/gallery8.jpg";
import img9 from "../assets/images/gallery/gallery9.jpg";
import img10 from "../assets/images/gallery/gallery10.jpg";
import img11 from "../assets/images/gallery/gallery11.jpg";
import img12 from "../assets/images/gallery/gallery12.jpg";
import img13 from "../assets/images/gallery/gallery13.jpg";
import img14 from "../assets/images/gallery/gallery14.jpg";
import img15 from "../assets/images/gallery/gallery15.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15
];

export default function Gallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sectionRef = useRef(null);

  const visibleImages = isExpanded ? images : images.slice(0, 6);

  const openModal = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <section
        ref={sectionRef}
        className={`gallery ${!isExpanded ? "is-collapsed" : ""}`}
      >
        <h2>GALLERY</h2>

        <div className={`gallery_wrap ${!isExpanded ? "collapsed" : ""}`}>
          {visibleImages.map((image, index) => (
            <button
              type="button"
              key={index}
              className="gallery_item"
              onClick={() => openModal(index)}
            >
              <img src={image} alt={`gallery ${index + 1}`} />
            </button>
          ))}
        </div>

        {!isExpanded && images.length > 6 && (
          <button
            type="button"
            className="gallery_more"
            onClick={() => setIsExpanded(true)}
          >
            <span>더보기</span>
            <img src={arrowDown} alt="" />
          </button>
        )}
      </section>

      {selectedIndex !== null && (
        <div className="gallery_modal" onClick={closeModal}>
          <button
            type="button"
            className="gallery_close"
            onClick={closeModal}
          >
            <img src={closeIcon} alt="닫기" />
          </button>

          <button
            type="button"
            className="gallery_nav gallery_prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <img src={arrowLeft} alt="이전" />
          </button>

          <div
            className="gallery_modal_content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]}
              alt={`gallery large ${selectedIndex + 1}`}
            />
          </div>

          <button
            type="button"
            className="gallery_nav gallery_next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <img src={arrowRight} alt="다음" />
          </button>
        </div>
      )}
    </>
  );
}