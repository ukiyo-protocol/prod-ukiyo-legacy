import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import protocol_img from "../../../../../assets/Images/prtcolRgt_img.svg";
import { API_HOST } from "../../../../../config/constants";
import { apiCallGet } from "../../../../../services/axios";
import { GET_ACCESS_TOKEN } from "../../../../../services/endPoints";
import ButtonCustom from "../../../../common/Button/ButtonCustom";
import heroAnimation from "../../../../../assets/Animations/HeroImageUkiyo.json";
import ConnectWallet from "../../../../common/ConnectWallet/index";
import Header from "../../../../common/Header/Header";
import "./PlatformSec.scss";
import HeroImageUkiyo from "../../../../../assets/Animations/HeroImageUkiyo.json";

const PlatformSec = () => {

  return (
    <section id="home_sec" className="platform_sec">
      <Header />
      <Container className="platform">
        <Row className="align-items-center protocol__sec">
          <Col sm={12} md={12} lg={6} className="order-lg-1 mb-5 mb-lg-0">
            <div className="platform__right  text-center">
              {/* <img src={protocol_img} alt="protocol" /> */}
              <Lottie animationData={HeroImageUkiyo} />;
            </div>

          </Col>


          <Col sm={12} md={12} lg={6}>
            <div className="protocolSec_left">
              <div className="protocolLeft_hding">
                <h1>
                  <span>ukiyo</span>
                  <br />
                  Protocol
                </h1>
                <p>
                  Venture Capital and Private Equity technology stack to kickstart Blockchain and Real-World projects
                </p>
                {/* <p>
                  Interoperable token pools to kickstart disruptive on-chain and off-chain projects through a fast, secure and efficient platform
                </p> */}
                <p>
                  A community driven protocol powered by<br className="d-md-block d-none" /> Ethereum
                </p>
              </div>
              <div className="protocolLeft_btns">
                <a href="https://www.dropbox.com/s/a7wal9nsw43zlb3/230324 ukiyo Whitepaper v1.pdf?dl=0">
                  <ButtonCustom className="btnGradient protocol_btn" title="Whitepaper" />
                </a>
                <a className="btn-style btnBorder" href="https://github.com/ukiyo-protocol">Github</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <ConnectWallet />

    </section>
  );
};

export default PlatformSec;