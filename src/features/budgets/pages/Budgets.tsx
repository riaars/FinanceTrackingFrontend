import Button from "@/components/Button";
import Content from "@/layout/Content";
import React, { useState } from "react";
import AddBudgetDialog from "../ui/AddBudgetDialog";
import BudgetCard from "../ui/BudgetCard";
import { CategoryExpenseObject } from "@/utils/Constant";
import { useGetMonthlyBudgetQuery } from "../api";

const Budgets = () => {
  const [isAdded, setIsAdded] = useState(false);

  const {
    isLoading,
    isSuccess,
    data: budget_data,
  } = useGetMonthlyBudgetQuery();

  const budget = budget_data?.data;
  const toggleAddBudget = () => {
    setIsAdded(!isAdded);
  };

  const getCategoryBudget = (type: string) => {
    return budget?.budget_per_categories[type];
  };

  return (
    <Content title="Budgets">
      <div>
        <Button
          title=" + Update Monthly Budget"
          type="button"
          className="primary-button add-button-transaction"
          onClick={() => {
            setIsAdded(true);
          }}
        />

        {/* {new Date(Date.now()).toISOString()} */}

        <div className="budgets__grid">
          {CategoryExpenseObject.map((expense_item) => (
            <BudgetCard
              category_type={expense_item.type}
              category_label={expense_item.label}
              current_balance={200}
              category_budget={
                getCategoryBudget(expense_item.type) > 0
                  ? getCategoryBudget(expense_item.type)
                  : 200
              }
            />
          ))}
        </div>
      </div>

      {isAdded && <AddBudgetDialog toggleDialog={toggleAddBudget} />}
    </Content>
  );
};

export default Budgets;
