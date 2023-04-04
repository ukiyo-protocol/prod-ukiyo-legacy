import { rootReducer } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const reduxStore = store;
export type RootStore = ReturnType<typeof rootReducer>;
