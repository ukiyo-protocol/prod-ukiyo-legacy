import { NETWORK_DETAILS } from "./../../config/constants";
import WalletConnectProvider from "@walletconnect/web3-provider";
const networkChainId = NETWORK_DETAILS.CHAIN_ID as unknown as number;

export const provider = new WalletConnectProvider({
  infuraId: NETWORK_DETAILS.INFURA_ID as string,
  rpc: {
    [networkChainId]: NETWORK_DETAILS.RPC as string,
  },
  chainId: networkChainId,
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust", "walletconnect"],
  },
}) as any;
