import Footer from "../../common/Footer/Footer";
import AboutSec from "./Components/AboutSec/AboutSec";
import CommunitySec from "./Components/CommunitySec/CommunitySec";
import Features from "./Components/Features/Features";
import PlatformSec from "./Components/PlatformSec/PlatformSec";
import Power from "./Components/Power/Power";
import ProductUpdate from "./Components/ProductUpdate/ProductUpdate";
import ProtocolState from "./Components/ProtocolState/ProtocolState";
import TheNews from "./Components/TheNews/TheNews";
import Treasury from "./Components/Treasury/Treasury";
import Aos from "aos";
import WorksSec from "./Components/WorksSec/WorksSec";
// import Tokenomics from "./Components/Tokenomics/Tokenomics";
import "./Home.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import NotFound from "../../common/NotFound/NotFound";

const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  Aos.init({
    disable: "mobile",
  });
  return (
    <>
      <PlatformSec />
      <ProtocolState />
      <AboutSec />
      {/* <Tokenomics /> */}
      <ProductUpdate />
      <CommunitySec />
      <WorksSec />
      <Treasury />
      <TheNews />
      <Features />
      <Power />
      {/* <NotFound/> */}
      <Footer />
    </>
  );
};

export default Home;
