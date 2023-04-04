import Toast from "../../components/common/Toast";
import { CommonService } from "../../services/CommonService";

import { AppDispatch } from "./../store";
import {
  buyTokenMethod,
  calculateTokensMethod,
  claimTokenMethod,
  getAllowanceMethod,
  getBalanceMethod,
  getUkiyoTokenDetailsMethod,
  getUsdtTokenDetailsMethod,
  setApprovalMethod,
  totalTokenPriceMethod,
  totalTokenSoldMethod,
} from "../../services/methods/userMethod";

import * as actionType from "../actionTypes";
import { setLoader } from "./loader.action";
import { ALLOWED_CURRENCY_TYPES, CURRENCY_TYPE } from "../../config/constants";

/**
 * Action to get balance of eth or usdt using type
 * @param walletType,
 * @param walletAddress,
 * @param type,
 * @returns
 */
export const actionToGetBalance =
  (walletType: string, walletAddress: string, type: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let _type;
      if (Number(type) === ALLOWED_CURRENCY_TYPES.ETH) {
        _type = CURRENCY_TYPE.ETH;
      } else {
        _type = CURRENCY_TYPE.USDT;
      }
      return (await getBalanceMethod(
        walletType,
        walletAddress,
        _type
      )) as string;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to get usdt token details like (symbol, name , decimal)
 * @param walletType
 * @param walletAddress
 * @returns
 */
export const actionToGetUsdtTokenDetails =
  (walletType: string, walletAddress: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let result = (await getUsdtTokenDetailsMethod(
        walletType,
        walletAddress
      )) as any;
      dispatch({ type: actionType.USDT_DETAILS, payload: result });

      return result;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to get ukiyo token details
 * @param walletType
 * @returns
 */
export const actionToGetUkiyoTokenDetails =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let result = (await getUkiyoTokenDetailsMethod(walletType)) as any;
      dispatch({ type: actionType.UKIYO_DETAILS, payload: result });
      return result;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to get contract allowance
 * @param walletType
 * @param walletAddress
 * @param contractAddress
 * @returns
 */

export const actionToGetAllowance =
  (walletType: string, walletAddress: string, contractAddress: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      return (await getAllowanceMethod(
        walletType,
        walletAddress,
        contractAddress
      )) as string;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };
/**
 * Action to get approval for contract
 * @param walletType
 * @param walletAddress
 * @param contractAddress
 * @returns
 */
export const actionToSetAppoval =
  (walletType: string, walletAddress: string, contractAddress: string) =>
  async (dispatch: AppDispatch): Promise<any | void> => {
    try {
      dispatch(setLoader(true));
      let result = (await setApprovalMethod(
        walletType,
        walletAddress,
        contractAddress
      )) as any;
      dispatch(setLoader(false));

      return result;
    } catch (error: any) {
      dispatch(setLoader(false));

      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to calculate tokens
 * @param walletType
 * @param data
 * @returns
 */
export const actionToCalculate =
  (walletType: string, data: any) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      return (await calculateTokensMethod(walletType, data)) as any;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to get total token sold
 * @param walletType
 * @returns
 */
export const actionToGetTotalTokenSold =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      return (await totalTokenSoldMethod(walletType)) as any;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

/**
 * Action to get buy tokens
 * @param walletType
 * @param data
 * @returns
 */
export const actionToBuyTokens =
  (walletType: string, data: any) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      dispatch(setLoader(true));
      let result = (await buyTokenMethod(walletType, data)) as any;
      dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
    };


/**
 * Action to claim user tokens
 * @param walletType 
 * @param data 
 * @returns 
 */
export const actionToClaimTokens =
  (walletType: string, data: any) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      dispatch(setLoader(true));
      let result = (await claimTokenMethod(walletType, data)) as any;
      dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
    };

/**
 * Action to get token price
 * @param walletType 
 * @returns 
 */
export const actionToGetTokenPrice =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<number | void> => {
    try {
      return (await totalTokenPriceMethod(
        walletType,
      )) as number;
    } catch (error: any) {
      return Toast.error(CommonService.getError(error));
    }
  };

