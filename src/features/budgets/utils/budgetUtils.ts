import { Transaction } from "@/features/transaction/api/type";

export const getCurrentMonthBudgetPerCategory = (
  category_label: string,
  transactions: Transaction[]
) => {
  // check total current month
  const totalMonth = transactions.filter();
  // filter based on the type
};
