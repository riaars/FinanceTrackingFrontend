import React, { useState } from "react";
import { API_URL } from "../config/API";
import Button from "../components/Button";

type AddTransactionType = {
  category: string;
  type: string;
  detail: string;
  amount: Number;
};

function AddTransaction() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    category: "",
    type: "",
    detail: "",
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
  return (
    <form
      action="submit"
      className="container add-transaction__form"
      onSubmit={handleSubmit}
    >
      <div className="add-transaction__form__field">
        <input
          type="text"
          name="type"
          placeholder="type"
          value={form.type}
          onChange={handleChange}
        />
      </div>
      <div className="add-transaction__form__field">
        <input
          type="text"
          name="category"
          placeholder="category"
          value={form.category}
          onChange={handleChange}
        />
      </div>

      <div className="add-transaction__form__field">
        <input
          type="text"
          name="detail"
          placeholder="detail"
          value={form.detail}
          onChange={handleChange}
        />
      </div>
      <div className="add-transaction__form__field">
        <input
          type="text"
          name="amount"
          placeholder="amount"
          value={form.amount}
          onChange={handleChange}
        />
      </div>
      <div className="add-transaction__form__field">
        <Button
          title="Add Transaction"
          className="action-button"
          disabled={!isFormValid()}
        />
      </div>
    </form>
  );
}

export default AddTransaction;
