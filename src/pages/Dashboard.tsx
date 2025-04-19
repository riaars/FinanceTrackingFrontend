import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Content from "../layout/Content";
import { useDispatch, useSelector } from "react-redux";
import { State, transactionCreators } from "../redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryCart from "../components/CategoryCart";
import BudgetActualChart from "../components/BudgetActualChart";
import CashFlowChart from "../components/CashFlowChart";
import Button from "../components/Button";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { getAllTransactions } = bindActionCreators(
    transactionCreators,
    dispatch
  );
  const { transactions } = useSelector((state: State) => state.transaction);
  const { loginResponse } = useSelector((state: State) => state.auth);

  const [view, setView] = useState("month");

  const groupBy = (transactions, key) => {
    return transactions.reduce((acc, transaction) => {
      const value = transaction[key];
      if (!acc[value]) acc[value] = 0;
      acc[value] += transaction.amount;
      return acc;
    }, {});
  };

  const filterByView = (data, viewType) => {
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

  const filteredData = filterByView(transactions, view);

  const IncomeVsExpenseData = filteredData.reduce(
    (acc, { date, type, amount }) => {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      if (!acc[formattedDate])
        acc[formattedDate] = { date: formattedDate, Income: 0, Expense: 0 };
      acc[formattedDate][type] += amount;
      return acc;
    },
    {}
  );

  const IncomeVsExpenseList = Object.values(IncomeVsExpenseData);

  const IncomeThisPeriod = IncomeVsExpenseList.reduce(
    (acc, item) => acc + item.Income,
    0
  );

  const ExpenseThisPeriod = IncomeVsExpenseList.reduce(
    (acc, item) => acc + item.Expense,
    0
  );

  const categoryDataObj = groupBy(
    filterByView(transactions, view).filter((t) => t.type === "Expense"),
    "category"
  );
  const categoryData = Object.entries(categoryDataObj).map(([name, value]) => ({
    name,
    value,
  }));

  const mockBudgets = {
    Groceries: 300,
    Transport: 200,
    Dining: 250,
    Entertainment: 150,
  };

  const budgetVsActualData = Object.entries(mockBudgets).map(
    ([category, budget]) => {
      const actual = categoryDataObj[category] || 0;
      return { category, budget, actual };
    }
  );

  const cashFlowData = IncomeVsExpenseList.map((entry) => ({
    date: dayjs(entry.date).format("YYYY-MM-DD"),
    Income: entry.Income,
    Expense: entry.Expense,
    net: entry.Income - entry.Expense,
  }));

  useEffect(() => {
    if (token) {
      getAllTransactions();
    } else {
      navigate(PATH.LOGIN);
    }
  }, [token, loginResponse]);

  return (
    <Content title="Dashboard">
      <div>
        <div>
          {["day", "week", "month", "year"].map((v) => (
            <button
              key={v}
              className={` ${
                view === v ? "primary-button" : "secondary-button"
              }`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Income this {view}</p>
          </div>
          <p className="total-amount">SEK {IncomeThisPeriod}</p>
          <Button title="Income" className="tag-button small income" />
        </div>

        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Expense this {view}</p>
          </div>
          <p className="total-amount">SEK {ExpenseThisPeriod}</p>
          <Button title="Expense" className="tag-button small expense" />
        </div>
      </div>

      <IncomeExpenseChart data={IncomeVsExpenseList} />
      <CashFlowChart data={cashFlowData} />

      <BudgetActualChart data={budgetVsActualData} />
      <CategoryCart data={categoryData} />
    </Content>
  );
};

export default Dashboard;
