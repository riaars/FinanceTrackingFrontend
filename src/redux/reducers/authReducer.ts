import { ActionTypes } from "../actions/action-types";

const initialState = {
  loginRequest: false,
  loginResponse: null,
  loginError: null,
  signupRequest: false,
  signupResponse: null,
  signupError: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case ActionTypes.LOGIN_RESULT: {
      return {
        ...state,
        loginResponse: action.payload,
      };
    }

    case ActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
      };
    }
    case ActionTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        signupRequest: true,
      };
    }
    case ActionTypes.SIGNUP_RESULT: {
      return {
        ...state,
        signupResponse: action.payload,
      };
    }

    case ActionTypes.SIGNUP_ERROR: {
      return {
        ...state,
        signupError: action.payload,
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
