import { useEffect, useState } from "react";

export default function Countdown() {

  const target = new Date("2026-11-28T14:00:00");

  const getTime = () => {
    const now = new Date();
    const diff = target - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="countdown_wrap">
      <div className="countdown">
        <div className="countdown_item">
          <span className="label">DAYS</span>
          <span className="num">{time.days}</span>
        </div>
        <span className="colon">:</span>
        <div className="countdown_item">
          <span className="label">HOUR</span>
          <span className="num">{pad(time.hours)}</span>
        </div>
        <span className="colon">:</span>
        <div className="countdown_item">
          <span className="label">MIN</span>
          <span className="num">{pad(time.minutes)}</span>
        </div>
        <span className="colon">:</span>
        <div className="countdown_item">
          <span className="label">SEC</span>
          <span className="num">{pad(time.seconds)}</span>
        </div>
      </div>
      <p className="countdown_text">
        상훈, 민지의 결혼식이 <strong>{time.days}</strong>일 남았습니다
      </p>
    </div>
  );
}