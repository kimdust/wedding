import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import kakaoIcon from "../assets/icons/kakaopay.png";
import copyIcon from "../assets/icons/copy.png";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
    const sectionRef = useRef(null);
    const shareUrl = "https://kimdust.me/wedding/";
    const shareImageUrl = "https://kimdust.me/wedding/wedding-preview.jpg";

    useEffect(() => {
        if (!window.Kakao) return;

        if (!window.Kakao.isInitialized()) {
        window.Kakao.init("58cda7a9780f5e890838bbad83141652");
        }
    }, []);

    const handleKakaoShare = () => {
        window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
            title: "이상훈 ❤️ 김민지 결혼식에 초대합니다",
            description: "2026년 11월 28일, 벨라루체 서울",
            imageUrl: shareImageUrl,
            link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl
            }
        },
        buttons: [
            {
            title: "청첩장 보기",
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            }
            }
        ]
        });
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert("청첩장 링크가 복사되었습니다.");
        } catch {
            alert("복사에 실패했습니다.");
        }
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
        <section className="footer" ref={sectionRef}>
            <div className="share_wrap">
                <button
                className="share_btn kakao_share"
                onClick={handleKakaoShare}
                >
                <img src={kakaoIcon} alt="카카오톡 공유하기" />
                카카오톡 공유하기
                </button>

                <div className="share_line"></div>

                <button
                className="share_btn link_share"
                onClick={handleCopyLink}
                >
                <img src={copyIcon} alt="링크 복사하기" />
                링크 복사하기
                </button>
            </div>
            <div className="last_comment">
                축하해 주신 마음 잊지 않고 행복하게 잘 살겠습니다.
            </div>
        </section>
    );
}

export default Footer;