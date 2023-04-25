import React, { useEffect, useLayoutEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import iconMatamask from "../../../assets/Images/metamask_icon.png";
import iconWallet from "../../../assets/Images/wallet_icon.svg";
import { API, API_HOST, WALLETS } from "../../../config/constants";
import { RES_MESSAGES } from "../../../constants/messages";
import { useAppDispatch } from "../../../hooks/hooks";
import { IReduxUserDetails } from "../../../interfaces/store";
import { connectToWallet, connectWithWalletConnect, disconnectWallet, connectToWalletConnectWithWeb3, connectToMetamaskWithWeb3 } from "../../../redux/actions/connect.action";
import Toast from "../Toast";
import "./ConnectWallet.scss";
import { actionToGetUkiyoTokenDetails, actionToGetUsdtTokenDetails } from '../../../redux/actions/user.action';
import { apiCallGet } from "../../../services/axios";
import { IAxiosResponse } from "../../../interfaces/axios";
import * as types from "../../../redux/actionTypes";
 import { isMobile } from "react-device-detect";

const ConnectWallet = ({ show, handleClose, isAdmin }: any) => {
  const dispatch = useAppDispatch();
  const userDetails: IReduxUserDetails = useSelector((state: any) => (state.user.walletAddress) ? state.user : false);

  // useLayoutEffect(() => {

  //   if (isAdmin === false && typeof (isAdmin) !== 'undefined' && userDetails.walletAddress) {
  //     verifyWalletAddress();
  //   }

  // }, [userDetails.walletAddress])


//verify wallet addres with respective registered email
  // const verifyWalletAddress = async () => {
  //   let response = await apiCallGet(API_HOST + API.USER.VERIFY_ACCOUNT + userDetails.walletAddress) as IAxiosResponse;
  //   if (response && response.error == true) {
  //     dispatch(disconnectWallet(userDetails.wallet));
  //     return Toast.error(response.message);
  //   }
  // }



  // Handler function to connect to the Metamask wallet
  const connectWithMetaMaskHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await dispatch(connectToWallet(WALLETS.METAMASK));
      // await dispatch(actionToGetUkiyoTokenDetails(userDetails?.wallet));
      // await dispatch(actionToGetUsdtTokenDetails(userDetails?.wallet, userDetails?.walletAddress));
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
      Toast.error("Error connecting to Metamask.");
    }
  };


  //Handler function to connect using wallet connect
  const walletConnectHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    let result: any = await dispatch(
      connectWithWalletConnect(WALLETS.WALLET_CONNECT)
    );
    if (result) {
      Toast.success(RES_MESSAGES.WALLET_CONNECTED);
    }
  };

  //Function to disconnect wallet
  // const disconnectHandler = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   dispatch(disconnectWallet(userDetails?.wallet));
  // };

  return (
    <Modal
      scrollable={true}
      className="connect_wallet"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {userDetails && userDetails?.walletAddress ? "Disconnect Wallet" : "Connect a wallet"}

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="connect_options">
            <ul>

              {isMobile ? null :
                <li>
                  <Button onClick={(e) => connectWithMetaMaskHandler(e)}>
                    <span>
                      <img src={iconMatamask} alt="metamask-img" />
                    </span>{" "}
                    MetaMask{" "}
                  </Button>
                </li>}

              <li>
                <Button onClick={e => walletConnectHandler(e)}>
                  WalletConnect{" "}
                  <span>
                    <img src={iconWallet} alt="wallet-connect-img" />
                  </span>{" "}
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWallet;
