import { baseApi } from "@/services/baseApi";
import { NewTransaction, Transaction } from "./type";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTransaction: build.mutation<Transaction, NewTransaction>({
      query: (body) => ({
        url: "/addTransaction",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    updateTransaction: build.mutation<Transaction, Transaction>({
      query: (body) => ({
        url: "/updateTransaction",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (_res, _err, { transaction_id }) => [
        { type: "Transaction", id: transaction_id },
      ],
    }),

    getAllTransactions: build.query<
      { code: string; data: Transaction[] },
      void
    >({
      query: () => "/getAllTransactions",
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

    deleteTransaction: build.mutation<void, string>({
      query: (transaction_id) => ({
        url: "/deleteTransaction",
        method: "DELETE",
        body: { transaction_id },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
} = transactionApi;
