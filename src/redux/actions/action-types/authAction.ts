import { ActionTypes } from ".";

interface LoginRequestAction {
  type: ActionTypes.LOGIN_REQUEST;
}

interface LoginResponseAction {
  type: ActionTypes.LOGIN_RESULT;
  payload: {
    token: string;
    email: string;
    username: string;
  };
}
interface LoginErrorAction {
  type: ActionTypes.LOGIN_ERROR;
  payload: {
    message: string;
  };
}

interface SignupRequestAction {
  type: ActionTypes.SIGNUP_REQUEST;
}

interface SignupResponseAction {
  type: ActionTypes.SIGNUP_RESULT;
  payload: {
    token: string;
    email: string;
    username: string;
  };
}
interface SignupErrorAction {
  type: ActionTypes.SIGNUP_ERROR;
  payload: {
    message: string;
  };
}

interface SignoutRequestAction {
  type: ActionTypes.SIGNOUT_REQUEST;
}
interface SignoutResponseAction {
  type: ActionTypes.SIGNOUT_RESULT;
  payload: Object;
}
interface SignoutErrorAction {
  type: ActionTypes.SIGNOUT_ERROR;
  payload: Object;
}

export type Action =
  | LoginRequestAction
  | LoginResponseAction
  | LoginErrorAction
  | SignupRequestAction
  | SignupResponseAction
  | SignupErrorAction
  | SignoutRequestAction
  | SignoutResponseAction
  | SignoutErrorAction;
