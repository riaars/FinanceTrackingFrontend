import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/action-types/budgetAction";

const initialState = {
  addNewSavingPlanRequest: false,
  addNewSavingPlanResult: null,
  addNewSavingPlanError: null,
};

const savingReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_MONTHLY_BUDGET_REQUEST: {
      return {
        ...state,
        addNewSavingPlanRequest: true,
      };
    }
    case ActionTypes.ADD_MONTHLY_BUDGET_RESULT: {
      return {
        ...state,
        addNewSavingPlanRequest: false,
        addNewSavingPlanResult: action.payload,
      };
    }
    case ActionTypes.ADD_MONTHLY_BUDGET_ERROR: {
      return {
        ...state,
        addNewSavingPlanRequest: false,
        addNewSavingPlanError: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default savingReducer;
