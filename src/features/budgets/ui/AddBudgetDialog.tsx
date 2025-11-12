import Dialog from "@/components/Dialog";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { Budget } from "../api/type";
import { useAddMonthlyBudgetMutation } from "../api";

type AddBudgetDialogProps = {
  toggleDialog: () => void;
};

const AddBudgetDialog = ({ toggleDialog }: AddBudgetDialogProps) => {
  const [addMonthlyBudget, { isLoading, isSuccess }] =
    useAddMonthlyBudgetMutation();

  const [budget, setBudget] = useState({
    food_dining: 0,
    transportation: 0,
    housing: 0,
    entertainment: 0,
    bills_utilities: 0,
    health_fitness: 0,
    shopping: 0,
    education: 0,
    personal_care: 0,
    insurance: 0,
    miscellaneous: 0,
  });

  const handleChange = (name: string, value: string) => {
    setBudget({ ...budget, [name]: value });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toggleDialog();
    }
  }, [isLoading, isSuccess, toggleDialog]);

  console.log(budget);
  console.log(Object.keys(budget));

  return (
    <Dialog title="Add Budget Dialog" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__body">
          {Object.keys(budget).map((key) => (
            <Input
              type="number"
              name={key}
              placeholder={key.replace("_", " ")}
              value={budget?.[key] || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          ))}
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
              addMonthlyBudget(budget);
              toggleDialog();
            }
          }}
        >
          Update Budget
        </button>
      </div>
    </Dialog>
  );
};

export default AddBudgetDialog;
