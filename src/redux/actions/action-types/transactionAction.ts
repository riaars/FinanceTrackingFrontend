import { ActionTypes } from ".";

interface AddTransactionRequestAction {
  type: ActionTypes.ADD_TRANSACTION_REQUEST;
}

interface AddTransactionResponseAction {
  type: ActionTypes.ADD_TRANSACTION_RESULT;
  payload: Object;
}
interface AddTransactionErrorAction {
  type: ActionTypes.ADD_TRANSACTION_ERROR;
  payload: Object;
}

export type Action =
  | AddTransactionRequestAction
  | AddTransactionResponseAction
  | AddTransactionErrorAction;
