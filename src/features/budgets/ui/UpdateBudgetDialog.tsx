import Dialog from "@/components/Dialog";
import Input from "@/components/Input";
import React, { useState } from "react";

type UpdateBudgetDialogProps = {
  toggleDialog: () => void;
  category_budget: number;
  category_type: string;
  category_label: string;
};

const UpdateBudgetDialog = (props: UpdateBudgetDialogProps) => {
  const [budget, setBudget] = useState({
    category_label: props.category_label,
    category_type: props.category_type,
    category_budget: props.category_budget,
  });

  const handleChange = (name: string, value: string) => {
    setBudget({ ...budget, [name]: value });
  };

  return (
    <Dialog title="Update Budget Dialog" handleCloseDialog={props.toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__body">
          <Input
            placeholder={`${props.category_label}`}
            value={budget.category_label || ""}
            type="string"
            name={"category_label"}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            isDisabled
          />

          <Input
            type="number"
            name={"category_budget"}
            placeholder={`Budget ${props.category_label}`}
            value={budget.category_budget || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={props.toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          //   onClick={() => {
          //     if (budget) {
          //       addMonthlyBudget({ budget_per_categories: budget });
          //       toggleDialog();
          //     }
          //   }}
        >
          Update Budget
        </button>
      </div>
    </Dialog>
  );
};

export default UpdateBudgetDialog;
