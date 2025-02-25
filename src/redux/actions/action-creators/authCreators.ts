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
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.LOGIN_RESULT,
          payload: data,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
      }
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.LOGIN_ERROR,
        payload: error,
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
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.SIGNUP_RESULT,
          payload: data,
        });
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.SIGNUP_ERROR,
        payload: error,
      });
    }
  };
