import { combineReducers } from "@reduxjs/toolkit";
import transactionReducer from "./transactionReducer";
import store from "../store";

const reducers = combineReducers({
  transaction: transactionReducer,
});

export default reducers;

export type State = ReturnType<typeof store.getState>;
