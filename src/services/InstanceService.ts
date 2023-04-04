import {UKIYO_TOKEN_ABI } from "../abis/token.abi";
import { DYNAMIC_ABI } from "./../abis/dynamic.abi";
import { UKIYO_ICO_ABI } from "../abis/ukiyoIco.abi";
import { provider } from "./walletConnect/provider";
import { CONTRACT, WALLETS } from "./../config/constants";
import web3 from "web3";
import { NETWORK_DETAILS } from "../config/constants";

/**
 * Function to detect provider
 * @returns
 */
const detectProvider = () => {
  try {
    let provider;
    if (typeof window !== "undefined") {
      const { ethereum, web3 } = window as any;
      if (ethereum || web3) {
        provider = ethereum;
      } else {
        provider = NETWORK_DETAILS.RPC;
      }
    } else {
      provider = NETWORK_DETAILS.RPC;
    }

    return provider;
  } catch (error: any) {
    console.log("error under detect provider handler:", error);
  }
};

/**
 * Initialize instance
 */
const instanceInit = async (): Promise<void> => {
  try {
    let web3Instance: any;
    let currentProvider: any = await detectProvider();
    web3Instance = await new web3(currentProvider);
    if (currentProvider) {
      await new web3Instance.eth.Contract(
        UKIYO_ICO_ABI,
        CONTRACT.UKIYO_ICO_ADDRESS
      );
    } else {
      console.log("please connect with a desire provider");
    }
  } catch (error: any) {
    console.log("Error under instance init handler", error);
  }
};

instanceInit();

/**
 * ICO contract instance
 * @param walletType
 * @returns
 */
const ukiyoIcoContractInstanceHandler = async (walletType: string) => {
  try {
    const { ethereum } = window as any;
    if (walletType === WALLETS.METAMASK) {
      const initInstance = await new web3(ethereum);
      return await new initInstance.eth.Contract(
        UKIYO_ICO_ABI,
        CONTRACT.UKIYO_ICO_ADDRESS
      );
    } else if (walletType === WALLETS.WALLET_CONNECT) {
      await provider.enable();
      const initInstance = await new web3(provider);
      return await new initInstance.eth.Contract(
        UKIYO_ICO_ABI,
        CONTRACT.UKIYO_ICO_ADDRESS
      );
    } else {
      //instance with RPC
      let initInstance: any = await new web3(NETWORK_DETAILS.RPC!);
      
      return await new initInstance.eth.Contract(
        UKIYO_ICO_ABI,
        CONTRACT.UKIYO_ICO_ADDRESS
      );
    }
  } catch (err: any) {
    console.log("Error under ukiyoIcoContractInstanceHandler", err);
  }
};


//dynamic instance handler
const ukiyoDynamicInstanceHandler = async (walletType: string) => {
  try {
    const { ethereum } = window as any;
    if (walletType === WALLETS.METAMASK) {
      const initInstance = await new web3(ethereum);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.UKIYO_TOKEN_ADDRESS
      );
    } else if (walletType === WALLETS.WALLET_CONNECT) {
      await provider.enable();
      const initInstance = await new web3(provider);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.UKIYO_TOKEN_ADDRESS
      );
    } else {
      //instance with RPC
      let initInstance: any = await new web3(NETWORK_DETAILS.RPC as string);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.UKIYO_TOKEN_ADDRESS
      );
    }
  } catch (err: any) {
    console.log("Error under ukiyoDynamicInstanceHandler ", err);
  }
};

//dynamic instance handler
const usdtInstanceHandler = async (walletType: string) => {
  try {
    const { ethereum } = window as any;
    if (walletType === WALLETS.METAMASK) {
      const initInstance = await new web3(ethereum);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.USDT_ADDRESS
      );
    } else if (walletType === WALLETS.WALLET_CONNECT) {
      await provider.enable();
      const initInstance = await new web3(provider);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.USDT_ADDRESS
      );
    } else {
      //instance with RPC
      let initInstance: any = await new web3(NETWORK_DETAILS.RPC as string);
      return await new initInstance.eth.Contract(
        UKIYO_TOKEN_ABI,
        CONTRACT.USDT_ADDRESS
      );
    }
  } catch (err: any) {
    console.log("Error under ukiyoDynamicInstanceHandler ", err);
  }
};


export const ContractInstanceHandler = {
  instanceInit,
  detectProvider,
  ukiyoIcoContractInstanceHandler,
  ukiyoDynamicInstanceHandler,
  usdtInstanceHandler,
};
