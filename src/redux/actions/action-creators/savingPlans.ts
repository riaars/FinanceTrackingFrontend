import { Dispatch } from "@reduxjs/toolkit";
import { ActionTypes } from "../action-types";
import { API_URL } from "../../../config/API";
import { Action } from "../action-types/savingAction";

export type SavingPlan = {
  saving_name: string;
  saving_target: string;
};
export const addSavingPlan =
  (request: SavingPlan) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ADD_NEW_SAVING_PLAN_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/addSavingPlan`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        dispatch({
          type: ActionTypes.ADD_NEW_SAVING_PLAN_RESULT,
          payload: data,
        });
      }
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.ADD_NEW_SAVING_PLAN_ERROR,
        payload: error,
      });
    }
  };
