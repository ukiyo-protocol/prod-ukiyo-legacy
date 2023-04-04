import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../common/Header/Header";
import { useEffect, useState } from "react";
import { LogoBlanc, LogoRed } from "../../assets/SvgIcons/SvgIcons";

const AuthLayout = ({ title, text, children, img, isback }: any) => {
  const navigate = useNavigate();

  // const handleResize = () => {
  //   if (window.innerWidth < 1280) {
  //     // if condition here
  //   } else {
  //     // else condition here
  //   }
  // };



  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (window.innerWidth < 1280) {
  //         // if condition here
  //         {flana ? 'dhamkanna' : 'tamkana'}
  //       } else {
  //         // else condition here
  //       }
  //     };
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  //   useEffect(() => {

  //     const handleResize = () => {
  //       window.innerWidth < 991 ?
  //         <LogoRed /> : <LogoBlanc />

  //     }
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("auth-controller");
    return () => {
      document.body.classList.remove("auth-controller");
    }
  });
  return (
    <>
      <section className="authLayout">
        <Header isHide={true} />
        {/* <Header isHide={true} /> */}
        <Container fluid className="authLayout">
          <Row>
            <Col lg={7} md={12}>
              <div className="authCol authCol_left">
                <div className="authLayout_left">
                  <img src={img} alt="img" />
                  <div className="authleft_content">
                    <h4>ukiyo Protocol</h4>
                    <p>
                      Pre-Sale Seed Round I
                    </p>
                  </div>
                </div>
              </div>

            </Col>
            <Col lg={5} md={12}>

              <div className="authCol authCol_right">
                {isback ? (
                  <button
                    className="backBtn"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22.021"
                      height="16.012"
                      viewBox="0 0 22.021 16.012"
                    >
                      <path
                        id="Path_41449"
                        data-name="Path 41449"
                        d="M115.288,259.12h.277q8.523,0,17.047,0a1.868,1.868,0,0,1,.464.037.994.994,0,0,1-.217,1.951c-.1.005-.2,0-.3,0H115.219c.1.108.162.173.225.236q2.487,2.488,4.975,4.975a1.019,1.019,0,0,1,.327,1.059,1,1,0,0,1-1.584.506,2.548,2.548,0,0,1-.2-.194l-6.749-6.75a1.023,1.023,0,0,1-.01-1.647q3.415-3.417,6.83-6.834a1.017,1.017,0,0,1,1.059-.324,1,1,0,0,1,.5,1.587,3.178,3.178,0,0,1-.226.238q-2.462,2.463-4.925,4.925a1.529,1.529,0,0,1-.208.148Z"
                        transform="translate(-111.789 -252.098)"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
                <div className="authLayout_right">
                  <div className="headText">
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                  {children}
                </div>
                <p className="authCopyrt_Txt">
                  Copyright © {new Date().getFullYear()} ukiyo. All Right Reserved
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AuthLayout;
