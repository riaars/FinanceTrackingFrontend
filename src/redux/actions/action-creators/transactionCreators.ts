import { Action, Dispatch } from "@reduxjs/toolkit";
import { API_URL } from "../../../config/API";
import { ActionTypes } from "../action-types";

type AddTransactionType = {
  category: string;
  type: string;
  detail: string;
  amount: string;
};

export const addTransaction =
  (request: AddTransactionType) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ADD_TRANSACTION_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/addTransaction`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(request),
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
          type: ActionTypes.ADD_TRANSACTION_RESULT,
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

export const updateTransaction =
  (request: AddTransactionType) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.UPDATE_TRANSACTION_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/updateTransaction`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(request),
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
          type: ActionTypes.UPDATE_TRANSACTION_RESULT,
          payload: data,
        });
      }
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.UPDATE_TRANSACTION_ERROR,
        payload: error,
      });
    }
  };

export const getAllTransactions = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.GET_ALL_TRANSACTIONS_REQUEST,
  });
  try {
    const response = await fetch(`${API_URL}/getAllTransactions`, {
      method: "GET",
      credentials: "include",
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
        type: ActionTypes.GET_ALL_TRANSACTIONS_RESULT,
        payload: data,
      });
    }
  } catch (error: any) {
    console.error("error");
    dispatch({
      type: ActionTypes.GET_ALL_TRANSACTIONS_ERROR,
      payload: error.message,
    });
  }
};

export const deleteTransaction =
  (transaction_id: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.DELETE_TRANSACTION_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/deleteTransaction`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ transaction_id: transaction_id }),
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
          type: ActionTypes.DELETE_TRANSACTION_RESULT,
          payload: data,
          transaction_id: transaction_id,
        });
      }
    } catch (error: any) {
      console.error("error");
      dispatch({
        type: ActionTypes.DELETE_TRANSACTION_ERROR,
        payload: error.message,
      });
    }
  };
