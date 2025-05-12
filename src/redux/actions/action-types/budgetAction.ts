import { ActionTypes } from ".";

interface AddMonthlyBudgetRequestAction {
  type: ActionTypes.ADD_MONTHLY_BUDGET_REQUEST;
}

interface AddMonthlyBudgetResultAction {
  type: ActionTypes.ADD_MONTHLY_BUDGET_RESULT;
  payload: Object;
}

interface AddMonthlyBudgetErrorAction {
  type: ActionTypes.ADD_MONTHLY_BUDGET_ERROR;
  payload: Object;
}

export type Action =
  | AddMonthlyBudgetRequestAction
  | AddMonthlyBudgetResultAction
  | AddMonthlyBudgetErrorAction;
