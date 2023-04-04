import {
  enableOrDisableIcoMethod,
  getAmountRaisedInUsdMethod,
  getIcoEnableStatusMethod,
  getIsUserVerifiedMethod,
  getMinimumPriceMethod,
  getReceiverAddressMethod,
  getTotalTokenSoldMethod,
  getUkiyoIcoOwnerAddress,
  updateIsVerifiedStatusMethod,
  updateMinimumPriceMethod,
  updateOwnerAddressMethod,
  updateReceiverAddressMethod,
} from "./../../services/methods/adminMethod";
import { AppDispatch } from "./../store";
// import { IAddUser } from "./../../interfaces/common";
// import { IContractSendTxnConfirmResponse } from "./../../interfaces/user";
import { setLoader } from "./loader.action";
import Toast from "../../components/common/Toast";
import { CommonService } from "./../../services/CommonService";
import { IContractSendTxnConfirmResponse } from "../../interfaces/common";
import { IOwnershipTransfer, IUpdateIsVerifiedStatus } from "../../interfaces/user";
import { IAdminMinimumPricePayload } from "../../interfaces/admin";
// import { AppDispatch } from "./../store";
// import { IOwnershipTransfer } from "../../interfaces/user";
// import { IAdminLandingPageStats } from "../../interfaces/common";

//Action to get ukiyo ico owner address
export const actionGetUkiyoIcoOwner =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let result;
      // dispatch(setLoader(true));
      result = (await getUkiyoIcoOwnerAddress(walletType)) as string;
      //dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      // dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
  };

//Action to enable or disable ico
export const actionToEnableOrDisableIco =
  (walletType: string, walletAddress: string) =>
  async (
    dispatch: AppDispatch
  ): Promise<IContractSendTxnConfirmResponse | void> => {
    try {
      let result;
      dispatch(setLoader(true));
      result = (await enableOrDisableIcoMethod(
        walletType,
        walletAddress
      )) as IContractSendTxnConfirmResponse;
      dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
  };

//Actio to get ICO enable status
export const actionToGetIcoStatus =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let result;
      // dispatch(setLoader(true));
      result = (await getIcoEnableStatusMethod(walletType)) as string;
      //dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      // dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
  };

//Action to update owner address
export const toUpdateOwnerAddress = (
  walletType: string,
  data: IOwnershipTransfer
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader(true));
      let result = (await updateOwnerAddressMethod(
        walletType,
        data
      )) as IContractSendTxnConfirmResponse;
      dispatch(setLoader(false));
      return result;
    } catch (error) {
      //  console.error('Error under toUpdateOwnerAddress ', error);
      dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
      //return error;
    }
  };
};

//Action to update receiver address
export const toUpdateReceiverAddress = (
  walletType: string,
  data: IOwnershipTransfer
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader(true));
      let result = (await updateReceiverAddressMethod(
        walletType,
        data
      )) as IContractSendTxnConfirmResponse;
      dispatch(setLoader(false));
      return result;
    } catch (error) {
      dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
  };
};

//Action to get receiver address
export const actionGetReceiverAddress =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<string | void> => {
    try {
      let result;
      // dispatch(setLoader(true));
      result = (await getReceiverAddressMethod(walletType)) as string;
      //dispatch(setLoader(false));
      return result;
    } catch (error: any) {
      // dispatch(setLoader(false));
      return Toast.error(CommonService.getError(error));
    }
  };

// Action to get total token sold
export const actionGetTotalTokenSold =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<number | void> => {
    try {
      let result;
      result = (await getTotalTokenSoldMethod(walletType)) as number;
      return result;
    } catch (error: any) {
      // return Toast.error(CommonService.getError(error));
      throw CommonService.getError(error);
    }
  };

//Action get amount raised in USD

export const actionGetAmountRaisedInUSD =
  (walletType: string) =>
  async (dispatch: AppDispatch): Promise<number | void> => {
    try {
      let result;
      result = (await getAmountRaisedInUsdMethod(walletType)) as number;
      return result;
    } catch (error: any) {
      // return Toast.error(CommonService.getError(error));
      throw CommonService.getError(error);
    }
  };

//Action to update is verified status in true or false
export const actionToUpdateIsVerifiedStatus =
(walletType: string, data :IUpdateIsVerifiedStatus) =>
async (dispatch: AppDispatch): Promise<boolean | void> => {
  try {
    dispatch(setLoader(true))
    let result;
    result = (await updateIsVerifiedStatusMethod(walletType, data)) as boolean;
    dispatch(setLoader(false))

    return result;
  } catch (error: any) {
    dispatch(setLoader(false))
    throw CommonService.getError(error);
  }
};

//Action to get is verified status in true or false
export const actionToGetIsVerifiedStatus =
(walletType: string , walletAddress :string) =>
async (dispatch: AppDispatch): Promise<boolean | void> => {
  try {
    let result;
    result = (await getIsUserVerifiedMethod(walletType, walletAddress)) as boolean;
    return result;
  } catch (error: any) {
    throw CommonService.getError(error);
  }
};

//Action to get minimum price in usd to buy tokens
export const actionToGetMinimumPriceToBuy =
(walletType: string ) =>
async (dispatch: AppDispatch): Promise<number | void> => {
  try {
    let result;
    result = (await getMinimumPriceMethod(walletType)) as number;
    return result;
  } catch (error: any) {
    throw CommonService.getError(error);
  }
};


//Action to ste minimum price in usd to buy tokens
export const actionToSetMinimumPriceToBuy =
(walletType: string, data : IAdminMinimumPricePayload) =>
async (dispatch: AppDispatch): Promise<any | void> => {
  try {
     dispatch(setLoader(true));
    let result;
    result = (await updateMinimumPriceMethod(walletType, data)) as any;
    dispatch(setLoader(false));

    return result;
  } catch (error: any) {
    dispatch(setLoader(false));
    throw CommonService.getError(error);
  }
};