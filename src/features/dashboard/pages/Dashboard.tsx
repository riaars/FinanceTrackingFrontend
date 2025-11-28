import { useGetAllTransactionsQuery } from "@/features/transaction/api";
import React from "react";
import CashFlowChart from "../ui/CashFlowChart";
import CategoryCart from "../ui/CategoryCart";
import DashboardOverview from "../ui/DashboardOverview";
import LatestTransaction from "../ui/LatestTransaction";
import UpcomingTransactionWidget from "../ui/UpcomingTransactionWidget";
import { useGetActiveRecurringsQuery } from "@/features/recurring/api";
import BudgetActualChart from "../ui/BudgetActualChart";
import {
  filterTransactionsByPeriod,
  getBudgetByCategory,
  getCurrentMonthTransactionsCategory,
} from "../utils/transactionUtils";
import { useGetMonthlyBudgetQuery } from "@/features/budgets/api";
import { CategoryExpenseObject } from "@/utils/Constant";
import Content from "@/layout/Content";

const Dashboard = () => {
  // Overview and Financial Insights Data
  const { data: transactionsData } = useGetAllTransactionsQuery();
  const transactions = transactionsData?.data || [];
  const sortedTransactions = transactions.slice().reverse();

  // Upcoming Transactions Widget Data
  const { data: recurringsData } = useGetActiveRecurringsQuery();
  const recurrings = recurringsData?.data || [];

  const sortedRecurrings = [...recurrings].sort((a, b) => {
    const aDate = a.nextDate ? new Date(a.nextDate) : null;
    const bDate = b.nextDate ? new Date(b.nextDate) : null;

    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;

    return aDate.getTime() - bDate.getTime();
  });

  const today = new Date();
  const upcomingTransactions = sortedRecurrings.filter((recurring) => {
    return new Date(recurring?.nextDate ?? new Date()) > today;
  });

  // Budget vs Spent Data
  const { data: budget_data } = useGetMonthlyBudgetQuery();
  const budgetData = budget_data?.data || {};

  const current_month_transactions = filterTransactionsByPeriod(
    transactions,
    "month"
  );

  const budgetActualSpent = CategoryExpenseObject.map((item) => {
    const category = item.label;
    const spent = getCurrentMonthTransactionsCategory(
      current_month_transactions,
      item.label
    );
    const budget = getBudgetByCategory(budgetData, item.type);

    return { category, budget, spent };
  });

  return (
    <Content>
      <DashboardOverview transactions={transactions} />

      <div className="dashboard__item">
        <CashFlowChart data={sortedTransactions} />
      </div>

      <div className="dashboard__wrapper">
        <div className="dashboard__item auto-fill">
          <CategoryCart data={sortedTransactions} />
        </div>

        <div className="dashboard__item auto-fill">
          <LatestTransaction transactions={transactions} />
        </div>
      </div>

      <div className="dashboard__wrapper">
        <div className="dashboard__item auto-fill">
          <UpcomingTransactionWidget transactions={upcomingTransactions} />
        </div>
        <div className="dashboard__item auto-fill">
          <BudgetActualChart data={budgetActualSpent} />
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;
