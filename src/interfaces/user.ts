export interface IProvideApprovalPayload {
  walletAddress: string;
  address: string;
}



export interface IUserTransactionPayload {
  _id: string;
  user_address: string;
  token_amount: number;
  txn_hash: string;
  type: number;
  txn_type: string;
  buy_time: number;
  buy_amount: number;
}

export interface IUserTransactionListPayload {
  count: number;
  rows: Array<IUserTransactionPayload>;
}


export interface IOwnershipTransfer {
  addressToUpdate: string;
  walletAddress: string;
}


export interface IVestingUsersDetails {
  _id: string;
  user_address: string;
  total_tokens: number;
  choice: number;
  created: string;
  claimed_amount: number;
}
export interface IVestingRegisterUserResponse {
  count: number;
  rows: Array<IVestingUsersDetails>;
}



export interface ICommonRequestPayload {
  walletType: string;
  walletAddress?: string;
  type?: string | number;
}
export interface IAllowanceApproval {
  walletType: string;
  walletAddress?: string;
  contractAddress: string;
}

export interface IBuyToken {
  walletType: string;
  data: {
    amount: string,
    walletAddress: string
    type: string;
  }
}


export interface ICalculateToken {
  walletType: string;
  data: {
    amount: string;
    type: number;
  };
}



export interface IUpdateIsVerifiedStatus {
  email: string;
  walletAddress: string;
}