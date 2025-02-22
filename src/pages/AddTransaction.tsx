import React, { useState } from "react";
import { API_URL } from "../config/API";

type AddTransactionType = {
  category: string;
  type: string;
  detail: string;
  amount: Number;
};

function AddTransaction() {
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I4YzVmYjk5NzViMmU1MGZjYTY1OGQiLCJpYXQiOjE3NDAyMzIyMjksImV4cCI6MTc0MDMxODYyOX0.sbVeiUQ4hqJFL25dLUUwzDCw1GhO4RqmqbqaxdnZOGc`,
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
        <button
          className="add-transaction__form__button"
          disabled={!isFormValid()}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default AddTransaction;
