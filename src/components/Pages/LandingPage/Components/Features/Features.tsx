import React, { Component } from "react";
import Slider from "react-slick";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import open_law from "../../../../../assets/Images/openlaw-horizontal.svg";
import sum_sub from "../../../../../assets/Images/SumSubLogo_horizontal.png";
import elliptic from "../../../../../assets/Images/elliptic-logo-black.png";
import chainlink from "../../../../../assets/Images/chainlink-seeklogo.svg";
import zepellin from "../../../../../assets/Images/openzeppelin.svg";
import getblocks from "../../../../../assets/Images/getblocks.svg";
import "./Features.scss";

const WhyUsSec = () => {

  const settings: any = {
    dots: false,
    arrows: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    centerMode: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 9999,
        // settings: "unslick",
      },
      {
        breakpoint: 1199,
        settings: {
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          // dots: false,
          // arrows: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  };

  const openlawdata = [
    {
      id: "1",
      open_law: open_law,
      content:
        "OpenLaw allows ukiyo to automate real world contractual agreements by wrapping smart contracts and executing them on the blockchain",
    },
    {
      id: "2",
      open_law: sum_sub,
      content:
        "Best-in-class KYC, AML and CFT to onboard each user to web3. All integrated into the ukiyo Protocol",
    },
    {
      id: "3",
      open_law: elliptic,
      content:
        "web3’s most accurate wallet screening tool covering millions of addresses. Ensuring risk detection is a step ahead",
    },
    {
      id: "4",
      open_law: chainlink,
      content:
        "Chainlink’s Oracle technology is utilized to provide decentralized, tamper-proof pricing and data across all ukiyo products",
    },
    {
      id: "5",
      open_law: zepellin,
      content:
        "OpenZeppelin provides security products to build, automate, and operate decentralized applications",
    },
    {
      id: "5",
      open_law: getblocks,
      content:
        "GetBlock provides the ukiyo Protocol a reliable API access to multiple blockchains for future cross-chain interoperability",
    },
  ];

  return (
    <>
      <section id="whyus_sec" className="features_sec">
        <div className="features">
          <Row className="align-items-baseline m-0">
            <Slider className="Slick-area" {...settings}>
              {openlawdata.map((item, index) => (
                <Col sm={12} md={6} xl={3} key={index} >
                  <div>
                    <div className="features_right">
                      <div className="features_images" data-aos="fade-up">
                        <img src={item.open_law} alt="About img" />
                      </div>
                      <p data-aos="fade-up">{item.content}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Slider>
          </Row>
        </div>
      </section>
    </>
  );
};

export default WhyUsSec;
