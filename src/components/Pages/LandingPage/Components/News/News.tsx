import { useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import city from "../../../../../assets/Images/Cities.png";
import scenic from "../../../../../assets/Images/scenic.png";
import malala from "../../../../../assets/Images/Malala.png";
import CommonHeading from "../../../../common/CommonHeading/CommonHeading";
import "./News.scss";

const News = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 0,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
          speed: 500,
        },
      },
    ],
  };
  const [NEWS, setNEWS] = useState([
    {
      img: city,
      date: "September, 15 2017",
      title: "ICO",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
    {
      img: scenic,
      date: "September, 15 2017",
      title: "Cryptocurrency",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
    {
      img: malala,
      date: "September, 15 2017",
      title: "Blockchain",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
    {
      img: scenic,
      date: "September, 15 2017",
      title: "Bitcoin",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
    {
      img: scenic,
      date: "September, 15 2017",
      title: "Cryptocurrency",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
    {
      img: malala,
      date: "September, 15 2017",
      title: "Blockchain",
      subtitle:
        "Crypto project has reached NormalCap! Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search. Crypto project has reached NormalCap! Many desktop publishing packages text, and a search. Crypto project has reac...",
    },
  ]);
  return (
    <>
      <section id="news_sec" className="news_section py-150">
        <Container>
          <CommonHeading title="News" subTitle="News" />
          <Row>
            <Slider {...settings} className="news-slider">
              {NEWS.map((item) => (
                <Col sm={6} xl={4}>
                  <div className="news_sec__block">
                    <div className="news_sec__block__block_sec">
                      <div className="news-thumb">
                        <img src={item.img} alt="img" />
                      </div>
                      <div>
                        <h2 className="news_sec__block__block_sec__title">
                          {item.title}
                        </h2>
                        <h4 className="news_sec__block__block_sec__subtitle">
                          {item.subtitle}
                        </h4>
                        <p className="news_sec__block__block_sec__date">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Slider>
            {/* <ButtonCustom className="" title="View All" /> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default News;
