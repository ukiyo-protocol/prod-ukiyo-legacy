import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './ProtocolStae.scss'

const ProtocolState = () => {
  return (
    <>
      <section className="investSec leftSide_Arrow" id="about">
        <Container>
          <div className="investSec_stats">
            <Row>
              <Col xl={12}>
                <div data-aos="fade-up">
                  <div className="protocol_state">
                    <h2>Protocol Stats</h2>
                    <div className="state_value">
                      <ul className="d-flex justify-content-between align-items-center">
                        <li>
                          <p>Total Value Locked</p>
                          <h3>$0,000,00</h3>
                        </li>
                        <li>
                          <p>Token Price</p>
                          <h3>$0.077</h3>
                        </li>
                        <li>
                          <p>Total Assets Deployed</p>
                          <h3>$0,000,00</h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProtocolState
