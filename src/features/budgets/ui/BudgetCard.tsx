import ProgressBar from "@/components/ProgressBar";
import { formattedCategory } from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";
import { MdEdit } from "react-icons/md";

type BudgetCardProps = {
  category: string;
  current_balance: number;
  total_budget: number;
};
const BudgetCard = (props: BudgetCardProps) => {
  return (
    <div className="budget-card__container">
      <div className="budget-card-category__wrapper">
        <button
          className={`category-icon-button ${formattedCategory(
            props.category
          )}`}
        >
          {CategoryIcons(props.category)}
        </button>

        {props.category}
      </div>
      <div className="budget-card__progress">
        <ProgressBar
          percentage={(props.current_balance / props.total_budget) * 100}
        />
      </div>

      <div className="budget-card__action">
        <MdEdit className="table-cell__icon edit" onClick={() => {}} />
      </div>
    </div>
  );
};

export default BudgetCard;
