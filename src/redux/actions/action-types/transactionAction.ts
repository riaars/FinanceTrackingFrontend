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

interface DeleteTransactionRequestAction {
  type: ActionTypes.DELETE_TRANSACTION_REQUEST;
}

interface DeleteTransactionResponseAction {
  type: ActionTypes.DELETE_TRANSACTION_RESULT;
  payload: Object;
  transaction_id: string;
}
interface DeleteTransactionErrorAction {
  type: ActionTypes.DELETE_TRANSACTION_ERROR;
  payload: Object;
}

interface GetAllTransactionsRequestAction {
  type: ActionTypes.GET_ALL_TRANSACTIONS_REQUEST;
}

interface GetAllTransactionsResponseAction {
  type: ActionTypes.GET_ALL_TRANSACTIONS_RESULT;
  payload: Object;
}
interface GetAllTransactionsErrorAction {
  type: ActionTypes.GET_ALL_TRANSACTIONS_ERROR;
  payload: Object;
}

export type Action =
  | AddTransactionRequestAction
  | AddTransactionResponseAction
  | AddTransactionErrorAction
  | DeleteTransactionRequestAction
  | DeleteTransactionResponseAction
  | DeleteTransactionErrorAction
  | GetAllTransactionsRequestAction
  | GetAllTransactionsResponseAction
  | GetAllTransactionsErrorAction;
