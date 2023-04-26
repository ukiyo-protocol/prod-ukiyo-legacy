import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ButtonCustom from '../../../../common/ButtonNew/ButtonCustomNew';
import CommonHeading from '../../../../common/CommonHeading/CommonHeading';
import "./Governance.scss";

const Governance = () => {
    return (
        <>
            <section id="governance_sec" className="product_update">
                <Container>
                    <CommonHeading
                        className="comn-heading--token fea_pro_heading"
                        title="Governed by the Community"
                    />
                    <Row>
                        <Col>
                            <div className='governance_sec'>
                                <p>AAve is a fully decentralised community governed protocol with 148,012 token holders.</p>
                                <a href="https://snapshot.org/#/ukiyolabs.eth" target="_blank" rel="noreferrer">
                                    <ButtonCustom title="Governance forum" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Governance;