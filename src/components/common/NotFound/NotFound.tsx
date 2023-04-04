import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className='not_found'>
      <Container>
        <Row>
            <Col xl={12}>
                <div className='Notfound_content'>
                    <h2>404</h2>
                    <p>Sorry, the page not found</p>
                    <p className='removed_page'>The you followed probably broken or the pagehas been removed</p>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound
