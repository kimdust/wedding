import sampleImg from "../assets/images/sample.jpg";
import callIcon from "../assets/icons/call.png";

function Contact() {
  const manPhone = "01031667652";
  const womanPhone = "01063921098";

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <section className="contact">
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