import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/action-types/budgetAction";

const initialState = {
  addMonthlyBudgetRequest: false,
  addMonthlyBudgetResult: null,
  addMonthlyBudgetError: null,
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
    default: {
      return { ...state };
    }
  }
};

export default budgetReducer;
