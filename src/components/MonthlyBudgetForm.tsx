import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { budgetCreators } from "../redux";
import { BudgetType } from "../redux/actions/action-creators/budgetCreators";

const initForm = {
  monthly_budget: 0,
  monthly_budget_per_categories: {
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
  },
};
const MonthlyBudgetForm = () => {
  const [form, setForm] = useState<BudgetType>(initForm);

  const dispatch = useDispatch();
  const { addMonthlyBudget } = bindActionCreators(budgetCreators, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMonthlyBudget(form);
  };

  return (
    <div className="monthly-budget__container">
      <h3 className="">Monthly Budget</h3>
      <Input
        type="number"
        name="monthly_budget"
        placeholder="Monthly Budget"
        value={form.monthly_budget}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.food_dining"
        placeholder="Food Dining Budget"
        value={form.monthly_budget_per_categories.food_dining}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.transportation"
        placeholder="Transportation Budget"
        value={form.monthly_budget_per_categories.transportation}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="monthly_budget_per_categories.housing"
        placeholder="Housing Budget"
        value={form.monthly_budget_per_categories.housing}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.entertainment"
        placeholder="Entertainment Budget"
        value={form.monthly_budget_per_categories.entertainment}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.bills_utilities"
        placeholder="Bill & Utilities Budget"
        value={form.monthly_budget_per_categories.bills_utilities}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="monthly_budget_per_categories.health_fitness"
        placeholder="Health & Fitness Budget"
        value={form.monthly_budget_per_categories.health_fitness}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="monthly_budget_per_categories.shopping"
        placeholder="Shopping Budget"
        value={form.monthly_budget_per_categories.shopping}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.education"
        placeholder="Education Budget"
        value={form.monthly_budget_per_categories.education}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="monthly_budget_per_categories.personal_care"
        placeholder="Personal Care Budget"
        value={form.monthly_budget_per_categories.personal_care}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="monthly_budget_per_categories.insurance"
        placeholder="Insurance Budget"
        value={form.monthly_budget_per_categories.insurance}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="monthly_budget_per_categories.miscellaneous"
        placeholder="Miscellaneous Budget"
        value={form.monthly_budget_per_categories.miscellaneous}
        onChange={handleChange}
      />

      <Button
        title="Update Monthly Budget"
        className="primary-button"
        onClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
      />
    </div>
  );
};

export default MonthlyBudgetForm;
