import { combineReducers } from "@reduxjs/toolkit";
import transactionReducer from "./transactionReducer";
import store from "../store";
import authReducer from "./authReducer";
import budgetReducer from "./budgetReducer";

const reducers = combineReducers({
  transaction: transactionReducer,
  auth: authReducer,
  budget: budgetReducer,
});

export default reducers;

export type State = ReturnType<typeof store.getState>;
