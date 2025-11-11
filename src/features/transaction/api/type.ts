export type Transaction = {
  transaction_id: string;
  amount: number;
  createdAt: Date | string;
  detail: string;
  category: string;
  email: string;
  type: "Income" | "Expense" | "Select Type";
  isRecurring: boolean;
  interval?: "daily" | "weekly" | "monthly" | "yearly";
  nextDate?: string;
  timezone?: string;
};

export type NewTransaction = {
  amount: number;
  date: string;
  detail: string;
  category: string;
  type: "Income" | "Expense" | "Select Type";
  isRecurring: boolean;
  interval?: "daily" | "weekly" | "monthly" | "yearly";
  nextDate?: string;
  timezone?: string;
};
