import Modal from "react-bootstrap/Modal";
import ButtonCustom from "../ButtonNew/ButtonCustomNew";
import kycImg from "../../../assets/Images/kycImg.png";
import "./ModalStyle.scss";
import { useNavigate } from 'react-router-dom';

const CompleteKycModal = ({ show, handleClose }: any) => {
 const navigate= useNavigate();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="common-modal kyc-modal"
    >
      <Modal.Header closeButton className="text-center" />
      <Modal.Body className="text-center">
        <h4>Complete your KYC first.</h4>
        <div className="kyc-modal__img">
          <img src={kycImg} alt="kyc-img" />
        </div>
        <ButtonCustom
          title="Go To KYC Section"
          className="btnGradient w-100"
          // onClick={handleClose}
          onClick={() => {
            navigate('/kyc-record')
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CompleteKycModal;
