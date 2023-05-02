import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TheNews.scss";
import { Link } from "react-scroll";
import rightArrow from "../../../../../assets/Images/arrow.svg";
import axios from "axios";
import xml2js from "xml2js";

function TheNews() {
  const [data, setData] = React.useState<any>([]);

  // Function to clean html string from the description
  function stripHTMLTags(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    const text = div.textContent || div.innerText || "";
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const proxyUrl = "https://proxy.ukiyo.network/rssProxy";
        const response = await axios.get(proxyUrl);
        const parsedData = await xml2js.parseStringPromise(response.data);

        const items = parsedData.rss.channel[0].item.slice(0, 3).map((item) => {
          const contentEncoded = item["content:encoded"][0];
          const strippedContent = stripHTMLTags(contentEncoded).substr(0, 140);
          const link = item.link[0];

          return {
            id: item.guid[0]._,
            title: item.title[0],
            rightArrow: rightArrow,
            date: new Date(item.pubDate[0]).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            link,
            description: strippedContent + "...",
          };
        });
        setData(items);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);


  return (
    <div id="news_sec" className="The-NewsSec product_update">
      <Container>
        <Row>
          <Col className="fea_pro_heading" lg={3} data-aos="fade-up">
            <h2 className="text-dark">In The News</h2>
            <button className="btn-style btnGradient" data-aos="fade-up">View All Articles</button>
          </Col>
          <Col lg={9} data-aos="fade-up">
            {data && data.map((item, key) => (
              <a
                href={item.link}
                key={`index_${key}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
                >
                <div className="news-post">
                  {/* <Link to=""> */}
                  <div className="heading" data-aos="fade-up">
                    <h3>{item.title}</h3>
                    <Button className="news_button">
                      <img src={item.rightArrow} alt="img" />{" "}
                    </Button>
                  </div>
                  <Row className="news_row" data-aos="fade-up">
                    <Col lg={2} data-aos="fade-up">
                      <p>{item.date}</p>
                    </Col>
                    <Col lg={6} data-aos="fade-up">
                      <p>{item.description}</p>
                    </Col>
                  </Row>
                  {/* </Link> */}
                </div>
              </a>
            ))}
            <button className="btn-style btnGradient new_one" data-aos="fade-up">View all articles</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TheNews;
