import { useEffect, useRef } from "react";
import copyLocation from "../assets/icons/copy.png";
import tMap from "../assets/icons/tmap.png";
import kakaoNav from "../assets/icons/kakao.png";
import naverNav from "../assets/icons/naver.png";

function Location() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let intervalId;

    const createMap = () => {
      if (!window.kakao?.maps || !mapContainerRef.current || mapRef.current) {
        return;
      }

      const position = new window.kakao.maps.LatLng(37.5898429, 127.0599604);

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

      return () => {
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
    };
  }, []);

  const ADDRESS = "서울특별시 동대문구 망우로 61";
  const LAT = 37.5898429;
  const LNG = 127.0599604;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      alert("주소가 복사되었습니다.");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = ADDRESS;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("주소가 복사되었습니다.");
    }
  };

  const openTmap = () => {
    const url = `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx&name=벨라루체서울&lon=${LNG}&lat=${LAT}`;
    window.open(url);
  };

  const openKakaoNav = () => {
    const url = `kakaonavi://navigate?name=벨라루체서울&x=${LNG}&y=${LAT}`;
    window.location.href = url;
  };

  const openNaverMap = () => {
    const url = `nmap://place?lat=${LAT}&lng=${LNG}&name=벨라루체서울&appname=wedding`;
    window.location.href = url;
  };

  return (
    <section className="location">
      <h2>LOCATION</h2>

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
          <p className="location_info_content">서울특별시 동대문구 망우로 61, 벨라루체 서울</p>
          <div className="location_btn_wrap">
            <button className="location_btn copy_location" onClick={copyAddress}>
              <img src={copyLocation} alt="copy location" />
              주소 복사
            </button>
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
        <p className="location_info_content">1호선·경의중앙선·경춘선  회기역  하차 - 2번 출구</p>
        <div className="location_line"></div>
        <p className="location_info_title">버스 이용 시</p>
        <p className="location_info_content">
          간선버스 : 105, 201, 202, 241, 260, 270, 271, 272
          <br />
          지선버스 : 1213, 1224, 1227, 2115, 2211
        </p>
      </div>
    </section>
  );
}

export default Location;