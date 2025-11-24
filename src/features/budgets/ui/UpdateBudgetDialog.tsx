import Dialog from "@/components/Dialog";
import React, { useEffect, useState } from "react";
import { useAddMonthlyBudgetMutation } from "../api";
import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";

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
  const [addMonthlyBudget, { isLoading, isSuccess }] =
    useAddMonthlyBudgetMutation();

  const [budget, setBudget] = useState({
    category_label: category_label,
    category_type: category_type,
    category_budget: category_budget,
  });

  const [selectedQuickBtn, setSelectedQuickBtn] = useState("");

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

  const updateBudgetPercentage = (percentage: number) => {
    const newBudget = Math.round(
      (budget.category_budget * (100 + percentage)) / 100
    );
    setBudget({ ...budget, ["category_budget"]: newBudget });
  };

  const resetEditedBudget = () => {
    setBudget({ ...budget, ["category_budget"]: category_budget });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toggleDialog();
    }
  }, [isLoading, isSuccess, toggleDialog]);

  return (
    <Dialog
      title={`Quick edit: ${category_label}`}
      handleCloseDialog={toggleDialog}
    >
      <div className="dialog__content">
        <div className="dialog__content__body">
          <CurrencyInput
            name={"category_budget"}
            placeholder={`Budget ${category_label}`}
            value={budget.category_budget || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <div>
            <Button
              title="5%"
              className={`${
                selectedQuickBtn === "plusFivePercent"
                  ? "primary-button"
                  : "secondary-button"
              } medium`}
              onClick={() => {
                updateBudgetPercentage(5);
                setSelectedQuickBtn("plusFivePercent");
              }}
            ></Button>
            <Button
              title="-5%"
              className={`${
                selectedQuickBtn === "minusFivePercent"
                  ? "primary-button"
                  : "secondary-button"
              } medium`}
              onClick={() => {
                updateBudgetPercentage(-5);
                setSelectedQuickBtn("minusFivePercent");
              }}
            ></Button>
            <Button
              title="Reset"
              className={`${
                selectedQuickBtn === "resetPercent"
                  ? "primary-button"
                  : "secondary-button"
              } medium`}
              onClick={() => {
                resetEditedBudget();
                setSelectedQuickBtn("resetPercent");
              }}
            ></Button>
          </div>
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
          Save Budget
        </button>
      </div>
    </Dialog>
  );
};

export default UpdateBudgetDialog;
