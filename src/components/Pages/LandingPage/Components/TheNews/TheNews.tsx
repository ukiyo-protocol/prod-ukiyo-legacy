import React from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TheNews.scss";
import { Link } from "react-scroll";
import rightArrow from "../../../../../assets/Images/arrow.svg";

function TheNews() {
  const data = [
    {
      id: 1,
      headings: "ukiyo Q4 2022 Report",
      rightArrow: rightArrow,
      Date: "Aug 04, 2022",
      Defination:
        "In September 2021, ukiyo was conceptualized. Development swiftly began, and one year later we release our first report to help the community better understand on how the DAO is getting along.",
    },
    {
      id: 3,
      headings: "Phase I Seed Round – Private Sale",
      rightArrow: rightArrow,
      Date: "Aug 04, 2022",
      Defination:
        " As we prepare for the launch of the private sale, find out how you can participate and help build a world defined by borderless capital that will act as a catalyst for wealth creation.",
    },
    {
      id: 2,
      headings: "Fundamentals: Encouraging Venture Investment On DeFi",
      rightArrow: rightArrow,
      Date: "Aug 04, 2022",
      Defination:
        "The brainchild and founding vision of the ukiyo Protocol. Learn what it aims to achieve and how its roadmap will forever change the landscape of venture capital.",
    },

  ];

  return (
    <div id="news_sec" className="The-NewsSec product_update">
      <Container>
        <Row>
          <Col className="fea_pro_heading" lg={3} data-aos="fade-up">
            <h2 className="text-dark">In The News</h2>
            <button className="btn-style btnGradient" data-aos="fade-up">View All Articles</button>
          </Col>
          <Col lg={9} data-aos="fade-up">
            {data.map((user, key) => (
              <div className="news-post" key={`index_${key}`}>
                {/* <Link to=""> */}
                <div className="heading" data-aos="fade-up">
                  <h3>{user.headings}</h3>
                  <Button className="news_button">
                    <img src={user.rightArrow} alt="img" />{" "}
                  </Button>
                </div>
                <Row className="news_row" data-aos="fade-up">
                  <Col lg={2} data-aos="fade-up">
                    <p>{user.Date}</p>
                  </Col>
                  <Col lg={6} data-aos="fade-up">
                    <p>{user.Defination}</p>
                  </Col>
                </Row>
                {/* </Link> */}
              </div>
            ))}
            <button className="btn-style btnGradient new_one" data-aos="fade-up">View all articles</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TheNews;
