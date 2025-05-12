import { Action, Dispatch } from "@reduxjs/toolkit";
import { API_URL } from "../../../config/API";
import { ActionTypes } from "../action-types";

export type BudgetType = {
  monthly_budget: number;
  monthly_budget_per_categories: {
    food_dining: number;
    transportation: number;
    housing: number;
    entertainment: number;
    bills_utilities: number;
    health_fitness: number;
    shopping: number;
    education: number;
    personal_care: number;
    insurance: number;
    miscellaneous: number;
  };
};
export const addMonthlyBudget =
  (request: BudgetType) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ADD_MONTHLY_BUDGET_REQUEST,
    });
    try {
      const response = await fetch(`${API_URL}/addMonthlyBudget`, {
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
          type: ActionTypes.ADD_MONTHLY_BUDGET_RESULT,
          payload: data,
        });
      }
    } catch (error) {
      console.error("error");
      dispatch({
        type: ActionTypes.ADD_MONTHLY_BUDGET_ERROR,
        payload: error,
      });
    }
  };
