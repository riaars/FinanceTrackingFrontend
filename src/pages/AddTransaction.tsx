import React, { useState } from "react";
import { API_URL } from "../config/API";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";

type AddTransactionType = {
  category: string;
  type: string;
  detail: string;
  amount: Number;
};

function AddTransaction() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    category: "Select a category",
    type: "",
    detail: "",
    amount: 0,
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        await addTransaction(form);
      } catch (error) {
        console.log("something wrong");
      }
    }
  };

  const isFormValid = () => {
    return true;
  };

  const addTransaction = async (form: AddTransactionType) => {
    const url = `${API_URL}/addTransaction`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.set("token", data);
    } catch (error) {
      console.error("error");
    }
  };

  const CategoryOptions = [
    "Food",
    "Transport",
    "Rent",
    "Entertainment",
    "Salary",
    "Others",
  ];

  return (
    <div>
      <h1>Add Transaction</h1>
      <form
        action="submit"
        className="container add-transaction__form"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          className="action-button"
          disabled={!isFormValid()}
        />
      </form>
    </div>
  );
}

export default AddTransaction;
