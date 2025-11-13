import Dialog from "@/components/Dialog";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { useAddMonthlyBudgetMutation } from "../api";
import { Budget } from "../api/type";

type UpdateBudgetDialogProps = {
  toggleDialog: () => void;
  category_budget: number;
  category_type: string;
  category_label: string;
};

const UpdateBudgetDialog = ({
  toggleDialog,
  category_budget,
  category_type,
  category_label,
}: UpdateBudgetDialogProps) => {
  const [addMonthlyBudget, { isLoading, isSuccess, isError }] =
    useAddMonthlyBudgetMutation();

  const [budget, setBudget] = useState({
    category_label: category_label,
    category_type: category_type,
    category_budget: category_budget,
  });

  const handleChange = (name: string, value: string) => {
    setBudget({ ...budget, [name]: value });
  };

  const budgetPerCategories = () => {
    return {
      budget_per_categories: {
        [budget.category_type]: budget.category_budget,
      },
    };
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toggleDialog();
    }
  }, [isLoading, isSuccess, toggleDialog]);

  return (
    <Dialog title="Update Budget Dialog" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__body">
          <Input
            placeholder={`${category_label}`}
            value={budget.category_label || ""}
            type="string"
            name={"category_label"}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            isDisabled
          />

          <Input
            type="number"
            name={"category_budget"}
            placeholder={`Budget ${category_label}`}
            value={budget.category_budget || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={() => {
            if (budget) {
              addMonthlyBudget(budgetPerCategories());
            }
          }}
        >
          Update Budget
        </button>
      </div>
    </Dialog>
  );
};

export default UpdateBudgetDialog;
