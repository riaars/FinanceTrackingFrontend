import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/action-types/savingAction";

const initialState = {
  addNewSavingPlanRequest: false,
  addNewSavingPlanResult: null,
  addNewSavingPlanError: null,
  getUserSavingPlansRequest: false,
  getUserSavingPlansResult: [],
  getUserSavingPlansError: null,
};

const savingReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_SAVING_PLAN_REQUEST: {
      return {
        ...state,
        addNewSavingPlanRequest: true,
      };
    }
    case ActionTypes.ADD_NEW_SAVING_PLAN_RESULT: {
      return {
        ...state,
        addNewSavingPlanRequest: false,
        addNewSavingPlanResult: action.payload,
      };
    }
    case ActionTypes.ADD_NEW_SAVING_PLAN_ERROR: {
      return {
        ...state,
        addNewSavingPlanRequest: false,
        addNewSavingPlanError: action.payload,
      };
    }

    case ActionTypes.GET_USER_SAVING_PLANS_REQUEST: {
      return {
        ...state,
        getUserSavingPlansRequest: false,
        getUserSavingPlansResult: [],
        getUserSavingPlansError: null,
      };
    }

    case ActionTypes.GET_USER_SAVING_PLANS_RESULT: {
      return {
        ...state,
        getUserSavingPlansRequest: true,
        getUserSavingPlansResult: action.payload,
        getUserSavingPlansError: null,
      };
    }
    case ActionTypes.GET_USER_SAVING_PLANS_ERROR: {
      return {
        ...state,
        getUserSavingPlansRequest: true,
        getUserSavingPlansResult: [],
        getUserSavingPlansError: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default savingReducer;
