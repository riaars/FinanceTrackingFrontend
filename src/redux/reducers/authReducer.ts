import { ActionTypes } from "../actions/action-types";

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

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
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
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("username", action.payload.username);
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
    case ActionTypes.SIGNOUT_REQUEST: {
      return {
        ...state,
        signOutRequest: action.payload,
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
      };
    }

    case ActionTypes.SIGNOUT_ERROR: {
      return {
        ...state,
        signOutError: action.payload,
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
