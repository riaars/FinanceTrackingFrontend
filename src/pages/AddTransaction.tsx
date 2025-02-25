import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { transactionCreators } from "../redux";
import { CategoryOptions, TypeOptions } from "../utils/Constant";
import Dialog from "../components/Dialog";

type TransactionErrorsFormType = {
  category: string;
  type: string;
  detail: string;
  amount: string;
};

function AddTransaction() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { addTransaction } = bindActionCreators(transactionCreators, dispatch);

  const [form, setForm] = useState({
    category: "Select transaction category",
    type: "Select transaction type",
    detail: "",
    amount: 0,
  });

  const [formErrors, setFormErrors] = useState<TransactionErrorsFormType>({
    category: "",
    type: "",
    detail: "",
    amount: "",
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormTransactionValid()) {
      try {
        if (token) {
          addTransaction(form, token);
        }
      } catch (error) {
        console.log("Something wrong");
      }
    } else {
      setOpenUserInputDialog(!openUserInputDialog);
    }
  };

  const isFormTransactionValid = () => {
    const newErrors: TransactionErrorsFormType =
      {} as TransactionErrorsFormType;
    if (form.type === "Select transaction type") {
      newErrors.type = "Transaction type is required";
    }
    if (form.category === "Select transaction category") {
      newErrors.category = "Category is required";
    }

    if (form.detail === "") {
      newErrors.detail = "Detail of transaction is required";
    }

    if (form.amount === 0) {
      newErrors.amount = "Amount of transaction is required";
    }

    setFormErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <h1>Add Transaction</h1>
      <div className="container add-transaction__form">
        <Dropdown
          options={TypeOptions}
          name="type"
          value={form.type}
          onChange={handleChange}
        />

        <Dropdown
          options={CategoryOptions}
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <Input
          type="text"
          name="detail"
          placeholder="Detail"
          value={form.detail}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          type="text"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <Button
          title="Add Transaction"
          className="primary-button"
          onClick={(e) => handleSubmit(e)}
        />
      </div>

      {!isFormValid && openUserInputDialog && (
        <Dialog
          title="Incomplete Request"
          handleCloseDialog={() => setOpenUserInputDialog(!openUserInputDialog)}
        >
          <div className="dialog__content">
            <p>
              Oops! We couldn’t submit your transaction because some required
              fields are missing. Please fill in the following:
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
  );
}

export default AddTransaction;
