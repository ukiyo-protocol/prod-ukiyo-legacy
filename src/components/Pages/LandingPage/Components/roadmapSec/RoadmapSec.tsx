import { Container, Row, Col } from "react-bootstrap";
import check from "../../../../../assets/Images/checkmark.svg";
import CommonHeading from "../../../../common/CommonHeading/CommonHeading";
import "./RoadmapSec.scss";

const RoadmapSec = (props: any) => {

  return (
    <section className="roadmapSec py-110" id="roadmap_sec">
      <Container>
        <CommonHeading title="Roadmap" />
        {/* <div className="roadmap_Slider d-flex justify-content-lg-center"> */}
        {/* <Slider {...settings} className="commn-slider"> */}
        {/* {roadmap.map((item,i) => (
            <div className={`roadmapWrap ${item.className}`} key={i}>
              <div className="time">{item.date}</div>
              <div className="upper-dot">
                <span className="upper-dot__solid"></span>
              </div>
              <div className="roadmapWrap_content">
                <span className="vertical-line"></span>
                <p>{item.title}</p>
              </div>
            </div>
          ))} */}
        {/* </Slider> */}

        <div className="roadmap_Slider">
          <Row>
            <Col md={6} className="roadmap_Slider_data">

              <Col sm={12}>
                <div className="roadmap_Slider_data_right">
                  <div className="roadmap_Slider_data_right_content">
                    <div className="roadmap_Slider_data_right_content_date gap-2 fs-2"><p>Q1</p><p>2023</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Website rebranding</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>$MEST Fundraising (seed & private) </p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>2D map design (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>3D map design and environment (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Metaverse MVP1 release (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Partnership developments</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_right">
                  <div className="roadmap_Slider_data_right_content">
                    <div className="roadmap_Slider_data_right_content_date gap-2 fs-2"><p>Q3</p><p>2023</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>2D map design (Qatar, Bahrain, Oman & Kuwait)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>3D map design and environment (Qatar, Bahrain, Oman & Kuwait)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Metaverse MVP2 release (Qatar, Bahrain, Oman & Kuwait)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>DEX & CEX listing</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_right">
                  <div className="roadmap_Slider_data_right_content">
                    <div className="roadmap_Slider_data_right_content_date gap-2 fs-2"><p>Q1</p><p>2024</p></div>
                    <h3 className="fs-2 text-white fw-bold">Metaverse Development:</h3>
                    <ul className="m-0">
                      <li className="d-flex align-items-baseline"><span><img src={check} /></span><p></p><p className="m-0">3D model setup (including environment & characters) </p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Rigging and animation setup</p> </li>
                      <li className="d-flex align-items-basleine flex-wrap"><span><img src={check} /></span><p>Game dynamics & scripting</p>
                        <ul className="ps-5">
                          <li className="d-flex align-items-basleine">-User onboarding   </li>
                          <li className="d-flex align-items-basleine">-Avatar creation functionality</li>
                          <li className="d-flex align-items-basleine">-Spawning zones</li>
                          <li className="d-flex align-items-basleine">-Walkthrough and experiences</li>
                          <li className="d-flex align-items-basleine">-Land purchasing via our own marketplace</li></ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_right">
                  <div className="roadmap_Slider_data_right_content">
                    <div className="roadmap_Slider_data_right_content_date gap-2 fs-2"><p>Q1</p><p>2024</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Build setup including testing and bug fixing.</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Col>

            <Col md={6} className="roadmap_Slider_data">
              <Col sm={12}>
                <div className="roadmap_Slider_data_left">
                  <div className="roadmap_Slider_data_left_content">
                    <div className="roadmap_Slider_data_left_content_date gap-2 fs-2"><p>Q4</p><p>2022</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Metaverse elaboration phase  </p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Map design & layout (V1)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p> Release trailer</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>$MEST Fundraising (strategic)</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_left">
                  <div className="roadmap_Slider_data_left_content">
                    <div className="roadmap_Slider_data_left_content_date gap-2 fs-2"><p>Q2</p><p>2023</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT land design (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT traits and generation (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT sale (UAE & KSA)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>$MEST fundraising (public & TGE)</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_left">
                  <div className="roadmap_Slider_data_left_content">
                    <div className="roadmap_Slider_data_left_content_date gap-2 fs-2"><p>Q4</p><p>2023</p></div>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT land design (Qatar, Bahrain, Oman & Kuwait)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT traits and generation (Qatar, Bahrain, Oman & Kuwait)</p></li>
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>NFT sale (Qatar ,Bahrain, Oman & Kuwait)</p></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="roadmap_Slider_data_left">
                  <div className="roadmap_Slider_data_left_content">
                    <div className="roadmap_Slider_data_left_content_date gap-2 fs-2"><p>Q2</p><p>2023</p></div>
                    <h3 className="fs-2 text-white fw-bold">Builder Tool Integration :</h3>
                    <ul className="m-0">
                      <li className="d-flex align-items-basleine"><span><img src={check} /></span><p>Upload scenes to land</p></li>
                      <li className="d-flex align-items-baseline"><span><img src={check} /></span><p className="m-0">Customize scenes using builder tool assets and uploading them to the NFT land</p></li>
                    </ul>
                  </div>
                </div>
              </Col>

            </Col>
          </Row>
        </div>
      </Container>
    </section >
  );
};

export default RoadmapSec;
