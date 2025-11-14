import { baseApi } from "@/services/baseApi";
import { Budget } from "./type";

export const budgetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addMonthlyBudget: build.mutation<void, { budget_per_category: Budget }>({
      query: (body) => ({
        url: "/addMonthlyBudget",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Budget" }],
    }),

    getMonthlyBudget: build.query<
      { code: string; message: string; data: Budget },
      void
    >({
      query: () => ({ url: "/getMonthlyBudget" }),
      providesTags: [{ type: "Budget" }],
    }),
  }),
});

export const { useAddMonthlyBudgetMutation, useGetMonthlyBudgetQuery } =
  budgetApi;
