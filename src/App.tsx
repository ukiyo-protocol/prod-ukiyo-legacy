import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Home from "./components/Pages/LandingPage/Home";
import Dashboard from "./components/Pages/UserPanel/Dashboard/Dashboard";
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
import NewsBlog from "./components/Pages/NewsBlog/NewsBlog";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [Chain.mainnet, Chain.goerli],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Ukiyo Protocol",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          {/* <PrivateRoute /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms-and-conditions" element={<TermConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<NewsBlog />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verified" element={<SuccessVerification />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
