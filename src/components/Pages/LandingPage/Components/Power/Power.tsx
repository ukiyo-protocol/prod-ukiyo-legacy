import React from "react";
import "./Power.scss";
import eth from "../../../../../assets/Images/Eth.svg";

function Power() {
  return (
    <section id="Power-Sec" className="Power-Sec">
      <h3 data-aos="fade-up">Powered By</h3>
      <img src={eth} alt="img" data-aos="fade-up" />
      <h5 data-aos="fade-up">Raise Capital. Invest Capital.</h5>
    </section>
  );
}

export default Power;
