import React, { useState } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import iconMatamask from "../../assets/Images/metamask_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import iconWallet from "../../assets/Images/wallet_icon.svg";
import "./ConnectWallet.scss";
// import {
//   connectmetamask,
//   disconnectWallet,
// } from "../../redux/actions/user.action";
import ButtonCustom from "../common/Button/ButtonCustom";

const ConnectWallet = ({ show, handleClose }: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const walletAddress = useSelector((state: any) => state.user.walletAddress);

  return (
    <Modal
      scrollable={true}
      className="connect_wallet"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect to a wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="connect_options">
            <ul>
              <li>
                <Button
                // onClick={() => dispatch(connectmetamask())}
                >
                  MetaMask{" "}
                  <span>
                    <img src={iconMatamask} />
                  </span>{" "}
                </Button>
              </li>
              <li>
                <ButtonCustom>
                  WalletConnect{" "}
                  <span>
                    <img src={iconWallet} />
                  </span>{" "}
                </ButtonCustom>
              </li>
            </ul>
            <div className="add_new mt-5 text-center">
              {walletAddress ? (
                <ButtonCustom
                  // onClick={() => dispatch(disconnectWallet())}
                  title="Disconnect"
                />
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWallet;
