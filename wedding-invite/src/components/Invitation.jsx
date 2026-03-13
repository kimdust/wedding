import calendar from "../assets/images/calendar.png"

function Invitation() {
  return (
    <section className="invitation">
      <h2>INVITATION</h2>
      <div className="intro">
        <p>
          나의 생애는
          <br />
          모든 지름길을 돌아서
          <br />
          네게로 난 단 하나의 에움길이었다.
          </p>
          <span>푸른 밤, 나희덕</span>
      </div>
      <div className="line"></div>
      <div className="name">
        <div className="name_item">
          <p>이병저 ∙ 김혜경</p>
          <span>의 장남</span>
          <strong>이상훈</strong>
        </div>
        <div className="name_item">
          <p>유승종 ∙ 배경진</p>
          <span>의 장녀</span>
          <strong>김민지</strong>
        </div>
      </div>
      <div className="line"></div>
      <div className="calendar">
        <p>
          2026년 11월 28일(토) 14시
          <br />
          <strong>벨라루체 서울 7F 플로체홀</strong>
        </p>
        <img src={calendar} alt="calendar" />
      </div>
    </section>
  )
}

export default Invitation