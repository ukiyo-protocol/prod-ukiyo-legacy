import axios, { AxiosInstance, AxiosResponse } from "axios";
import Toast from "../components/common/Toast";
import { API_HOST, SECRET_KEY } from "./../config/constants";
import { RESPONSES } from "./../constants/response";
import { setLoader } from "./../redux/actions/loader.action";
import { reduxStore } from "./../redux/store";
import * as types from "./../redux/actionTypes"
import { disconnectWallet } from "../redux/actions/connect.action";
import { AnyAction } from 'redux';
import { redirect } from "react-router-dom";

   const baseURL = API_HOST;
const axiosInstance: AxiosInstance = axios.create({ baseURL });
axiosInstance.defaults.headers.accept = "*/*";
axiosInstance.defaults.headers["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers["Access-Control-Allow-Methods"] = '*';
// axiosInstance.defaults.headers["secret-key"] = SECRET_KEY as string;


axiosInstance.interceptors.request.use(
  function (config:any) {

  let store = reduxStore.getState();
    let token, secretKey;

    // if (store?.user?.token) {
    //   token = store.user.token;
    // } else {
    //   secretKey = SECRET_KEY;
    // }
      if (!store?.user?.isAdmin) {
        token = store.user.token;
      } else {
        secretKey = SECRET_KEY;
      }
    

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (secretKey) {
      config.headers["secret-key"] = secretKey;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


/**Add a response interceptor */
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status == RESPONSES.UN_AUTHORIZED) {
       
          let store = reduxStore;
          let userDetails = reduxStore.getState();
        
          store.dispatch({ type: types.TOKEN, payload: '' })
          store.dispatch({ type: types.IS_ADMIN, payload: '' })
          store.dispatch({ type: types.WALLET_ADDRESS, payload: '' })
          store.dispatch({ type: types.WALLET, payload: '' })
          
        disconnectWallet(userDetails.user.wallet!);
        window.location.href = '/login';
        return error.response.data;

        
      } else {
        return Promise.reject(error);
      }
    }
  }
);

function handleSuccess(res: AxiosResponse) {
  if (res.status === RESPONSES.SUCCESS || res.status === RESPONSES.CREATED)
    res?.data?.message && Toast.success(res.data.message);
  else {
    res?.data?.message && Toast.success(res.data.message);
  }
}

function formatUrl(url: string, params: string) {
  let network = localStorage.getItem("network");
  if (!network) network = "eth";
  network = network.toUpperCase();
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}&network=${network}`
      : `?network=${network}`;
  return `${url}${params}`;
}

export const apiCallPost = (
  url: string,
  data: any,
  showToast = false,
  showLoader = true
) =>
  new Promise((resolve) => {
    showLoader && reduxStore.dispatch(setLoader(true));
    axiosInstance
      .post(url, data)
      .then((res) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        showToast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        resolve(null);
      });
  });

export const apiCallGet = (
  url: string,
  params = {},
  showToast = false,
  showLoader = true
) =>
  new Promise((resolve) => {

    showLoader && reduxStore.dispatch(setLoader(true));
    axiosInstance
      .get(url, params)
      .then((res) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        showToast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        handleSuccess(error);
        showLoader && reduxStore.dispatch(setLoader(false));
        resolve(null);
      });
  });

export const apiCallPut = (
  url: string,
  data: any,
  params: any = {},
  showToast = false,
  showLoader = true
) =>
  new Promise((resolve) => {
    showLoader && reduxStore.dispatch(setLoader(true));
    axiosInstance
      .put(url, params, data)
      .then((res) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        showToast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        resolve(null);
      });
  });

export const apiCallPatch = (
  url: string,
  data: any,
  params: any = {},
  showToast = false,
  showLoader = true
) =>
  new Promise((resolve) => {
    showLoader && reduxStore.dispatch(setLoader(true));
    axiosInstance
      .patch(url, data, params)
      .then((res) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        showToast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        resolve(null);
      });
  });

export const apiCallDelete = (
  url: string,
  params: any = {},
  showToast = false,
  showLoader = true
) =>
  new Promise((resolve) => {
    showLoader && reduxStore.dispatch(setLoader(true));
    axiosInstance
      .delete(formatUrl(url, params))
      .then((res) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        showToast && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        showLoader && reduxStore.dispatch(setLoader(false));
        resolve(null);
      });
  });
