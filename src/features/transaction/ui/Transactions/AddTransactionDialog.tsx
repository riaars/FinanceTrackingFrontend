import React, { useState } from "react";
import { TypeOptions } from "@/utils/Constant";
import { formattedDate } from "@/utils/helpers";
import Dialog from "@/components/Dialog";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputDate from "@/components/Date";
import CategoryGrid from "./CategoryGrid";
import { useAddTransactionMutation } from "../../api";
import { NewTransaction } from "../../api/type";

type TransactionErrorsFormType = {
  date: string;
  category: string;
  type: string;
  detail: string;
  amount: string;
};

type AddTransactionDialogProps = {
  toggleDialog: () => void;
};

function AddTransactionDialog({ toggleDialog }: AddTransactionDialogProps) {
  const [addTransaction] = useAddTransactionMutation();

  let date = new Date(Date.now());

  const [form, setForm] = useState<NewTransaction>({
    date: date.toISOString().split("T")[0],
    category: "Select Category",
    type: "Select Type",
    detail: "",
    amount: 0,
  });

  const [formErrors, setFormErrors] = useState<TransactionErrorsFormType>({
    date: "",
    category: "",
    type: "",
    detail: "",
    amount: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);
  const [, setTransactionSubmit] = useState(false);

  const handleTransactionChange = (name: string, value: string) => {
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
    if (form.type === "Select Type") {
      newErrors.type = "Type is required";
    }
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
    <Dialog title="Add New Transaction" handleCloseDialog={toggleDialog}>
      <div className="add-transaction__dialog">
        <div
          className="add-transaction__form"
          style={{
            display: !isFormValid && openUserInputDialog ? "none" : "block",
          }}
        >
          <div className="dialog__content__body">
            {/* <input
              type="file"
              name="receipt"
              placeholder="Upload Receipt"
              accept="image/*"
              onChange={handleUploadReceipt}
              className="input-field"
            /> */}

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
            <Dropdown
              options={TypeOptions}
              name="type"
              value={form.type}
              onChange={handleTransactionChange}
            />

            {form.type !== "Select Type" && (
              <CategoryGrid
                type={form.type}
                setSelectedCategory={handleTransactionChange}
                selectedCategory={form.category}
              />
            )}

            {/* <Dropdown
              options={CategoryOptions}
              name="category"
              value={form.category}
              onChange={handleTransactionChange}
            /> */}

            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
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
