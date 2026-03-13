import { useEffect } from "react";
import kakaoIcon from "../assets/icons/kakaopay.png";
import copyIcon from "../assets/icons/copy.png";

function Footer() {
    const shareUrl = window.location.href;

    useEffect(() => {
        if (!window.Kakao) return;

        if (!window.Kakao.isInitialized()) {
        window.Kakao.init("58cda7a9780f5e890838bbad83141652");
        }
    }, []);

    const handleKakaoShare = () => {
        if (!window.Kakao) return;

        window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
            title: "이상훈 ❤️ 김민지 결혼식에 초대합니다",
            description: "2026년 11월 28일, 벨라루체 서울",
            imageUrl: `${window.location.origin}/wedding-preview.jpg`,
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

    return (
        <section className="footer">
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