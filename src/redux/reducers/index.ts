import { combineReducers } from "@reduxjs/toolkit";
import transactionReducer from "./transactionReducer";
import store from "../store";
import authReducer from "./authReducer";

const reducers = combineReducers({
  transaction: transactionReducer,
  auth: authReducer,
});

export default reducers;

export type State = ReturnType<typeof store.getState>;
