import "./ConfirmModal.scss";
import Modal from "react-bootstrap/Modal";
import ButtonCustom from "../ButtonNew/ButtonCustomNew";
import { ICallBackResponse } from "../../../interfaces/admin";

const ConfirmModal = ({ show, handleClose, callback, data }: any) => {

    const sendCallback = (event: MouseEvent, data: ICallBackResponse) => {
        event.preventDefault();
        callback(data);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                className="common-modal confirm-modal"
            >
                <Modal.Header className="text-center" />
                <Modal.Body className="text-center">
                    <h4>Please Confirm</h4>
                    {/* <p>Please enter that you want to use this as your email address.</p> */}
                    <p className="mt-4 mb-5">Do you really want to change the {data.trigger.toLowerCase()} wallet address to {data.address}</p>
                    <div className="d-flex gap-3">
                        <ButtonCustom
                            title="Cancel"
                            className="cancel_btn w-100 "
                            onClick={handleClose}
                        />
                        <ButtonCustom
                            title="Yes"
                            className="btnGradient w-100"
                            onClick={(event: MouseEvent) => sendCallback(event, data)}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ConfirmModal;