import { ActionTypes } from "../actions/action-types";

const initialState = {
  addTransactionRequest: false,
  addTransactionResult: [],
  addTransactionError: null,
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transactionReducer;
