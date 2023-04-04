import { IUpdateIsVerifiedStatus } from './../../interfaces/user';
// import { IAddUser } from "../../interfaces/common";
// import { IOwnershipTransfer } from "../../interfaces/user";
import { IOwnershipTransfer } from "../../interfaces/user";
import { ContractInstanceHandler } from "./../InstanceService";
import { IAdminMinimumPricePayload } from '../../interfaces/admin';

/**
 * Method to get ukiyo ICO contract owner
 * @param {*} walletType
 * @returns
 */
export const getUkiyoIcoOwnerAddress = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let ownerAddress = await contract.methods.owner().call();
      resolve(ownerAddress);
    } catch (error) {
      console.error("Error while getting ukiyo ICO owner address", error);
      reject(error);
    }
  });
};

/**
 * Function to make ico enable or disable
 * @param walletType
 * @returns
 */
export const enableOrDisableIcoMethod = async (
  walletType: string,
  walletAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let gas = await contract.methods
        .updateEnableOrDisable()
        .estimateGas({ from: walletAddress });

      let result = await contract.methods
        .updateEnableOrDisable()
        .send({ from: walletAddress, gas: gas })
        .on("confirmation", () => {});
      resolve(result);
    } catch (error) {
      console.error("Error while using enable or disable ICO feature", error);
      reject(error);
    }
  });
};

/**
 * Function to get the status of Ico
 * @param walletType
 * @returns
 */
export const getIcoEnableStatusMethod = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let ownerAddress = await contract.methods.enable().call();
     // console.log('ownerAddress', ownerAddress);
      resolve(ownerAddress);
    } catch (error) {
      console.error("Error while getting ICO status", error);
      reject(error);
    }
  });
};

/**
 * Method to update owner address
 * @param walletType
 * @param data
 * @returns
 */
export const updateOwnerAddressMethod = (
  walletType: string,
  data: IOwnershipTransfer
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      //calculate gas fees
      let gas = await contract.methods
        .transferOwnership(data.addressToUpdate)
        .estimateGas({ from: data.walletAddress });
      await contract.methods
        .transferOwnership(data.addressToUpdate)
        .send({ from: data.walletAddress, gas })
        .on("confirmation", () => {})
        .then((res: any) => {
          resolve(res);
        });
    } catch (error) {
      console.error("Error while updating owner address", error);
      reject(error);
    }
  });
};

/**
 * Method to update receiver address
 * @param walletType
 * @param data
 * @returns
 */
export const updateReceiverAddressMethod = (
  walletType: string,
  data: IOwnershipTransfer
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      //calculate gas fees
      let gas = await contract.methods
        .updateReceiverAddress(data.addressToUpdate)
        .estimateGas({ from: data.walletAddress });
      await contract.methods
        .updateReceiverAddress(data.addressToUpdate)
        .send({ from: data.walletAddress, gas })
        .on("confirmation", () => {})
        .then((res: any) => {
          resolve(res);
        });
    } catch (error) {
      console.error("Error while updating receiver address", error);
      reject(error);
    }
  });
};

/**
 * Method to get receiver address
 * @param {*} walletType
 * @returns
 */
export const getReceiverAddressMethod = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let receiverAddress = await contract.methods.receiverAddress().call();
      resolve(receiverAddress);
    } catch (error) {
      console.error("Error while getting receiver address", error);
      reject(error);
    }
  });
};


/**
 * Method to get total token sold
 * @param {*} walletType
 * @returns
 */
export const getTotalTokenSoldMethod = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      const totalTokenSold = await contract.methods.totalTokenSold().call();
      resolve(totalTokenSold);
    } catch (error) {
      console.error("Error while total token sold", error);
      reject(error);
    }
  });
};

/**
 * Method to get receiver address
 * @param {*} walletType
 * @returns
 */
export const getAmountRaisedInUsdMethod = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let receiverAddress = await contract.methods
        .totalAmountRaisedUSD()
        .call();
      resolve(receiverAddress);
    } catch (error) {
      console.error("Error while getting amount raised in USD", error);
      reject(error);
    }
  });
};


/**
 * Method to get the status of is_verified i.e user can buy or not 
 * @param walletType 
 * @returns 
 */
export const getIsUserVerifiedMethod = async (walletType: string, walletAddress :string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let isUserVerified = await contract.methods
        .isVerified(walletAddress)
        .call();
      resolve(isUserVerified);
    } catch (error) {
      console.error("Error while getting getIsUserVerifiedMethod", error);
      reject(error);
    }
  });
};


/**
 * Method to set is_verified status to buy tokens
 * @param walletType 
 * @param data 
 * @returns 
 */
export const updateIsVerifiedStatusMethod = (
  walletType: string,
  data: IUpdateIsVerifiedStatus
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      //calculate gas fees
      let gas = await contract.methods
        .updateUserKYC(data.email)
        .estimateGas({ from: data.walletAddress });
      await contract.methods
        .updateUserKYC(data.email)
        .send({ from: data.walletAddress, gas })
        .on("confirmation", () => {})
        .then((res: any) => {
          resolve(res);
        });
    } catch (error) {
      console.error("Error while updateIsVerifiedStatusMethod", error);
      reject(error);
    }
  });
};




/**
 * Method to get minimum price in usd to buy tokens
 * @param walletType 
 * @returns 
 */
export const getMinimumPriceMethod = async (walletType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let minAmount = await contract.methods
        .minBuyAmount()
        .call();
      resolve(minAmount);
    } catch (error) {
      console.error("Error while getting getMinimumPriceMethod", error);
      reject(error);
    }
  });
};


/**
 * Method to update minimum price to buy token in usd
 * @param walletType 
 * @param data 
 * @returns 
 */
export const updateMinimumPriceMethod = (
  walletType: string,
  data: IAdminMinimumPricePayload
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      //calculate gas fees
      let gas = await contract.methods
        .updateMinimumBuyAmount(data.amountInUsd)
        .estimateGas({ from: data.walletAddress });
      await contract.methods
        .updateMinimumBuyAmount(data.amountInUsd)
        .send({ from: data.walletAddress, gas })
        .on("confirmation", () => {})
        .then((res: any) => {
          resolve(res);
        });
    } catch (error) {
      console.error("Error while updateMinimumPriceMethod", error);
      reject(error);
    }
  });
};