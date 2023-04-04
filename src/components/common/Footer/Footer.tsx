import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-scroll";
import { Link as Linked } from "react-router-dom";
import arrowRight from "../../../assets/Images/arrow.svg";
import buddy from "../../../assets/Images/budddy.svg";
import github from "../../../assets/Images/github.svg";
import gogo from "../../../assets/Images/gogo.svg";
import medium from "../../../assets/Images/medium.svg";
import logo from "../../../assets/Images/ukiyo-main.svg";
import telegram from "../../../assets/Images/telegram.svg";
import twitter from "../../../assets/Images/twitter.svg";
import reddit from "../../../assets/Images/reddit.svg";
import youtube from "../../../assets/Images/youtube.svg";
import insta from "../../../assets/Images/instagram.svg";
import "./Footer.scss";
import { LogoBlanc } from "../../../assets/SvgIcons/SvgIcons";

const Footer = () => {
  // const validateForm(){
  //   let x = document.forms["myForm"]["fname"].value;
  //   if (x == "") {
  //     alert("Name must be filled out");
  //     return false;
  //   }
  // }
  return (
    <>
      <section className="footer-style">
        <Container fluid className="">
          <Container className="footer">
            <div className="Footer_Row">
              <div className="Footer_Logo">
                <h2 className="footer__title footer__title--logo text-center text-xl-start">
                  {/* <img src={logo} alt="logo" /> */}
                  <LogoBlanc />
                </h2>
              </div>
              <div className="Footer_Link">
                <h2 className="footer__title">Quick Links</h2>
                <div className="footer__quiklinks">
                  <ul data-aos="fade-up">
                    <li>
                      <Link
                        activeClass="active"
                        to="home_sec"
                        spy={true}
                        offset={-70}
                        duration={500}
                      >
                        Home
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        activeClass="active"
                        to="about_sec"
                        spy={true}
                        offset={-70}
                        duration={500}
                      >
                        About
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        activeClass="active"
                        to=""
                        spy={true}
                        offset={-70}
                        duration={500}
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <a href="https://docs.ukiyo.network/ukiyo/#faqs">
                        FAQ’s
                      </a>
                    </li>
                    <li>
                      <a href="https://snapshot.org/#/ukiyolabs.eth">
                        Forum
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Footer_Link">
                <h2 className="footer__title">Ecosystem</h2>
                <div className="footer__quiklinks">
                  <ul data-aos="fade-up">
                    <li>
                      <Link
                        activeClass="active"
                        to="home_sec"
                        spy={true}
                        offset={-70}
                        duration={500}
                      >
                        Ventures
                      </Link>
                    </li>
                    <li>
                      <Link
                        activeClass="active"
                        to="crypto_sec"
                        spy={true}
                        offset={-70}
                        duration={500}
                      >
                        Staking
                      </Link>
                    </li>
                    <li>
                      <a href="https://docs.ukiyo.network/ukiyo/fundamentals/treasury"
                      >
                        Treasury
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.ukiyo.network/ukiyo/fundamentals/vault">
                        Vault
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Footer_Link">
                <h2 className="footer__title">Learn</h2>
                <div className="footer__quiklinks">
                  <ul data-aos="fade-up">
                    <li>
                      <a href="https://docs.ukiyo.network/ukiyo/">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="https://snapshot.org/#/ukiyolabs.eth">
                        Governance
                      </a>
                    </li>
                    <li>
                      <a href="https://www.dropbox.com/s/a7wal9nsw43zlb3/230324%20ukiyo%20Whitepaper%20v1.pdf?dl=0">
                        Whitepaper
                      </a>
                    </li>
                    <li>
                      <Linked to="/terms-and-conditions">T&C's</Linked>
                    </li>
                    <li>
                      <Linked to="/privacy-policy">Privacy Policy</Linked>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Footer_Link">
                <h2 className="footer__title">Contact Us</h2>
                <div className="footer__quiklinks">
                  <ul data-aos="fade-up">
                    <li>
                      <a href="https://discord.com/invite/qTFe7W99Zb">
                        ukiyo Discord
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@ukiyo.network"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="https://www.dropbox.com/sh/szzc0crwaulzpxs/AADzdcu7g5Fz-tNBpCFtq4FUa?dl=0">
                        Brand Assets
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Footer_Newsletter">
                <div className="media-link">
                  <InputGroup data-aos="fade-up" >
                    <Form.Control
                      // name="myForm"
                      placeholder="Subscribe to our Newsletter"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    // onSubmit={validateForm}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      <img src={arrowRight} alt="" />
                    </Button>
                  </InputGroup>

                  <div className="social-link">
                    <h2 className="footer__title social_title">Social Links</h2>
                    <ul className="medialist-icons" data-aos="fade-up">
                      <li>
                        {" "}
                        <a
                          href="https://twitter.com/ukiyo_labs"
                          target="_blank"
                        >
                          <img src={twitter} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/ukiyo-protocol"
                          target="_blank"
                        >
                          <img src={github} alt="img" />
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="https://t.me/ukiyo_protocol" target="_blank">
                          <img src={telegram} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://discord.gg/qTFe7W99Zb"
                          target="_blank"
                        >
                          <img src={buddy} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com/ukiyo.labs?igshid=YjNmNGQ3MDY="
                          target="_blank"
                        >
                          <img src={insta} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://medium.com/@ukiyo_protocol"
                          target="_blank"
                        >
                          <img src={medium} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.reddit.com/r/ukiyo_labs/"
                          target="_blank"
                        >
                          <img src={reddit} alt="img" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/@ukiyo_labs"
                          target="_blank"
                        >
                          <img src={youtube} alt="img" />
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Container>
        <div className="hrline"></div>
        <div className="copyright ">
          <p>
            Copyright © {new Date().getFullYear()} ukiyo. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
