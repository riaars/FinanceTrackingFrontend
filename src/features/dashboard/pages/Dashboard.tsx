import { useGetAllTransactionsQuery } from "@/features/transaction/api";
import React from "react";
import CashFlowChart from "../ui/CashFlowChart";
import CategoryCart from "../ui/CategoryCart";
import { Link } from "react-router-dom";
import * as PATH from "@/config/Path";
import DashboardOverview from "../ui/DashboardOverview";
import LatestTransaction from "../ui/LatestTransaction";
import UpcomingTransactionWidget from "../ui/UpcomingTransactionWidget";
import { useGetActiveRecurringsQuery } from "@/features/recurring/api";
import BulletChart from "../ui/BudgetActualChart";
import {
  filterTransactionsByView,
  getBudgetByCategory,
  getCurrentMonthTransactionsCategory,
} from "../utils/transactionUtils";
import { useGetMonthlyBudgetQuery } from "@/features/budgets/api";
import { CategoryExpenseObject } from "@/utils/Constant";

const Dashboard = () => {
  const { data: transactionsData } = useGetAllTransactionsQuery();
  const transactions = transactionsData?.data || [];
  const sortedTransactions = transactions.slice().reverse();

  const { data: recurringsData } = useGetActiveRecurringsQuery();
  const recurrings = recurringsData?.data || [];

  const sortedRecurrings = [...recurrings].sort(
    (a, b) => new Date(a.nextDate) - new Date(b.nextDate)
  );

  const today = new Date();
  const upcomingTransactions = sortedRecurrings.filter((recurring) => {
    return new Date(recurring?.nextDate) > today;
  });

  const { data: budget_data } = useGetMonthlyBudgetQuery();
  const budgetData = budget_data?.data;

  const current_month_transactions = filterTransactionsByView(
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
    <div>
      <div className="dashboard-summary">
        <DashboardOverview transactions={transactions} />
      </div>

      <div className="dashboard-summary__item">
        <div className="chart__title">Financial Insights</div>
        <CashFlowChart transactions={sortedTransactions} />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          className="dashboard-summary__item"
          style={{ flexGrow: 1, flexShrink: 1 }}
        >
          <div className="chart__title">Expense Overview</div>

          <CategoryCart transactions={sortedTransactions} />
        </div>

        <div
          className="dashboard-summary__item"
          style={{ flexGrow: 1, flexShrink: 1 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              margin: "1rem",
            }}
          >
            <div className="chart__title">Latest Transactions</div>
            <Link to={PATH.TRANSACTIONS} className="link">
              View All
            </Link>
          </div>
          <LatestTransaction transactions={transactions} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          className="dashboard-summary__item"
          style={{ flexGrow: 1, flexShrink: 1 }}
        >
          <div className="chart__title">Upcoming Transactions</div>
          <UpcomingTransactionWidget transactions={upcomingTransactions} />
        </div>
        <div
          className="dashboard-summary__item"
          style={{ flexGrow: 1, flexShrink: 1 }}
        >
          <div className="chart__title">Budget Insights</div>
          <BulletChart data={budgetActualSpent} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
