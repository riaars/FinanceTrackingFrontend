import Transactions from "../../pages/Transactions";
import { ActionTypes } from "../actions/action-types";

const initialState = {
  addTransactionRequest: false,
  addTransactionResult: null,
  addTransactionError: null,
  getAllTransactionsRequest: false,
  transactions: [{} as any],
  getAllTransactionsError: null,
  deleteTransactionRequest: false,
  deleteTransactionResult: [],
  deleteTransactionError: null,
};

const transactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_TRANSACTION_REQUEST: {
      return {
        ...state,
        addTransactionRequest: true,
      };
    }
    case ActionTypes.ADD_TRANSACTION_RESULT: {
      return {
        ...state,
        addTransactionResult: action.payload,
      };
    }
    case ActionTypes.ADD_TRANSACTION_ERROR: {
      return {
        ...state,
        addTransactionError: action.payload,
      };
    }

    case ActionTypes.GET_ALL_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        getAllTransactionsRequest: true,
      };
    }
    case ActionTypes.GET_ALL_TRANSACTIONS_RESULT: {
      return {
        ...state,
        transactions: action.payload,
      };
    }
    case ActionTypes.GET_ALL_TRANSACTIONS_ERROR: {
      return {
        ...state,
        getAllTransactionsError: action.payload,
      };
    }
    case ActionTypes.DELETE_TRANSACTION_REQUEST: {
      return {
        ...state,
        deleteTransactionRequest: true,
      };
    }
    case ActionTypes.DELETE_TRANSACTION_RESULT: {
      return {
        ...state,
        deleteTransactionResult: action.payload,
        transactions: state.transactions.filter(
          (transaction) => transaction.transaction_id !== action.transaction_id
        ),
      };
    }
    case ActionTypes.DELETE_TRANSACTION_ERROR: {
      return {
        ...state,
        deleteTransactionError: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transactionReducer;
