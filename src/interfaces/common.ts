export interface IUsdtDetails {
  tokenBalance: number;
  tokenDecimals: number;
  tokenSymbol: string;
}

export interface ICalculateTokens {
  _totalTokens: number;
  _amountUsd: number;
}


export interface IAdminLandingPageStats {
  totalAmountRaised: number;
  totalTokenSold: number;
}

export interface IGraphPayload {
  date: string;
  //token_amount: number;
  total_buy_amount: number;
  total_token_purchased: number;
  total_amount_in_usd: number;
  month: number;
}

export interface IChartResponse {
  name: string;
  tokens: string;
}

export interface IAddUser {
  amount: string;
  choice: string;
  address: string;
  walletAddress?: string;
}

export interface IContractSendTxnConfirmResponse {
  status: boolean;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  gasUsed: number;
}