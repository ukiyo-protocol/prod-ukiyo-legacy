import React, { useEffect, useState } from "react";
import {
  DAPP_DEEPLINK,
  NETWORK_DETAILS,
  WALLETS,
} from "./../../config/constants";
import { provider } from "./../../services/walletConnect/provider";
import { AppDispatch, RootState } from "./../store";
import * as types from "../actionTypes";
import Web3 from "web3";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import Toast from "../../components/common/Toast";
import { isMobile } from "react-device-detect";
import WalletConnect from '@walletconnect/client';


// import { notify } from "../../components/Toast";

/**
 * Function to check if appropriate wallet is installed
 * @param type
 * @returns
 */

// Test functions

interface CustomWindow extends Window {
  ethereum?: any;
}

export const connectToMetamaskWithWeb3 = async () => {
  try {
    const windowObj = window as CustomWindow;
    if (!windowObj.ethereum) {
      throw new Error("Please install MetaMask to connect to a wallet.");
    }
    await windowObj.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(windowObj.ethereum);
    return web3;
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw new Error("Error connecting to MetaMask.");
  }
};

export const connectToWalletConnectWithWeb3 = async () => {
  try {
    const windowObj = window as CustomWindow;
    const bridge = "https://bridge.walletconnect.org";
    const qrcodeModalOptions = {
      mobileLinks: ["metamask", "trust", "rainbow"],
    };
    const connector = new WalletConnect({ bridge, qrcodeModalOptions });
    await connector.createSession();
    const web3 = new Web3(provider);
    return { web3, connector };
  } catch (error) {
    console.error("Error connecting to WalletConnect:", error);
    throw new Error("Error connecting to WalletConnect.");
  }
};


// ENd test functions
export const isMetamaskInstalled = async (type: string) => {
  try {
    // console.log("type", type);
    let windowMethod = window as any;
    const { ethereum } = windowMethod;
    // console.log("ethereum", ethereum);
    if (type === WALLETS.METAMASK) {
      const isInstalled = Boolean(ethereum && ethereum.isMetaMask);
      if (isInstalled) {
        return type;
      } else {
        return false;
      }
    } else if (type === WALLETS.WALLET_CONNECT) {
      return type;
    } else {
      const result = Boolean(ethereum && ethereum.isMetaMask);
      if (!result) {
        return type;
      } else {
        return false;
      }
    }
  } catch (error: any) {
    console.log("Error under isMetamaskInstalled", error);
  }
};

/**
 * Function used to connect to wallet
 * @param type
 * @returns
 */
export const connectToWallet =
  (type: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<string|boolean> => {
    try {
      const { ethereum } = window as any;
      if (ethereum && ethereum.isMetaMask) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        dispatch({ type: types.WALLET_ADDRESS, payload: account });
        dispatch({ type: types.WALLET, payload: type });

        const webInstance = new Web3(ethereum);
        const chainId = await webInstance.eth.getChainId();
        if (chainId !== Number(NETWORK_DETAILS.CHAIN_ID)) {
          const response = await switchNetwork();
          if (response) {
            alert("Required Network added successfully.Please connect now.");
          }
        }

        useEffect(() => {
          const handleAccountsChanged = (response: any) => {
            let isAdminLogin = getState().user.isAdmin;
            if (isAdminLogin) {
              dispatch({ type: types.WALLET_ADDRESS, payload: "" });
              dispatch({ type: types.WALLET, payload: "" });
              dispatch({ type: types.IS_ADMIN, payload: true });
            } else {
              dispatch({ type: types.WALLET_ADDRESS, payload: response[0] });
              dispatch({ type: types.WALLET, payload: type });
            }
            window.location.reload();
          };

          const handleChainChanged = (response: any) => {
            dispatch({ type: types.WALLET_ADDRESS, payload: "" });
            dispatch({ type: types.WALLET, payload: "" });
          };

          ethereum.on("accountsChanged", handleAccountsChanged);
          ethereum.on("chainChanged", handleChainChanged);

          return () => {
            ethereum.off("accountsChanged", handleAccountsChanged);
            ethereum.off("chainChanged", handleChainChanged);
          };
        }, [ethereum, dispatch, getState, type]);

        return account;
      } else {
        if (isMobile) {
          Toast.error("Please connects through Wallet Connect");
          return false;
        } else {
          Toast.error("Please install appropriate wallet");
          return false;
        }
      }
    } catch (error: any) {
      dispatch({ type: types.WALLET_ADDRESS, payload: "" });
      dispatch({ type: types.WALLET, payload: "" });
      console.log("Error under connect to wallet", error);
      return false;
    }
  };

//Open deeplink
const deeplinking = () => {
  window.open(DAPP_DEEPLINK);
  if (DAPP_DEEPLINK) {
    window.open(DAPP_DEEPLINK);
  } else {
    const url = window.location.href.split("//")[1].split("/")[0];
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${url}`;
    window.open(metamaskAppDeepLink,"_self");
  }
};

/**
 * Function to disconnect wallet
 * @param type
 * @returns
 */
export const disconnectWallet =
  (type: string) =>
  async (dispatch: Dispatch<AnyAction>, getStore: any): Promise<boolean> => {
    try {
       dispatch({ type: types.IS_ADMIN, payload: false });
      // dispatch({ type: types.UKIYO_DETAILS, payload: '' });
      // dispatch({ type: types.USDT_DETAILS, payload: "" });


      if (type === WALLETS.WALLET_CONNECT) {
        provider.disconnect();
      }
      dispatch({ type: types.WALLET_ADDRESS, payload: "" });
      dispatch({ type: types.WALLET, payload: "" });
      dispatch({ type: types.IS_ADMIN, payload: false });
      return true;
    } catch (error: any) {
      dispatch({ type: types.WALLET_ADDRESS, payload: "" });
      dispatch({ type: types.WALLET, payload: "" });
      console.log("Error under disconnect wallet ", error);
      return false;
    }
  };

/**
 * Function to onnect wallet with wallet connect
 * @param type
 * @returns
 */

export const connectWithWalletConnect =
  (type: string) =>
  async (dispatch: Dispatch<AnyAction>): Promise<boolean | void> => {
    try {
      await provider.enable().then(async (res: any) => {
        let web3Instance = new Web3(provider);
        let chainId = await web3Instance.eth.getChainId();
        if (chainId !== Number(NETWORK_DETAILS.CHAIN_ID)) {
          // await disconnectWallet(WALLET_TYPE.WALLET_CONNECT);
          await provider.disconnect();
          dispatch({ type: types.WALLET_ADDRESS, payload: "" });
          dispatch({ type: types.WALLET, payload: "" });
          return alert("Please connect to the Telos network first");
        } else {
          let address;
          address = res[0];
          // await dispatch({ type: NETWORK, payload: chainId });

          provider.on("accountsChanged", async (accounts: any) => {
            address = accounts[0];
            dispatch({ type: types.WALLET_ADDRESS, payload: address });
            dispatch({ type: types.WALLET, payload: type });
            return true;
          });

          // Subscribe to chainId change
          provider.on("networkChanged", async (chainId: number) => {
            if (chainId && chainId !== Number(NETWORK_DETAILS.CHAIN_ID)) {
              await provider.disconnect();
              dispatch({ type: types.WALLET_ADDRESS, payload: "" });
              dispatch({ type: types.WALLET, payload: "" });
              return Toast.error(
                `Please connect to the ${NETWORK_DETAILS.NAME}`
              );
            }
          });

          dispatch({ type: types.WALLET_ADDRESS, payload: address });
          dispatch({ type: types.WALLET, payload: type });
          return true;
        }
      });
    } catch (error) {
      //console.log("error", error);
      await provider.disconnect();
      dispatch({ type: types.WALLET_ADDRESS, payload: "" });
      dispatch({ type: types.WALLET, payload: "" });
    }
  };

const switchNetwork = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let windowMethod = window as any;
      const { ethereum } = windowMethod;
        await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK_DETAILS.HEX_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          let windowMethod = window as any;
          const { ethereum } = windowMethod;
          const result = await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORK_DETAILS.HEX_ID, // A 0x-prefixed hexadecimal string
                chainName: NETWORK_DETAILS.NAME,
                rpcUrls: [NETWORK_DETAILS.RPC],
                blockExplorerUrls: [NETWORK_DETAILS.EXPLORER],
                // iconUrls: [],
                nativeCurrency: {
                  name: NETWORK_DETAILS.NAME,
                  symbol: NETWORK_DETAILS.SYMBOL, // 2-6 characters long
                  decimals: NETWORK_DETAILS.DECIMAL,
                },
              },
            ],
          });
          return result;
        } catch (addError) {
          reject(addError);
        }
      }
      reject(switchError);
    }
  });
};
