import React, { useEffect, useState } from "react";
// import {
//   connectmetamask,
//   disconnectWallet,
// } from "../../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Col, Row, Modal, Button } from "react-bootstrap";
import ButtonCommon from "../common/ButtonNew/ButtonCustomNew";
import "./ConnectWallet.scss";

const ConnectWallet: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const walletAddress = useSelector((state: any) => state.user.walletAddress);

  useEffect(() => {
    setShow(false);
  }, [walletAddress]);

  return (
    <>
      <ButtonCommon
        title={walletAddress ? walletAddress : "Connect Wallet"}
        onClick={() => setShow(true)}
      />
      <Modal
        scrollable={true}
        className="connect_wallet"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          {walletAddress ? (
            <Modal.Title>Disconnect Wallet</Modal.Title>
          ) : (
            <Modal.Title className="text-left">Connect to a wallet</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="design_pop">
              {walletAddress ? (
                <h3
                  className="disconnect-wallet text-center"
                  style={{ color: "black" }}
                >
                  Are you sure you want to disconnect
                </h3>
              ) : (
                <ul>
                  <li>
                    <button
                      className="connect_btn"
                      // onClick={() => dispatch(connectmetamask())}
                    >
                      MetaMask
                      <span>
                        <img
                          src={
                            "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                          }
                          alt="icon"
                        />
                      </span>
                    </button>
                  </li>
                </ul>
              )}
              {walletAddress ? (
                <div className="add_new text-center">
                  <ButtonCommon
                    title="Disconnect"
                    // onClick={() => dispatch(disconnectWallet())}
                  />
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConnectWallet;
