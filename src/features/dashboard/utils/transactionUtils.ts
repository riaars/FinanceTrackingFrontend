import { Budget } from "@/features/budgets/api/type";
import { Transaction } from "@/features/transaction/api/type";
import dayjs from "dayjs";

export const groupTransactionByKey = (data: Transaction[], key: string) => {
  return data.reduce((acc, transaction) => {
    const value = transaction[key];
    if (!acc[value]) acc[value] = 0;
    acc[value] += transaction.amount;
    return acc;
  }, {});
};

export const filterTransactionsByView = (
  data: Transaction[],
  viewType: string
) => {
  const now = dayjs();
  return data.filter((item) => {
    const date = dayjs(item.date);
    if (viewType === "day") return date.isSame(now, "day");
    if (viewType === "week") return date.isSame(now, "week");
    if (viewType === "month") return date.isSame(now, "month");
    if (viewType === "year") return date.isSame(now, "year");
    return true;
  });
};

export const getCurrentMonthTransactionsCategory = (
  current_month_transactions: Transaction[],
  category: string
) => {
  return current_month_transactions
    .filter((transaction) => transaction.category === category)
    .reduce((sum, t: Transaction) => sum + t.amount, 0);
};

export const getBudgetByCategory = (budget: Budget, category: string) => {
  return budget?.budget_per_categories[category];
};

export const groupIncomeVsExpense = (transactions: Transaction[]) => {
  const grouped = transactions.reduce<
    Record<string, { date: string; Income: number; Expense: number }>
  >((acc, { date, type, amount }) => {
    const key = dayjs(date).format("YYYY-MM-DD");
    const entry = acc[key] ?? { date: key, Income: 0, Expense: 0 };
    entry[type] += amount;
    acc[key] = entry;
    return acc;
  }, {});
  return Object.values(grouped);
};

export const formatCurrencyShort = (num: number): string => {
  if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
};

export const formattedCategory = (category: string) => {
  return category.replace(/&/g, "and").replace(/\s+/g, "-").toLowerCase();
};
