import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { transactionCreators } from "../redux";
import { CategoryOptions, TypeOptions } from "../utils/Constant";

function AddTransaction() {
  const dispatch = useDispatch();
  const { addTransaction } = bindActionCreators(transactionCreators, dispatch);

  const [form, setForm] = useState({
    category: "Select transaction category",
    type: "Select transaction type",
    detail: "",
    amount: 0,
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        addTransaction(form);
      } catch (error) {
        console.log("Something wrong");
      }
    }
  };

  const isFormValid = () => {
    return form.type === "Select transaction type" ||
      form.category === "Select transaction category" ||
      form.detail === "" ||
      form.amount === 0
      ? false
      : true;
  };

  return (
    <div>
      <h1>Add Transaction</h1>
      <form
        action="submit"
        className="container add-transaction__form"
        onSubmit={(e) => handleSubmit(e)}
      >
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
          disabled={!isFormValid()}
        />
      </form>
    </div>
  );
}

export default AddTransaction;
