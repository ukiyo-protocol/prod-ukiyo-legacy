import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { Link as DomLink } from "react-router-dom";
// import logo from "../../../assets/Images/logo.png";
import logo from "../../../assets/Images/ukiyo-main.svg";
import logoscroll from "../../../assets/Images/UKIYO-red.svg";
import { useAppDispatch } from "../../../hooks/hooks";
import { IReduxUserDetails } from "../../../interfaces/store";
import { disconnectWallet } from "../../../redux/actions/connect.action";
import { CommonService } from "../../../services/CommonService";
import ButtonCustom from "../Button/ButtonCustom";
import ConnectWallet from "../ConnectWallet/index";
import DisconnectModal from "../DisconnectModal/DisconnectModal";
import Toast from "../Toast";
import "./Header.scss";
import { URL } from "../../../constants/awsAssets";
import { LogoBlanc, LogoMain, LogoRed } from "../../../assets/SvgIcons/SvgIcons";

const Header = ({ isHide }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userDetails: IReduxUserDetails = useSelector((state: any) =>
    state.user.walletAddress ? state.user : false
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [isActive, setActive] = useState(false);
  const [view, setView] = useState(false);

  const viewClose = () => setView(false);
  const viewShow = () => setView(true);
  // const toggleClass = () => {
  //   setActive(!isActive);
  // };

  const [scroll, setScroll] = useState(false);
  const [sidebarScrolled, setSidebarScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll((window.scrollY > 50));
    });

    window.addEventListener('resize', function () {
      setSidebarScrolled(document.body.clientWidth < 991)
    })
    setSidebarScrolled(document.body.clientWidth < 991)
  });
  useEffect(() => {
    setShow(false);
  }, [userDetails?.walletAddress]);

  //Function to disconnect wallet
  const disconnectHandler = async () => {
    dispatch(disconnectWallet(userDetails?.wallet));
    Toast.success("Disconnected successfully");
    setView(false);
  };

  const handleCloseSidebar = () => {
    const toggler: any = document.querySelector(".navbar-toggler") as Element;
    // toggler?.click()
    if (document.body.clientWidth < 991) {
      toggler.click();
    }
  };

  const handleToggle = () => {
    if (!scroll) {
      setScroll(!scroll);
    }
  }

  return (
    <Navbar
      expand="lg"
      className={`header-style sticky-top ${scroll ? " scrolled" : ""} ${sidebarScrolled ? "sidebar-scrolled" : ''}`}
    >
      <Container>
        {/* <Navbar.Brand href="#home"> */}
        <Navbar.Brand href="/">
          {/* <LogoMain /> */}
          {scroll ? <LogoRed /> : <LogoBlanc />}
          {/* <img src={scroll ? logoscroll : URL.BASE_URL_IMAGES + 'ukiyo-main.svg'} alt="logo" className="logo" /> */}
        </Navbar.Brand>

        {isHide ? (
          null
        ) : (
          <>
            {/* <div className="private_sale">
              <Link
                className="nav-link"
                activeClass="active"
                to="home_sec"
                spy={true}
                // smooth={true}
                offset={-70}
                duration={500}
              >
                Private Sale
              </Link>
            </div> */}

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {/* <div className="private_sale nav_sale">
              <Link
                className="nav-link"
                activeClass="active"
                to="home_sec"
                spy={true}
                // smooth={true}
                offset={-70}
                duration={500}
              >
                Private Sale
              </Link>
            </div> */}
                <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to="home_sec"
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Home
                </Link>

                <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to="about_sec"
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Features
                </Link>

                {/* <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to="docs_sec"
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Docs
                </Link> */}

                <a className="nav-link" href="https://docs.ukiyo.network/">
                  Docs
                </a>

                <a className="nav-link" href="https://docs.ukiyo.network/ukiyo/fundamentals/governance">
                  Governance
                </a>

                {/* <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to="about_sec"
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  About
                </Link> */}

                {/* <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to="tokenomics_sec"
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Tokenomics
                </Link> */}

                {/* <Link
            onClick={handleCloseSidebar}
              className="nav-link"
              activeClass="active"
              to="Power-Sec"
              spy={true}
              // smooth={true}
              offset={-70}
              duration={500}
            >
              Gov
            </Link> */}



                <a className="nav-link" href="https://docs.ukiyo.network/ukiyo/#faqs">
                  FAQ
                </a>
                {/* <Link
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  activeClass="active"
                  to=""
                  spy={true}
                  // smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Forum
                </Link> */}
                {/* <DomLink
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  to="/login"
                >
                  Login
                </DomLink>
                <DomLink
                  onClick={handleCloseSidebar}
                  className="nav-link"
                  to="/register"
                >
                  Sign Up
                </DomLink> */}
                {/* {userDetails && userDetails?.walletAddress && (
                  <Link onClick={handleClose} to="#" className="nav-link">
                    Transaction
                  </Link>
                )} */}
                {/* <div className="btn_area header_btn">
                  <ButtonCustom
                    title={"Enter App"}
                    className="btnBorder"
                  // onClick={() => {
                  //   handleShow();
                  // }}
                  />
                  <ButtonCustom
                    title={"Join"}
                    className="btnGradient"
                    onClick={() => {
                      handleShow();
                    }}
                  />
                </div> */}
                <div className="d-flex align-items-center manage_reposive_header">
                  {userDetails && userDetails?.walletAddress ? (
                    <>
                      {/* <ButtonCustom
                        className="red-btn"
                        title={`${CommonService.custmizeAddress(
                          userDetails?.walletAddress
                        )} Disconnect`}
                        onClick={
                          (e: any) => {
                            setView(true);
                          }
                          // disconnectHandler(e)
                        }
                      /> */}
                    </>
                  ) : (
                    <div className="btn_area">
                      {/* <ButtonCustom
                        title={"Enter App"}
                        className="btnBorder"
                        onClick={() => {
                          handleShow();
                        }}
                      /> */}
                      <ButtonCustom title={"Pre Sale"} className="btnBorder" onClick={() => navigate('/login')} />
                      <ButtonCustom title={"Login"} className="btnGradient" onClick={() => navigate('/dashboard')} />
                    </div>
                  )}

                  <DisconnectModal
                    show={view}
                    viewShow={viewShow}
                    viewClose={viewClose}
                    callback={disconnectHandler}
                  />
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
              </Nav>
              <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" className={`${scroll ? "scrolled-toggle" : ""}`} />
            </Navbar.Collapse>
          </>
        )}
      </Container>
      <ConnectWallet
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </Navbar>
  );
};

export default Header;


