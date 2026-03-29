import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tMap from "../assets/icons/tmap.png";
import kakaoNav from "../assets/icons/kakao.png";
import naverNav from "../assets/icons/naver.png";

gsap.registerPlugin(ScrollTrigger);

function Location() {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const LAT = 37.5898429;
  const LNG = 127.0599604;
  const PLACE_NAME = "벨라루체 서울";
  const ADDRESS = "서울특별시 동대문구 망우로 61, 벨라루체 서울";

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
    let intervalId;
    let removeResizeListener;

    const createMap = () => {
      if (!window.kakao?.maps || !mapContainerRef.current || mapRef.current) {
        return;
      }

      const position = new window.kakao.maps.LatLng(LAT, LNG);

      const map = new window.kakao.maps.Map(mapContainerRef.current, {
        center: position,
        level: 4,
      });

      new window.kakao.maps.Marker({
        map,
        position,
      });

      setTimeout(() => {
        map.relayout();
        map.setCenter(position);
      }, 0);

      map.setZoomable(false);
      mapRef.current = map;

      const handleResize = () => {
        if (!mapRef.current) return;
        const center = mapRef.current.getCenter();
        mapRef.current.relayout();
        mapRef.current.setCenter(center);
      };

      window.addEventListener("resize", handleResize);
      removeResizeListener = () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    const tryLoadMap = () => {
      if (!window.kakao?.maps) return;
      window.kakao.maps.load(() => {
        createMap();
      });
    };

    tryLoadMap();

    intervalId = window.setInterval(() => {
      if (mapRef.current) {
        clearInterval(intervalId);
        return;
      }
      tryLoadMap();
    }, 100);

    return () => {
      clearInterval(intervalId);
      if (removeResizeListener) removeResizeListener();
    };
  }, []);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const openAppOrFallback = (appUrl, fallbackUrl) => {
    if (!isMobile) {
      window.open(fallbackUrl, "_blank");
      return;
    }

    const start = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - start < 1800) {
        window.location.href = fallbackUrl;
      }
    }, 1200);
  };

  const openTmap = () => {
    const appUrl = `tmap://route?goalx=${LNG}&goaly=${LAT}&goalname=${encodeURIComponent(
      PLACE_NAME
    )}`;

    window.location.href = appUrl;
  };

  const openKakaoNav = () => {
    const appUrl = `kakaonavi://navigate?name=${encodeURIComponent(
      PLACE_NAME
    )}&x=${LNG}&y=${LAT}&coord_type=wgs84`;

    const fallbackUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
      ADDRESS
    )}`;

    openAppOrFallback(appUrl, fallbackUrl);
  };

  const openNaverMap = () => {
    const appName = encodeURIComponent(
      window.location.origin + window.location.pathname
    );

    const appUrl = `nmap://place?lat=${LAT}&lng=${LNG}&name=${encodeURIComponent(
      PLACE_NAME
    )}&appname=${appName}`;

    const fallbackUrl = `https://map.naver.com/p/search/${encodeURIComponent(
      ADDRESS
    )}`;

    openAppOrFallback(appUrl, fallbackUrl);
  };

  return (
    <section className="location" ref={sectionRef}>
      <h2>LOCATION</h2>

      <div className="location_wrap">
        <div className="map_wrap">
          <div ref={mapContainerRef} className="kakao_map" />
        </div>

        <div className="location_info">
          <div className="location_info_item">
            <p className="location_info_title">자가용 이용 시</p>
            <p className="location_info_desc">
              * 주말 차량 증가로 인해 혼잡이 예상되오니 가급적 대중교통을 이용해 주시기 바랍니다.
              <br />
              * 2시간 무료 주차
            </p>
            <p className="location_info_content">{ADDRESS}</p>

            <div className="location_btn_wrap">
              <button className="location_btn t_map" onClick={openTmap}>
                <img src={tMap} alt="t map" />
                티맵
              </button>

              <button className="location_btn kakao_nav" onClick={openKakaoNav}>
                <img src={kakaoNav} alt="kakao navigation" />
                카카오네비
              </button>

              <button className="location_btn naver_nav" onClick={openNaverMap}>
                <img src={naverNav} alt="naver navigation" />
                네이버지도
              </button>
            </div>
          </div>

          <div className="location_line"></div>
          <p className="location_info_title">지하철 이용 시</p>
          <p className="location_info_content">
            1호선·경의중앙선·경춘선 회기역 하차 - 2번 출구
          </p>

          <div className="location_line"></div>
          <p className="location_info_title">버스 이용 시</p>
          <p className="location_info_content">
            간선버스 : 105, 201, 202, 241, 260, 270, 271, 272
            <br />
            지선버스 : 1213, 1224, 1227, 2115, 2211
          </p>
        </div>
      </div>
    </section>
  );
}

export default Location;