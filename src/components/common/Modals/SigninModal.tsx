import Modal from "react-bootstrap/Modal";
import ButtonCustom from "../ButtonNew/ButtonCustomNew";
import "./ModalStyle.scss";

const SigninModal = ({ show, handleClose }: any) => {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="common-modal signin-modal"
    >
      <Modal.Header closeButton className="text-center" />
      <Modal.Body className="text-center">
        <h4>Thank you for registering an account with ukiyo</h4>
        <h6>Verify Your Email Address</h6>
        <p>Please check your inbox and verify your email address on the link provided.</p>
        {/* <p className="light-black mb-5">Go to your mail and verify there!</p> */}
        <ButtonCustom
          title="Okay"
          className="btnGradient w-100"
          onClick={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SigninModal;
