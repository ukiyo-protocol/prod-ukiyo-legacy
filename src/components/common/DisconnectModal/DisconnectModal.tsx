import Modal from 'react-bootstrap/Modal';
import ButtonCustom from '../Button/ButtonCustom';
import "./DisconnectModal.scss";

const DisconnectModal = (props: any) => {
    const handleToDisconnect = () => {
        props.callback();
    }
    return (
        <>
            <Modal className='disconnect_modal' show={props.show} onHide={props.viewClose} centered>
                <Modal.Body className='text-center'>Do you want to Disconnect</Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <ButtonCustom className="red-btn" title="Yes" variant="secondary" onClick={handleToDisconnect} />
                    <ButtonCustom className="red-btn" title="No" onClick={props.viewClose} />
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default DisconnectModal;