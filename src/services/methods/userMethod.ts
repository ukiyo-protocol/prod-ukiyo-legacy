import Web3 from "web3";
import {
  ALLOWANCE_MAXLIMIT,
  ALLOWED_CURRENCY_TYPES,
  CURRENCY_TYPE,
  NETWORK_DETAILS
} from "../../config/constants";
// import { BigNumber } from "bignumber.js";
import { ContractInstanceHandler } from "./../InstanceService";
import {  IAllowanceApproval, IBuyToken, ICalculateToken, ICommonRequestPayload } from "../../interfaces/user";
import { CommonService } from "../CommonService";

const BigNumber = require("big-number");
//get ukiyo token balance
export const getBalanceMethod = async (walletType :string,
  walletAddress:string,
  type :string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let balance;
      if (type == CURRENCY_TYPE.ETH) {
        let Web3Instance;
        const { ethereum } = window as any;
        if (ethereum) {
          Web3Instance = new Web3(ethereum);
        } else {
          Web3Instance = new Web3(NETWORK_DETAILS.RPC as string);
        }
        balance = await Web3Instance.eth.getBalance(walletAddress!);
      } else {
        let contract = await ContractInstanceHandler.usdtInstanceHandler(
          walletType
        );
        balance = await contract.methods.balanceOf(walletAddress).call();
      }
      resolve(balance);
    } catch (error) {
      console.error("Error while fetching balance info ", error);
      reject(error);
    }
  });
};
//get usdt token details
export const getUsdtTokenDetailsMethod = async(
  walletType: string,
  walletAddress :string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.usdtInstanceHandler(
        walletType
      );
      let tokenBalance;
      if (walletAddress) {
                tokenBalance = await contract.methods
                  .balanceOf(walletAddress)
                  .call();

      }
      let tokenDecimals: number = await contract.methods.decimals().call();
      const tokenSymbol: string = await contract.methods.symbol().call();
      const tokenName: string = await contract.methods.name().call();

      tokenDecimals = 10 ** tokenDecimals;
      const data = {
        tokenBalance,
        tokenDecimals,
        tokenSymbol,
        tokenName,
      };
      resolve(data);
    } catch (error) {
      console.error("Error while fetching usdt token details", error);
      reject(error);
    }
  });
};

//get ukiyo token details
export const getUkiyoTokenDetailsMethod = async (walletType: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.ukiyoDynamicInstanceHandler(
        walletType
      );

      let tokenDecimals: number = await contract.methods.decimals().call();
      const tokenSymbol: string = await contract.methods.symbol().call();
      tokenDecimals = 10 ** tokenDecimals;
      const data = {
        tokenDecimals,
        tokenSymbol,
      };
      resolve(data);
    } catch (error) {
      console.error("Error while fetching ukiyo token details", error);
      reject(error);
    }
  });
};

//get allowance of contract
export const getAllowanceMethod = async (
  walletType:string,
  walletAddress:string,
  contractAddress:string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.usdtInstanceHandler(
        walletType
      );
      let allowance = await contract.methods
        .allowance(walletAddress, contractAddress)
        .call();

      resolve(allowance);
    } catch (error) {
      console.error("Error while fetching contract allowance", error);
      reject(error);
    }
  });
};

//set allowance for contract
export const setApprovalMethod = async (
  walletType:string,
  walletAddress:string,
  contractAddress:string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let maxlimit, limit, approval;
      // maxlimit = BigNumber(10).pow(40);
      // maxlimit = CommonService.convertWithDecimal(10,10**40);
      maxlimit = ALLOWANCE_MAXLIMIT.toLocaleString("fullwide", {
        useGrouping: false,
      });
     
  

      limit = maxlimit;
      let contract = await ContractInstanceHandler.usdtInstanceHandler(
        walletType
      );
      let gas = await contract.methods
        .approve(contractAddress, limit)
        .estimateGas({ from: walletAddress });

      approval = await contract.methods
        .approve(contractAddress, limit)
        .send({ from: walletAddress, gas: gas })
        .on("confirmation", () => {});

      resolve(approval);
    } catch (error) {
      console.error("Error while updating setApprovalMethod", error);
      reject(error);
    }
  });
};


//method to calculate tokens
export const calculateTokensMethod = async (
  walletType:string,
  data:any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
        walletType
      );
       let tokens; 
      if (contract && contract.methods) {
        tokens = await contract.methods
         .calculateTokens(Number(data.type), data.amount)
         .call();
      }
      resolve(tokens);
    } catch (error) {
      console.error("Error while calculating tokens", error);
      reject(error);
    }
  });
};

//method to get total token sold
export const totalTokenSoldMethod = async (
  walletType:string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
        walletType
      );
      let tokens; 
      if (contract && contract.methods) {
        tokens = await contract?.methods
          ?.totalTokenSold()
          .call();
      }
      resolve(tokens);
    } catch (error) {
      console.error("Error while fetching total token sold", error);
      reject(error);
    }
  });
};



//buy tokens using eth and usdt
export const buyTokenMethod = async (
  walletType:string,
  data:any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );

      let value;
      if (Number(data.type) === ALLOWED_CURRENCY_TYPES.ETH) {
        value = data.amount;
      } else {
        value = 0;
      }

      let gas = await contract.methods
        .buyTokens(data.amount, data.type, data.email)
        .estimateGas({ from: data.walletAddress, value: value });
      
      let result = await contract.methods
        .buyTokens(data.amount, data.type, data.email)
        .send({ from: data.walletAddress, gas: gas, value: value })
        .on("confirmation", () => {});

      resolve(result);
    } catch (error) {
      console.error("Error while buyTokenMethod", error);
      reject(error);
    }
  });
};


//Method to claim token
export const claimTokenMethod = async (
  walletType:string,
  data:any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract =
        await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
          walletType
        );
      let gas = await contract.methods
        .claimTokens(data.claim_id)
        .estimateGas({ from: data.walletAddress });
      
      let result = await contract.methods
        .claimTokens(data.claim_id)
        .send({ from: data.walletAddress, gas: gas })
        .on("confirmation", () => {});

      resolve(result);
    } catch (error) {
      console.error("Error while claimTokens", error);
      reject(error);
    }
  });
};


//method to get token price
export const totalTokenPriceMethod = async (
  walletType:string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await ContractInstanceHandler.ukiyoIcoContractInstanceHandler(
        walletType
      );
      let tokens; 
      if (contract && contract.methods) {
        tokens = await contract?.methods
          ?.price()
          .call();
      }
      resolve(tokens);
    } catch (error) {
      console.error("Error while fetching total token sold", error);
      reject(error);
    }
  });
};