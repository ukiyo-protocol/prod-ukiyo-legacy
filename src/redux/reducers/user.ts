import { any } from "prop-types";
import * as actionTypes from "../actionTypes"

const initialState: UserState = {
  walletAddress: null,
  wallet: null,
  network: null,
  isAdmin: false,
  token: '',
  usdtTokenDetails: any,
  ukiyoTokenDetails:any
};

export function userReducer(
  state = initialState,
  action: any
): UserState {
  switch (action.type) {
    case actionTypes.WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload };
    case actionTypes.WALLET:
      return { ...state, wallet: action.payload };
    case actionTypes.IS_ADMIN:
      return { ...state, isAdmin: action.payload };
    case actionTypes.NETWORK:
      return { ...state, network: action.payload };
    case actionTypes.TOKEN:
      return { ...state, token: action.payload };
    case actionTypes.UKIYO_DETAILS:
      return { ...state, ukiyoTokenDetails: action.payload };
    case actionTypes.USDT_DETAILS:
      return { ...state, usdtTokenDetails: action.payload };
    default:
      return state;
  }
}
