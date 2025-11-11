import { Transaction } from "@/features/transaction/api/type";
import { baseApi } from "@/services/baseApi";

export const recurringApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveRecurrings: build.query<
      { code: string; data: Transaction[] },
      void
    >({
      query: () => "/getActiveRecurrings",
      providesTags: (result) => {
        const listTag = [{ type: "Transaction" as const, id: "LIST" }];
        if (!result || !result.data) return listTag;
        return [
          ...listTag,
          ...result.data.map(({ transaction_id }) => ({
            type: "Transaction" as const,
            id: transaction_id,
          })),
        ];
      },
    }),

    updateRecurring: build.mutation<Transaction, Transaction>({
      query: (body) => ({
        url: "/updateRecurring",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (_res, _err, { transaction_id }) => [
        { type: "Transaction", id: transaction_id },
      ],
    }),

    deleteRecurring: build.mutation<
      { code: string; data: Transaction },
      { transaction_id: string }
    >({
      query: ({ transaction_id }) => ({
        url: "/deleteRecurring",
        method: "DELETE",
        body: { transaction_id },
      }),
      invalidatesTags: (result, error, { transaction_id }) => [
        { type: "Transaction", id: transaction_id },
        { type: "Transaction", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetActiveRecurringsQuery,
  useDeleteRecurringMutation,
  useUpdateRecurringMutation,
} = recurringApi;
