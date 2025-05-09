import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/action-types/authAction";

const initialState = {
  loginRequest: false,
  loginResponse: null,
  token: localStorage.getItem("token"),
  email: null,
  loginError: null,
  signupRequest: false,
  signupResponse: null,
  signupError: null,
  signOutRequest: false,
  signOutResponse: null,
  signOutError: null,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginResponse: null,
        loginError: null,
      };
    }
    case ActionTypes.LOGIN_RESULT: {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        loginResponse: action.payload,
        token: action.payload.token,
        email: action.payload.email,
        username: action.payload.username,
        loginRequest: false,
        loginError: null,
      };
    }

    case ActionTypes.LOGIN_ERROR: {
      return {
        ...state,

        loginRequest: false,
        loginResponse: null,
        loginError: action.payload,
      };
    }
    case ActionTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        signupRequest: true,
        signupResponse: null,
        signupError: null,
      };
    }
    case ActionTypes.SIGNUP_RESULT: {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        signupRequest: false,
        signupResponse: action.payload,
        signupError: null,
      };
    }

    case ActionTypes.SIGNUP_ERROR: {
      return {
        ...state,
        signupRequest: false,
        signupResponse: null,
        signupError: action.payload,
      };
    }
    case ActionTypes.SIGNOUT_REQUEST: {
      return {
        ...state,
        signOutRequest: true,
        loginResponse: null,
      };
    }
    case ActionTypes.SIGNOUT_RESULT: {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");

      return {
        ...state,
        loginResponse: null,
        signOutResponse: action.payload,
        signOutRequest: false,
      };
    }

    case ActionTypes.SIGNOUT_ERROR: {
      return {
        ...state,
        signOutError: action.payload,
        signOutRequest: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
