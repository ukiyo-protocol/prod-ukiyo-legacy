import moment from "moment";
import { GRAPH_FILTER_TYPES } from "../config/constants";
import { IGraphPayload } from "../interfaces/common";
const BigNumber = require("big-number");


const convertWithDecimal = (value: any, decimal: any) => {
  if (value > 0) {
    if (isInt(value)) {
      value = parseInt(value);
      value = BigNumber(value).multiply(decimal);
    } else {
      value = Math.round(value * decimal);
      value = toFixed(value);
      value = parseInt(value.toString().split(".")[0]);
      value = toFixed(value);
      value = BigNumber(value);
    }
    return value.toString();
  } else {
    return 0;
  }
};

const convertBackToNormal = (value: any, decimal: number) => {
  let x = BigNumber(value).toString();
  let y = BigNumber(decimal).toString();
  let result = BigNumber(x).div(y).toString();
  return result;
};

const toFixed = (x: any) => {
  let e;
  if (Math.abs(x) < 1.0) {
     e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
     e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

const isInt = (n: number) => {
  return n % 1 === 0;
};

const getError = (error: any) => {
  let finalErr;
  let errorMsg =
    error && error.message ? error.message : "Something went wrong";
  if (errorMsg.indexOf("Internal JSON-RPC error") > -1 || 0) {
    let msg = errorMsg.replace("Internal JSON-RPC error.", "");
    msg = JSON.parse(msg);

    if (msg.message.includes("stack limit reached")) {
      finalErr = "Enter less amount.";
    } else {
      finalErr = msg.message.split(":")[1];
    }
    return finalErr;
  } else if (errorMsg.indexOf("execution reverted:") > -1) {
    errorMsg = error.message.split("{")[0].split(":")[1];
    return errorMsg;
  } else if (errorMsg.indexOf("Error: Internal JSON-RPC error") === -1) {
    let errorMsg1 = error.message.split("{");
    return errorMsg1;
  } else {
    return errorMsg;
  }
};

const custmizeAddress = (address: string) => {
  let firstFive = address.substring(0, 5);
  let lastFour = address.substr(address.length - 4);
  return firstFive + "..." + lastFour;
};

const fixedToDecimal = (value: any, decimals = 4) => {
  value =
    value && parseFloat(value) > 0
      ? decimals === 2
        ? value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
        : value.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]
      : 0;
  return value;
};

const checkIfDecimalValue = (value: any) => {
  if (value.indexOf(".") === -1) {
    return true;
  } else {
    return false;
  }
};

const addMonthsToTimeStampAndReturnDaysLeft = (
  timestamp: number,
  month: number
) => {
  let data = new Date(timestamp * 1000);
  // let makeUtcTime = moment.utc(data).add(month, "months");
  // let leftDays = moment(makeUtcTime).diff(moment(), "days");
  let makeUtcTime = moment.utc(data).add(month, "months");
  let leftDays = moment(makeUtcTime).diff(moment(), "days");
  // console.log("leftDays", leftDays);
  if (Number(leftDays) >= 0) {
    return false;
  } else {
    return true;
  }
};

const formatDateToReadAble = (timestamp: number) => {
  let data = new Date(timestamp * 1000);
  var date = moment(data).format("DD/MMM/YYYY HH:mm A");
  return date;
};

const checkifSeedSaleEnded = (timestamp: number) => {
  let timeleft;
  let data = new Date(timestamp * 1000);
  let betTime = moment.utc(data);
  let leftDays: any = moment.duration(moment(betTime).diff(moment()));
  let days = parseInt(leftDays.asDays());
  let hrs = parseInt(leftDays.asHours()) % 24;
  let min = parseInt(leftDays.asMinutes()) % 60;
  let sec = parseInt(leftDays.asSeconds()) % 60;
  if (days >= 0 && hrs >= 0 && min >= 0 && sec >= 0) {
    timeleft = false;
  } else {
    timeleft = true;
  }
  return timeleft;
};

const getGraphDataFormat = (
  filter: number,
  data: Array<IGraphPayload>,
  tokenDecimals: number
) => {
  //  console.log("filter, data,metaTokenDecimals", filter, data, tokenDecimals);
  if (filter === GRAPH_FILTER_TYPES.DAY) {
    let result :any = [] ;
    for (const item of data) {
      //let time = new Date(item.buy_time * 1000);
      const date = moment(item.date).format("h:mm A");
      result.push({
        name: date,
        tokens: item.total_token_purchased / tokenDecimals,
      });
    }
    return result;
  } else if (filter === GRAPH_FILTER_TYPES.WEEK) {
    let result :any = [] ;
    for (const item of data) {
      const date = moment(item.date).utc().format("MMM DD");
      result.push({
        name: date,
        tokens: item.total_token_purchased / tokenDecimals,
      });
    }
    result.sort((a: any, b: any) => a.valueOf() - b.valueOf());
    return result;
  } else if (filter === GRAPH_FILTER_TYPES.MONTH) {
    let result :any = [] ;
    for (const item of data) {
      const date = moment(item.date).format("MMM DD");
      result.push({
        name: date,
        tokens: item.total_token_purchased / tokenDecimals,
      });
    }
    result.sort((a: any, b: any) => a.valueOf() - b.valueOf());
    return result;
  } else {
    //filter is of year
    let result :any = [] ;
    for (const item of data) {
      const date = moment(item.date).format("MMM YYYY");
      result.push({
        name: date,
        tokens: item.total_token_purchased / tokenDecimals,
      });
    }

    return result;
  }
};

const allowOnlyNumber = (value :any) => {
  const regex: any = /^\d*\.?\d{0,8}$/gm;
  
  var re = new RegExp(regex);
  if (re.test(value)) {
    return true;
  } else {
    return false;
  }
};




export const CommonService = {
  convertWithDecimal,
  toFixed,
  getError,
  custmizeAddress,
  fixedToDecimal,
  convertBackToNormal,
  checkIfDecimalValue,
  addMonthsToTimeStampAndReturnDaysLeft,
  formatDateToReadAble,
  checkifSeedSaleEnded,
  getGraphDataFormat,
  allowOnlyNumber,
};
