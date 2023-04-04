export const NETWORK_DETAILS = {
  NAME: process.env.REACT_APP_CHAIN_NAME,
  RPC: process.env.REACT_APP_RPC_URL,
  CHAIN_ID: process.env.REACT_APP_NETWORK_CHAIN_ID,
  SYMBOL: process.env.REACT_APP_CURRENCY_SYMBOL,
  EXPLORER: process.env.REACT_APP_BLOCK_EXPLORE_URL,
  DECIMAL: process.env.REACT_APP_CURRENCY_DECIMAL,
  HEX_ID: process.env.REACT_APP_HEX_ID,
  INFURA_ID: process.env.REACT_APP_INFURA_ID,
};

export const WALLETS = {
  METAMASK: "METAMASK",
  WALLET_CONNECT: "WALLET_CONNECT",
};

export const CONTRACT = {
  UKIYO_ICO_ADDRESS: process.env.REACT_APP_UKIYO_ICO_CONTRACT_ADDRESS,
  UKIYO_TOKEN_ADDRESS: process.env.REACT_APP_UKIYO_TOKEN_ADDRESS as string,
  USDT_ADDRESS: process.env.REACT_APP_USDT_CONTRACT_ADDRESS,
};

export const ALLOWED_CURRENCY_TYPES = {
  ETH: 1,
  USDT: 2,
};

export const CURRENCY_TYPE = {
  ETH: "ETH",
  USDT: "USDT",
};

export const ETH_DECIMALS = 10 ** 18;
export const ALLOWANCE_MAXLIMIT = 10e40;
export const API_HOST = process.env.REACT_APP_API_HOST;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const USD_DECIMALS =10**8

export const GRAPH_FILTER_TYPES = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3,
};

export const DAPP_DEEPLINK = process.env.REACT_APP_DEEPLINK;
export const API = {
  USER: {
    SIGN_UP: "/auth/signup",
    LOGIN: "/auth/login",
    VERIFY_EMAIL: "/user/email/verify",
    PROFILE: {
      VIEW: "/user/me", //get user profile
      EDIT: "/user/update",
      CHANGE_PASSWORD: "/user/change-password",
    },
    VOUCHER: { CREATE: "/user/create-voucher" },
    PASSWORD: {
      SEND_OTP: "/user/otp",
      VERIFY_OTP: "/user/verify-otp",
      RESET: "/user/password/reset",
    },
    STATS: "/user/statistics",
    TRANSACTIONS: "/user/transactions",
    VERIFY_ACCOUNT: "/user/verify-account/",
    AUTH_VERIFY_EMAIL: "/auth/verify-email",
  },
  SUMSUB: {
    ACCESS_TOKEN: "/sumsub/sdk/access-token",
    APPLICANT_STATUS: "/sumsub/applicant/status",
  },
  ADMIN: {
    TRANSACTIONS: "/admin/transactions",
    USERS: "/admin/users",
    GRAPH: "/admin/statistics",
  },
};

export const SUMSUB = {
  ACCESS_TOKEN: process.env.REACT_APP_SUMSUB_APP_ACCESS_TOKEN,
  SECRET_KEY: process.env.REACT_APP_SUMSUB_APP_SECRET_KEY,
  BASE_URL: process.env.REACT_APP_SUMSUB_BASE_URL,
};

export const KYC_STATUS = {
  SUBMITTED: 1,
  APPROVED: 2,
  REJECTED: 3,
  PENDING: 4,
};

export const CRYPTO_SECRET_KEY = process.env.REACT_APP_AES_SECRET_KEY;

export const FILTER_TYPE = {
  START: "start",
  END: "end",
  CLAIM: "claim",
};

export const SETTING_TRIGGER = {
  OWNERSHIP: "OWNERSHIP",
  RECEIVER: "RECEIVER",
};


export const USD_DECIMALS_FOR_PRICE = 10 ** 5;



export const USD_DECIMALS_FOR_MIN_PRICE = 10**8;
