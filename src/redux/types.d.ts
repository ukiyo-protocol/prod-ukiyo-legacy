type Action = {
  type: string
  payload: any
}
type DispatchType = (args: Action) => Action

type UserState = {
  walletAddress: string | null;
  wallet: string | null;
  network: string | null;
  isAdmin: boolean | false;
  token: string | null
  usdtTokenDetails: any;
  ukiyoTokenDetails: any;
};

type LoadingState = {
  isLoading: boolean | false;
};

