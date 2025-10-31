import React from "react";
import {
  CategoryExpenseOptions,
  CategoryIncomeOptions,
} from "@/utils/Constant";
import { CategoryIcons } from "@/utils/categoryIcons";

interface CategoryGridProps {
  type: string;
  setSelectedCategory: (name: string, value: string) => void;
  selectedCategory: string;
}
const CategoryGrid = ({
  type,
  setSelectedCategory,
  selectedCategory,
}: CategoryGridProps) => {
  const CategoryOptions =
    type === "Expense" ? CategoryExpenseOptions : CategoryIncomeOptions;
  return (
    <div className="category-grid">
      {CategoryOptions.slice(1, CategoryOptions.length).map((option) => (
        <div
          className={`category-item`}
          onClick={() => setSelectedCategory("category", option)}
        >
          <button
            className={` ${
              selectedCategory === option
                ? "primary-button"
                : "secondary-button"
            }`}
          >
            {CategoryIcons(option)}
          </button>
          <div className="category-label">{option}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
