import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import communityimg1 from '../../../../../assets/Images/malefemale.png';
import Vactor from '../../../../../assets/Images/Vector.svg';
import oneimg from '../../../../../assets/Images/oneimg.svg';
import twoimg from '../../../../../assets/Images/twoimg.svg';
import threeimg from '../../../../../assets/Images/three.svg';
import ButtonCustom from "../../../../common/Button/ButtonCustom";
import CommonHeading from "../../../../common/CommonHeading/CommonHeading";

import "./CommunitySec.scss";
import { Link } from "react-router-dom";

const CommunitySec = () => {
    return (
        <section id="community_sec" className="comunity_sec">
            <Container>
                <CommonHeading
                    className="comn-heading--token"
                    title="Governed by the Community"
                />
                <p className="community_content">ukiyo is a protocol that is entirely decentralized and governed by its community</p>
                <a href="https://snapshot.org/#/ukiyolabs.eth" target="_blank" rel="noreferrer">
                    <ButtonCustom className="btnGradient govern_btn" title="Governance Forum" />
                </a>
                <div className="community_img">
                    <img src={communityimg1} alt="community-img" />
                </div>

            </Container >
        </section >
    );
};

export default CommunitySec;
