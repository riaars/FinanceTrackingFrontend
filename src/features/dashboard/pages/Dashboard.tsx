import { useGetAllTransactionsQuery } from "@/features/transaction/api";
import React from "react";
import CashFlowChart from "../ui/CashFlowChart";
import CategoryCart from "../ui/CategoryCart";
import { Link } from "react-router-dom";
import * as PATH from "@/config/Path";
import DashboardOverview from "../ui/DashboardOverview";
import LatestTransaction from "../ui/LatestTransaction";

const Dashboard = () => {
  const { data: transactionsData } = useGetAllTransactionsQuery();
  const transactions = transactionsData?.data || [];

  const sortedTransactions = transactions.slice().reverse();

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
            <div className="chart__title">Latest Transaction</div>
            <Link to={PATH.TRANSACTIONS} className="link">
              View All
            </Link>
          </div>
          <LatestTransaction transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
