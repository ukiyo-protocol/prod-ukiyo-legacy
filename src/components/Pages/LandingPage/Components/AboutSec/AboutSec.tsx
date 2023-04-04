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

const AboutSec = () => {
  // // const animatUrl = 'https://d1896zyrh2c939.cloudfront.net/Animations/Ventures.json'
  const [jsonData, setJsonData] = useState("")

  const [jsonDataStaking, setJsonDataStaking] = useState("")
  // AWS.config.update({
  //   region: 'us-east-2',
  //   accessKeyId: 'AKIA3SCPXY4AZTOMET77',
  //   secretAccessKey: '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',
  // });
  // const s3 = new AWS.S3();

  // const downloadFile = async (bucketName, key) => {
  //   try {
  //     const response = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
  //     const fileContent: any = response?.Body?.toString();
  //     console.log("fileContent", fileContent)
  //     debugger
  //     // Do something with the file content, such as save it to a file or display it in the UI
  //     setJsonData(fileContent)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Call the downloadFile function with the name of the S3 bucket and the key of the file you want to download
  useEffect(() => {
    fetch(
      "https://stage-ukiyo.s3.us-east-2.amazonaws.com/Animations/Ventures.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON::>>>", json);
        setJsonData(json);
      })
  }, [])

  useEffect(() => {
    fetch(
      "https://stage-ukiyo.s3.us-east-2.amazonaws.com/Animations/Staking.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON::>>>", json);
        setJsonDataStaking(json);
      })
  }, [])



  // fetch(
  //   "https://d1896zyrh2c939.cloudfront.net/Animations/Ventures.json"
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((jsonData) => {
  //     // jsonData is parsed json object received from url
  //     console.log(jsonData);
  //   })
  //   .catch((error) => {
  //     // handle your errors here
  //     console.error(error);
  //   });


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
                <ButtonCustom className="btnGradient" title="Learn" />
                <div className="banner_img">
                  {/* <img src={Bannersecimg2} alt="product-logo" /> */}
                  {/* <Lottie animationData={URL.BASE_URL_LOTTIE + 'Ventures.json'} className="lottoe_sec" /> */}
                  {/* <Lottie animationData={URL.BASE_URL_LOTTIE + 'Ventures.json'} className="lottoe_sec" /> */}
                  {/* <div id="my-lottie-container" className="lottoe_sec" />; */}
                  <Lottie animationData={jsonData} className="lottoe_sec" />
                  {/* <img src={URL.BASE_URL_LOTTIE + 'Ventures.json'} /> */}

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
                <ButtonCustom className="btnGradient" title="Learn" />
                <div className="banner_img">
                  {/* <img src={Bannersecimg1} alt="product-logo" /> */}
                  <Lottie animationData={jsonDataStaking} className="lottoe_sec" />
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
