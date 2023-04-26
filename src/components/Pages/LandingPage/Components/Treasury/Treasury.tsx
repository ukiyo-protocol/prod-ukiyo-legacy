import React, { useEffect, useState } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import treasure from "../../../../../assets/Images/Rectangle.png";
import CommonHeading from '../../../../common/CommonHeading/CommonHeading';
import Lottie from "lottie-react";
import starAnimation from "../../../../../assets/Animations/Star.json";
import "./Treasury.scss";
import Star from "../../../../../assets/Animations/Star.json";

const Treasury = () => {
    
    return (
        <>
            <section className='treasury_sec'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={5} data-aos="fade-up">
                            <div className='treasury_sec_img'>
                                {/* <img src={treasure} alt="" /> */}
                                <Lottie animationData={Star} />
                                {/* <Lottie animationData={starAnimation} width={200} height={200} />; */}

                                <div className='coin text-center text-white'>
                                    <h4>Treasury</h4>
                                    <div className='coin_sec'>
                                        <p>KXO</p>
                                        <ProgressBar now={100} />
                                        <p>100%</p>
                                    </div>
                                    <div className='coin_sec'>
                                        <p>ETH</p>
                                        <p>0%</p>
                                    </div>
                                    <div className='coin_sec'>
                                        <p>wBTC</p>
                                        <p>0%</p>
                                    </div>
                                    <div className='coin_sec'>
                                        <p>USDT</p>
                                        <p>0%</p>
                                    </div>
                                    <div className='coin_sec'>
                                        <p>DAI</p>
                                        <p>0%</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7} data-aos="fade-up">
                            <div className='treasury_sec_content text-white'>
                                <h3>The ukiyo Treasury is comprised of two key elements: ecosystem reserves, which comprises KXO tokens, and other assets earned from fees by collecting revenue:</h3>
                                <ul>
                                    <li>
                                        <h4>Revenues:</h4>
                                        <p>Transaction fees generated from liquidity pools provided to projects</p>
                                    </li>
                                    <li>
                                        <h4>Hedging:</h4>
                                        <p>On-chain and off-chain decision-making via community governance to hedge KXO against other assets</p>
                                    </li>
                                    <li>
                                        <h4>
                                            Taxes:
                                        </h4>
                                        <p>When KXO is sold on the open market a 1.5% Tax is mandated to the Treasury</p>
                                    </li>
                                    <li className='mb-sm-0'>
                                        <h4>
                                            Other:
                                        </h4>
                                        <p>
                                            Miscellaneous activities from Investors, DeFi ecosystem revenues, and more
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Treasury;