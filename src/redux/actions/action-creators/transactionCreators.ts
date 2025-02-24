import { Action, Dispatch } from "@reduxjs/toolkit";
import { API_URL } from "../../../config/API";
import { ActionTypes } from "../action-types";

const token = localStorage.getItem("token");

export const addTransaction =
  (request: Object) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ADD_TRANSACTION_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/addTransaction`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.ADD_TRANSACTION_REQUEST,
          payload: data,
        });
      }
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.ADD_TRANSACTION_ERROR,
        payload: error,
      });
    }
  };
