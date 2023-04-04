import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './ProductUpdate.scss'
import CommonHeading from '../../../../common/CommonHeading/CommonHeading'
import ButtonCustom from '../../../../common/Button/ButtonCustom'
import product_logo from '../../../../../assets/Images/productIcon.svg'
import product_home from "../../../../../assets/Images/home.svg"
import product_mob from "../../../../../assets/Images/mob.svg"

const ProductUpdate = () => {
    return (
        <section id="docs_sec" className="product_update">
            <Container>
                <CommonHeading
                    className="comn-heading--token fea_pro_heading text-white text-center pb-md-5"
                    title="Ecosystem"
                />
                <Row>
                    <Col sm={12} md={6} xl={6} data-aos="fade-up">
                        <div className="product_update_col">
                            <div className='product_logo'>
                                <img src={product_home} alt="logo" />
                            </div>
                            <div className="product_content">
                                <h3>Treasury</h3>
                                <p>The Reserve and Liquidity of the protocol.<br /> Owned and controlled by the community</p>
                                <a href="https://docs.ukiyo.network/ukiyo/fundamentals/treasury"><ButtonCustom className="btnGradient" /></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} xl={6} data-aos="fade-up">
                        <div className="product_update_col">
                            <div className='product_logo'>
                                <img src={product_mob} alt="logo" />
                            </div>
                            <div className="product_content">
                                <h3>Vault</h3>
                                <p>Learn about the Vault, its mechanics, and how you can earn KXO</p>
                                <a href='https://docs.ukiyo.network/ukiyo/fundamentals/vault'><ButtonCustom className="btnGradient" /></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ProductUpdate
