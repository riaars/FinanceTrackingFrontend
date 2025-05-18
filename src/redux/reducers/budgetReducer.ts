import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/action-types/budgetAction";

const initialState = {
  addMonthlyBudgetRequest: false,
  addMonthlyBudgetResult: null,
  addMonthlyBudgetError: null,
  getUserMonthlyBudgetRequest: false,
  getUserMonthlyBudgetResult: null,
  getUserMonthlyBudgetError: null,
};

const budgetReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_MONTHLY_BUDGET_REQUEST: {
      return {
        ...state,
        addMonthlyBudgetRequest: true,
      };
    }
    case ActionTypes.ADD_MONTHLY_BUDGET_RESULT: {
      return {
        ...state,
        addMonthlyBudgetRequest: false,
        addMonthlyBudgetResult: action.payload,
      };
    }
    case ActionTypes.ADD_MONTHLY_BUDGET_ERROR: {
      return {
        ...state,
        addMonthlyBudgetRequest: false,
        addMonthlyBudgetError: action.payload,
      };
    }

    case ActionTypes.GET_USER_MONTHLY_BUDGET_REQUEST: {
      return {
        ...state,
        getUserMonthlyBudgetRequest: true,
      };
    }
    case ActionTypes.GET_USER_MONTHLY_BUDGET_RESULT: {
      return {
        ...state,
        getUserMonthlyBudgetRequest: false,
        getUserMonthlyBudgetResult: action.payload,
      };
    }
    case ActionTypes.GET_USER_MONTHLY_BUDGET_ERROR: {
      return {
        ...state,
        getUserMonthlyBudgetRequest: false,
        getUserMonthlyBudgetError: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default budgetReducer;
