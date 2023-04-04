export interface IUserDetailsPayload {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  wallet_address: string;
  kyc_submitted_date: string;
  kyc_approved_date: string;
  is_email_verified: number;
  is_kyc_verified: number;
}
export interface ITransactions {
  id: number;
  mapping_id: number;
  tx_hash: string;
  user_id: number;
  wallet_address: string;
  amount_in_usd: number;
  total_tokens: number;
  vesting_start_time: number;
  currency_type: number;
  is_claimed: number;
  buy_timestamp: string;
  created_at: string;
  updated_at: string;
  user_details: IUserDetailsPayload;
}

export interface ITransactionListPayload {
  count: number;
  rows: Array<ITransactions>;
}
export interface IUserListPayload {
  count: number;
  rows: Array<IUserDetailsPayload>;
}

export interface IUpdateOwnershipAddress {
  newOwnerAddress: string;
  confirmNewOwnerAddress: string;
}

export interface ICallBackResponse {
  trigger: string;
  address: string;
}

export interface IUpdateReceiverAddress {
  newReceiverAddress: string;
  confirmNewReceiverAddress: string;
}

export interface IUkiyoTokenDecimalsAndSymbol {
  tokenDecimals: number;
  tokenSymbol: string;
}
export interface IAdminDashboardAsyncPayload {
  totalTokenSold: string;
  amountRaisedInUsd: string;
  ukiyoTokenInfo: IUkiyoTokenDecimalsAndSymbol;
}


export interface IAdminMinimumPricePayload {
  walletAddress  :string;
  amountInUsd : string;
}