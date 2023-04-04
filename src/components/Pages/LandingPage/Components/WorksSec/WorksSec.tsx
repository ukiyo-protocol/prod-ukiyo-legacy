import React from 'react'
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CommonHeading from "../../../../common/CommonHeading/CommonHeading";
import Vactor from '../../../../../assets/Images/Vector.svg';
import Vactor1 from '../../../../../assets/Images/arrow-right.svg';
import oneimg from '../../../../../assets/Images/oneimg.svg';
import twoimg from '../../../../../assets/Images/twoimg.svg';
import threeimg from '../../../../../assets/Images/three.svg';
import "./WorksSec.scss";
const WorksSec = () => {
    return (
        <section id="Works_sec" className="works_sec">
            <Container>
                <CommonHeading
                    className="comn-heading--token__subtxt"
                    title="How it works"
                    data-aos="fade-up"
                />
                <Row>
                    <div className='hl' />
                    <Col sm={6} lg={4} md={4} data-aos="fade-up">
                        <div className='box_sec mt-md-0'>
                            <div className="oneimgsec">
                                <img src={oneimg} alt="community-img" />
                            </div>

                            <div className="community_heading">
                                <h3>Request for Comment Submission (RFC)</h3>
                                <p>Submit proposals and comments and engage with the DAO community.</p>
                                <a href="https://docs.ukiyo.network/ukiyo/fundamentals/governance/dao-community" className="community_arrows" >Visit Docs <span><img src={Vactor} alt="vactor-img" /></span></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} md={4} data-aos="fade-up">
                        <div className='box_sec'>
                            <div className="twoimgsec">
                                <img src={twoimg} alt="community-img" />
                            </div>
                            <div className="community_heading">
                                <h3>Create a Snapshot</h3>
                                <p>Use a Snapshot vote to measure community opinion on a new proposal.</p>
                                <a href="https://snapshot.org/#/ukiyolabs.eth" className="community_arrows green" >Go to Snapshot <span><img src={Vactor1} alt="vactor-img" /></span></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} lg={4} md={4} data-aos="fade-up">
                        <div className='box_sec'>
                            <div className="threeimgsec">
                                <img src={threeimg} alt="community-img" />
                            </div>

                            <div className="community_heading">
                                <h3>Submit a Request for Improvement (UIP) for ukiyo</h3>
                                <p>The proposal(s) can now be submitted via a GitHub pull request, and the DAO community can vote on approvals.</p>
                                <a href="https://docs.ukiyo.network/ukiyo/fundamentals/governance/dao-community" className="community_arrows" >Visit Docs  <span><img src={Vactor} alt="vactor-img" /></span></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default WorksSec