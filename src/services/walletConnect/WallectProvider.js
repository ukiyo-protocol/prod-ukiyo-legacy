import WalletConnectProvider from "@walletconnect/web3-provider";
export const provider = new WalletConnectProvider({
    rpc: {
        // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        56: "https://bsc-dataseed.binance.org/",
    },
    chainId: 56,
    network: "binance",
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust", "coinbase", "walletconnect"],
    },
});

