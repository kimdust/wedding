import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowDown from "../assets/icons/arrow-down2.png";
import arrowUp from "../assets/icons/arrow-up.png";
import kakaoPay from "../assets/icons/kakaopay.png";
import copyIcon from "../assets/icons/copy.png";

gsap.registerPlugin(ScrollTrigger);

function Gift() {
  const sectionRef = useRef(null);
  const [isManOpen, setIsManOpen] = useState(false);
  const [isWomanOpen, setIsWomanOpen] = useState(false);

  const manAccount = "1002-840860-680";
  const womanAccount = "1002-840860-680";

  const manKakaoPayLink = "https://qr.kakaopay.com/Ej7ngT3kk";
  const womanKakaoPayLink = "https://qr.kakaopay.com/Ej7ngT3kk";

  const handleCopyAccount = async (accountNumber) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      alert("계좌번호가 복사되었습니다.");
    } catch (error) {
      console.error("복사 실패:", error);
      alert("복사에 실패했습니다.");
    }
  };

  const handleKakaoPay = (link) => {
    if (!link || !link.startsWith("https://qr.kakaopay.com/")) {
      alert("카카오페이 송금 링크를 먼저 입력해주세요.");
      return;
    }

    window.open(link, "_blank");
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
    <section className="gift" ref={sectionRef}>
      <h2>A Gift of Love</h2>
      <p>
        멀리서도 축하의 마음을
        <br />
        전하고 싶으신 분들을 위해
        <br />
        계좌번호를 안내드립니다.
        <br />
        <br />
        소중한 축하를 보내주셔서 감사드리며,
        <br />
        따뜻한 마음에 깊이 감사드립니다.
      </p>
      <div className="account">
        <div className="man_account">
          <button
            type="button"
            className="account_title"
            onClick={() => setIsManOpen((prev) => !prev)}
          >
            <span>신랑 측</span>
            <img
              src={isManOpen ? arrowUp : arrowDown}
              alt={isManOpen ? "접기" : "펼치기"}
            />
          </button>
          <div className={`account_content ${isManOpen ? "open" : ""}`}>
            <div className="account_content_inner">
              <div className="account_line"></div>
              <div className="account_info">
                <div className="account_number">
                  <strong>우리은행</strong>
                  <span>1002-840860-680</span>
                </div>
                <div className="account_name">
                  <strong>신랑</strong>
                  <span>이상훈</span>
                </div>
              </div>
              <div className="account_btn_wrap">
                <button className="account_btn kakaopay" onClick={() => handleKakaoPay(manKakaoPayLink)}>
                  <img src={kakaoPay} alt="카카오페이" />
                  카카오페이 송금
                </button>
                <button className="account_btn account_copy" onClick={() => handleCopyAccount(manAccount)}>
                  <img src={copyIcon} alt="계좌번호 복사" />
                  계좌번호 복사
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="woman_account">
          <button
            type="button"
            className="account_title"
            onClick={() => setIsWomanOpen((prev) => !prev)}
          >
            <span>신부 측</span>
            <img
              src={isWomanOpen ? arrowUp : arrowDown}
              alt={isWomanOpen ? "접기" : "펼치기"}
            />
          </button>
          <div className={`account_content ${isWomanOpen ? "open" : ""}`}>
            <div className="account_content_inner">
              <div className="account_line"></div>
              <div className="account_info">
                <div className="account_number">
                  <strong>우리은행</strong>
                  <span>1002-840860-680</span>
                </div>
                <div className="account_name">
                  <strong>신부</strong>
                  <span>김민지</span>
                </div>
              </div>
              <div className="account_btn_wrap">
                <button className="account_btn kakaopay" onClick={() => handleKakaoPay(womanKakaoPayLink)}>
                  <img src={kakaoPay} alt="카카오페이" />
                  카카오페이 송금
                </button>
                <button className="account_btn account_copy" onClick={() => handleCopyAccount(womanAccount)}>
                  <img src={copyIcon} alt="계좌번호 복사" />
                  계좌번호 복사
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gift;