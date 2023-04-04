
import * as actionTypes from "../actionTypes"
export const setLoader = (data: boolean) => ({
  type: actionTypes.SET_LOADING,
  payload: data,
});

