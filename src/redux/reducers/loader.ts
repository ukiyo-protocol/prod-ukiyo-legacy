import * as actionTypes from "../actionTypes"

const initialState: LoadingState = {
  isLoading: false,
};

export function loaderReducer(
  state = initialState,
  action: any
): LoadingState {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
