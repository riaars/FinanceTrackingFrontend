import Button from "@/components/Button";
import Content from "@/layout/Content";
import React, { useState } from "react";
import AddBudgetDialog from "../ui/AddBudgetDialog";
import BudgetCard from "../ui/BudgetCard";
import { CategoryExpenseObject } from "@/utils/Constant";

const Budgets = () => {
  const [isAdded, setIsAdded] = useState(false);

  const toggleAddBudget = () => {
    setIsAdded(!isAdded);
  };

  return (
    <Content title="Budgets">
      <div>
        {/* <Button
          title=" + Update Monthly Budget"
          type="button"
          className="primary-button add-button-transaction"
          onClick={() => {
            setIsAdded(true);
          }}
        /> */}

        {/* {new Date(Date.now()).toISOString()} */}

        <div className="budgets__grid">
          {CategoryExpenseObject.map((expense_item) => (
            <BudgetCard
              category={expense_item.label}
              current_balance={200}
              total_budget={500}
            />
          ))}
        </div>
      </div>

      {isAdded && <AddBudgetDialog toggleDialog={toggleAddBudget} />}
    </Content>
  );
};

export default Budgets;
