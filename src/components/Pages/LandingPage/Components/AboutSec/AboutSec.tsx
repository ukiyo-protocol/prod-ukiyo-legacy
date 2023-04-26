import Lottie from "lottie-react";
import { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import product_logo from '../../../../../assets/Images/ukiyo-text-img.png';
import ButtonCustom from "../../../../common/Button/ButtonCustom";
import CommonHeading from "../../../../common/CommonHeading/CommonHeading";
import "./AboutSec.scss";
import Ventures from "../../../../../assets/Animations/Ventures.json";
import Staking from "../../../../../assets/Animations/Staking.json";

const AboutSec = () => {

  return (
    <section id="about_sec" className="product_sec">
      <Container>
        <CommonHeading
          className="comn-heading--token product_heading"
          title="Features"
        />
      </Container>
      <Container className="product">
        <Row className="align-items-stretch">
          <Col sm={12} md={6} xl={6} className="d-flex" data-aos="fade-up">
            <div className="product_img">
              <div className="product_content">
                <div className="product_logo">
                  <img src={product_logo} alt="product-logo" />
                </div>
                <h4>Ventures</h4>
                <p>Become a disruptive investor via web3 and access start-ups and mid-stage projects</p>
                <a href="https://docs.ukiyo.network/ukiyo/features-guide/ventures" rel="noreferrer" target="_blank">
                  <ButtonCustom className="btnGradient" title="Learn" />
                </a>
                <div className="banner_img">

                  {/* <a href="" target="_blank"> */}
                    <Lottie animationData={Ventures} className="lottoe_sec" />
                  {/* </a> */}
                

                </div>
              </div>
            </div>

          </Col>
          <Col sm={12} md={6} xl={6} className="d-flex" data-aos="fade-up">
            <div className="product_img">
              <div className="product_content">
                <div className="product_logo">
                  <img src={product_logo} alt="product-logo" />
                </div>
                <h4>Staking</h4>
                <p>Earn passive income from the Vault. Stake KXO. Govern the protocol</p>
                <a href="https://docs.ukiyo.network/ukiyo/features-guide/staking" rel="noreferrer" target="_blank">
                  <ButtonCustom className="btnGradient" title="Learn" />
                  </a>
                <div className="banner_img">
                  {/* <img src={Bannersecimg1} alt="product-logo" /> */}
                  <Lottie animationData={Staking} className="lottoe_sec" />
                  {/* <Lottie animationData={stakingAnimation} loop={true} width={250} height={200} className="lottoe_sec" />; */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSec;
