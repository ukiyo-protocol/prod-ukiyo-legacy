import { combineReducers } from "redux";
import { userReducer } from "./user";
import { loaderReducer } from "./loader";

export const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
