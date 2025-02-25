import { ActionTypes } from ".";

interface LoginRequestAction {
  type: ActionTypes.LOGIN_REQUEST;
}

interface LoginResponseAction {
  type: ActionTypes.LOGIN_RESULT;
  payload: Object;
}
interface LoginErrorAction {
  type: ActionTypes.LOGIN_ERROR;
  payload: Object;
}

interface SignupRequestAction {
  type: ActionTypes.SIGNUP_REQUEST;
}

interface SignupResponseAction {
  type: ActionTypes.SIGNUP_RESULT;
  payload: Object;
}
interface SignupErrorAction {
  type: ActionTypes.SIGNUP_ERROR;
  payload: Object;
}

export type Action =
  | LoginRequestAction
  | LoginResponseAction
  | LoginErrorAction
  | SignupRequestAction
  | SignupResponseAction
  | SignupErrorAction;
