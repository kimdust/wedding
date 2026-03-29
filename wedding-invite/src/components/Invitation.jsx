import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Calendar from "../components/Calendar";
import Countdown from "../components/Countdown";

gsap.registerPlugin(ScrollTrigger);

function Invitation() {
  const sectionRef = useRef(null);
  const inviteTxtRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inviteTxtRef.current,
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
            trigger: inviteTxtRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            // markers: true,
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
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
            trigger: infoRef.current,
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
    <section className="invitation" ref={sectionRef}>
      <div className="invitation_txt" ref={inviteTxtRef}>
        <div className="intro">
          <p>
            함께 보내는 여덟 번째 가을,
            <br />
            저희 두 사람은 이제
            <br />
            평생을 의지할 부부가 되어
            <br />
            새로운 길을 걸어가보려 합니다.
            <br />
            <br />
            행복으로 가득한 날,
            <br />
            저희의 새로운 시작을 응원해 주세요.
          </p>
        </div>

        <div className="name">
          <div className="name_item">
            <p>이병저 ∙ 김혜경</p>
            <span>의 장남</span>
            <strong>이상훈</strong>
          </div>
          <div className="name_item">
            <p>배경진</p>
            <span>의 장녀</span>
            <strong>김민지</strong>
          </div>
        </div>
      </div>

      <div className="invitation_info" ref={infoRef}>
        <div className="calendar">
          <p>
            2026년 11월 28일(토) 14시
            <br />
            <strong>벨라루체 서울 7F 플로체홀</strong>
          </p>
          <Calendar />
        </div>

        <Countdown />
      </div>
    </section>
  );
}

export default Invitation;