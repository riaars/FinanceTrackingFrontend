import Content from "@/layout/Content";
import React, { useState } from "react";
import ManageBudgetList from "../ui/ManageBudgetList";
import ManageBudgetCard from "../ui/ManageBudgetCard";
import { useGetMonthlyBudgetQuery } from "../api";
import { useGetAllTransactionsQuery } from "@/features/transaction/api";
import { filterTransactionsByView } from "@/features/dashboard/utils/transactionUtils";
import SearchBar from "@/components/SearchBar";
import useDebounce from "@/hooks/useDebounce";
import { CategoryExpenseObject } from "@/utils/Constant";
import BudgetMenu from "../ui/BudgetMenu";

const Budgets = () => {
  const [isManageBudget, setManageBudget] = useState(false);

  const { data: budget_data } = useGetMonthlyBudgetQuery();
  const { data: transactionsData } = useGetAllTransactionsQuery();

  const transactions = transactionsData?.data || [];

  const current_month_transactions = filterTransactionsByView(
    transactions,
    "month"
  );
  console.log(current_month_transactions);

  const budget = budget_data?.data;

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const filteredCategory = () => {
    const term = debounceSearch.toLowerCase();

    return CategoryExpenseObject.filter((expense_item) => {
      const matchQuery = term
        ? expense_item.label.toLowerCase().includes(term) ||
          expense_item.type.toLowerCase().includes(term)
        : true;
      return matchQuery;
    });
  };

  console.log(filteredCategory());

  return (
    <Content title="Budgets">
      <BudgetMenu
        isManageBudget={isManageBudget}
        setManageBudget={setManageBudget}
      />

      <SearchBar
        placeholder="Search for Budgets Category, e.g,: food, entertainment"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name="search"
      />

      {isManageBudget ? (
        <ManageBudgetList
          data={filteredCategory()}
          current_month_transactions={current_month_transactions}
          budget={budget}
        />
      ) : (
        <ManageBudgetCard
          data={filteredCategory()}
          current_month_transactions={current_month_transactions}
          budget={budget}
        />
      )}
    </Content>
  );
};

export default Budgets;
