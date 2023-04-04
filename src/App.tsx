import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Home from "./components/Pages/LandingPage/Home";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy/PrivacyPolicy";
import SuccessVerification from "./components/Pages/SuccessVerification/SuccessVerification";
import TermConditions from "./components/Pages/TermConditions/TermConditions";
import PrivateRoute from "./components/Routes/PrivateRoute/PrivateRoutes";
import { WALLETS } from "./config/constants";
import { useAppDispatch } from "./hooks/hooks";
import {
  connectToWallet,
  connectWithWalletConnect,
} from "./redux/actions/connect.action";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ethereum } = window as any
  let web3 = new Web3(ethereum)
  const userDetails = useSelector((state: any) =>
    state.user.walletAddress ? state.user : false
  );

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    if (userDetails !== false) {
      if (userDetails.wallet === WALLETS.METAMASK) {
        await dispatch(connectToWallet(userDetails.wallet));
      }
      if (userDetails.wallet === WALLETS.WALLET_CONNECT) {
        await dispatch(connectWithWalletConnect(userDetails.wallet));
      }
    }
  };

  return (
    <>
      <BrowserRouter>
        <PrivateRoute />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms-and-conditions" element={<TermConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/verified" element={<SuccessVerification />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
