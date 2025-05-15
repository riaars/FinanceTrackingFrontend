import { ActionTypes } from ".";

interface AddNewSavingPlanRequestAction {
  type: ActionTypes.ADD_NEW_SAVING_PLAN_REQUEST;
}

interface AddNewSavingPlanResultAction {
  type: ActionTypes.ADD_NEW_SAVING_PLAN_RESULT;
  payload: Object;
}

interface AddNewSavingPlanErrorAction {
  type: ActionTypes.ADD_NEW_SAVING_PLAN_ERROR;
  payload: any;
}

interface GetUserSavingPlansRequestAction {
  type: ActionTypes.GET_USER_SAVING_PLANS_REQUEST;
}

interface GetUserSavingPlansResultAction {
  type: ActionTypes.GET_USER_SAVING_PLANS_RESULT;
  payload: Object;
}

interface GetUserSavingPlansErrorAction {
  type: ActionTypes.GET_USER_SAVING_PLANS_ERROR;
  payload: any;
}

export type Action =
  | AddNewSavingPlanRequestAction
  | AddNewSavingPlanResultAction
  | AddNewSavingPlanErrorAction
  | GetUserSavingPlansRequestAction
  | GetUserSavingPlansResultAction
  | GetUserSavingPlansErrorAction;
