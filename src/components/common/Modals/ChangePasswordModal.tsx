import Modal from "react-bootstrap/Modal";
import ButtonCustom from "../ButtonNew/ButtonCustomNew";
import CustomInput from "../Input/CustomInputNew";
import "./ModalStyle.scss";

const ChangePasswordModal = ({ show, handleClose }: any) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="common-modal change-pswd-modal"
    >
      <Modal.Header closeButton className="text-center" />
      <Modal.Body>
        <h4 className="mb-30 text-center">Change Password</h4>
        <form>
          <CustomInput
            label="Current Password"
            type="password"
            placeholder="****************"
          />
          <CustomInput
            label="New Password"
            type="password"
            placeholder="****************"
          />
          <CustomInput
            label="Re-enter Password"
            type="password"
            placeholder="****************"
          />
          <ButtonCustom
            title="Change Password"
            className="btnGradient w-100"
            onClick={handleClose}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
