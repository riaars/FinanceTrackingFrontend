import React, { useState } from "react";
import { formattedDate } from "@/utils/helpers";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import InputDate from "@/components/Date";
import CategoryGrid from "./CategoryGrid";
import { useAddTransactionMutation } from "../../api";
import { Transaction } from "../../api/type";
import CurrencyInput from "@/components/CurrencyInput";
const options = ["daily", "weekly", "monthly", "yearly"];

type TransactionErrorsFormType = {
  date: string;
  category: string;
  type: string;
  detail: string;
  amount: string;
};

type AddTransactionDialogProps = {
  toggleDialog: () => void;
  type: "Income" | "Expense";
};

function AddTransactionDialog({
  toggleDialog,
  type,
}: AddTransactionDialogProps) {
  const [addTransaction] = useAddTransactionMutation();
  // const [selectedInterval, setSelectedInterval] = useState("monthly");

  let date = new Date(Date.now());

  const [form, setForm] = useState<
    Omit<Transaction, "transaction_id" | "email" | "createdAt">
  >({
    date: date.toISOString().split("T")[0],
    category: "Select Category",
    type: type,
    detail: "",
    amount: 0,
    isRecurring: false,
    interval: "monthly",
    nextDate: "",
    timezone: "UTC",
  });

  const [formErrors, setFormErrors] = useState<TransactionErrorsFormType>({
    date: "",
    category: "",
    type: type,
    detail: "",
    amount: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);
  const [, setTransactionSubmit] = useState(false);

  const handleTransactionChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormTransactionValid()) {
      try {
        addTransaction(form);
        setTransactionSubmit(true);
        toggleDialog();
      } catch (error) {
        console.error("Error adding transaction:", error);
        console.log("Something went wrong");
      }
    } else {
      setOpenUserInputDialog(!openUserInputDialog);
    }
  };

  const isFormTransactionValid = () => {
    const newErrors: TransactionErrorsFormType =
      {} as TransactionErrorsFormType;

    if (form.category === "Select category") {
      newErrors.category = "Category is required";
    }

    if (form.detail === "") {
      newErrors.detail = "Detail is required";
    }

    if (form.amount === 0) {
      newErrors.amount = "Amount is required";
    }

    setFormErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <Dialog
      title={`Add Transaction:  ${type}`}
      handleCloseDialog={toggleDialog}
    >
      <div className="add-transaction__dialog">
        <div
          className="add-transaction__form"
          style={{
            display: !isFormValid && openUserInputDialog ? "none" : "block",
          }}
        >
          <div className="dialog__content__body">
            <InputDate
              name="date"
              value={form.date}
              placeholder="Date"
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
              min="1970-01-01"
              max={formattedDate(new Date(Date.now()).toISOString())}
            />

            <CategoryGrid
              type={type}
              setSelectedCategory={handleTransactionChange}
              selectedCategory={form.category}
            />

            <CurrencyInput
              name="amount"
              placeholder="Amount"
              value={form.amount > 0 ? form.amount : ""}
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
            />

            <textarea
              className="input-field"
              name="detail"
              rows={3}
              placeholder="Details"
              value={form.detail}
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
            />

            <span className="add-transaction__recurring-checkbox ">
              <input
                type="checkbox"
                name="isRecurring"
                checked={form.isRecurring}
                onChange={(e) =>
                  handleTransactionChange(e.target.name, e.target.checked)
                }
              />
              <label htmlFor="isRecurring" className="checkbox-label">
                Recurring transaction
              </label>
            </span>

            {form.isRecurring && (
              <div className="add-transaction__recurring-options">
                {options.map((option) => (
                  <button
                    key={option}
                    className={` ${
                      form.interval === option
                        ? "filter-button active"
                        : "filter-button"
                    }`}
                    onClick={() => handleTransactionChange("interval", option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="dialog__actions">
            <button className="secondary-button" onClick={toggleDialog}>
              Cancel
            </button>
            <Button
              title="Add Transaction"
              className="primary-button"
              onClick={(e) =>
                handleSubmit(e as React.FormEvent<HTMLFormElement>)
              }
            ></Button>
          </div>
        </div>

        {!isFormValid && openUserInputDialog && (
          <Dialog
            title="Incomplete Request"
            handleCloseDialog={() =>
              setOpenUserInputDialog(!openUserInputDialog)
            }
          >
            <div className="dialog__content">
              <p>
                Oops! We couldn’t submit your transaction because some required
                fields are missing:
              </p>
              <ul>
                {Object.entries(formErrors).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
              <p>
                Make sure all required fields are completed before submitting.
              </p>
            </div>
            <div className="dialog__actions">
              <button
                className="primary-button"
                onClick={() => setOpenUserInputDialog(!openUserInputDialog)}
              >
                OK
              </button>
            </div>
          </Dialog>
        )}
      </div>
    </Dialog>
  );
}

export default AddTransactionDialog;
