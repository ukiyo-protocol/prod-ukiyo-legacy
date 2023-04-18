import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TheNews.scss";
import { Link } from "react-scroll";
import rightArrow from "../../../../../assets/Images/arrow.svg";
import sanityClient from "../../../../../sanityClient";

interface Post {
  title: string;
  slug: { current: string };
  body: any;
  publishedAt: string;
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

function TheNews() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) [0...2] {
          title,
          slug,
          body,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            }
          }
        }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
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
            {posts &&
              posts.map((post, index) => (
                <Link to={"/news/" + post.slug.current} key={post.slug.current}>
                  <div className="news-post" key={index}>
                    <div className="heading" data-aos="fade-up">
                      <h3>{post.title}</h3>
                      <Button className="news_button">
                        <img src={rightArrow} alt="img" />{" "}
                      </Button>
                    </div>
                    <Row className="news_row" data-aos="fade-up">
                      <Col lg={2} data-aos="fade-up">
                        <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </Col>
                      <Col lg={6} data-aos="fade-up">
                        {/* <p>{postBrief(post.body)}...</p> */}
                      </Col>
                    </Row>
                  </div>
                </Link>
              ))}
            <button className="btn-style btnGradient new_one" data-aos="fade-up">View all articles</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TheNews;
