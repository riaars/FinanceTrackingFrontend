import { Action, Dispatch } from "@reduxjs/toolkit";
import { API_URL } from "../../../config/API";
import { ActionTypes } from "../action-types";

type LoginInputType = {
  email: string;
  password: string;
};

type SignupInputType = {
  email: string;
  password: string;
  repassword: string;
};

export const signIn =
  (form: LoginInputType) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/signIn`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Something went wrong";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.LOGIN_RESULT,
          payload: data,
        });
      }
    } catch (error: any) {
      console.error("error");
      dispatch({
        type: ActionTypes.LOGIN_ERROR,
        payload: error.message,
      });
    }
  };

export const signUp =
  (form: SignupInputType) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.SIGNUP_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/signUp`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Something went wrong";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.SIGNUP_RESULT,
          payload: data,
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: ActionTypes.SIGNUP_ERROR,
        payload: error.message,
      });
    }
  };

export const signOut = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.SIGNOUT_REQUEST,
  });

  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Something went wrong";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (data) {
      dispatch({
        type: ActionTypes.SIGNOUT_RESULT,
        payload: data,
      });

      localStorage.clear();
    }
  } catch (error: any) {
    console.error(error);
    dispatch({
      type: ActionTypes.SIGNOUT_ERROR,
      payload: error.message,
    });
  }
};
