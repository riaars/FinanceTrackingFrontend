export type Transaction = {
  transaction_id: string;
  amount: number;
  date: string;
  detail: string;
  category: string;
  email: string;
  type: "Income" | "Expense" | "Select Type";
};

export type NewTransaction = {
  amount: number;
  date: string;
  detail: string;
  category: string;
  type: "Income" | "Expense" | "Select Type";
};
