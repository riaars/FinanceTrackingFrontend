import ProgressBar from "@/components/ProgressBar";
import { formattedCategory } from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import UpdateBudgetDialog from "./UpdateBudgetDialog";

type BudgetCardProps = {
  category_type: string;
  category_label: string;
  current_balance: number;
  category_budget: number;
};
const BudgetCard = (props: BudgetCardProps) => {
  const [updateBudget, setUpdateBudget] = useState(false);

  const toggleUpdateBudget = () => {
    setUpdateBudget(!updateBudget);
  };
  return (
    <div className="budget-card__container">
      <div className="budget-card-category__wrapper">
        <button
          className={`category-icon-button ${formattedCategory(
            props.category_label
          )}`}
        >
          {CategoryIcons(props.category_label)}
        </button>

        {props.category_label}
      </div>
      <div className="budget-card__progress">
        <ProgressBar
          percentage={(props.current_balance / props.category_budget) * 100}
        />
      </div>

      <div className="budget-card__action">
        <MdEdit
          className="table-cell__icon edit"
          onClick={() => toggleUpdateBudget()}
        />
      </div>

      {updateBudget && (
        <UpdateBudgetDialog
          toggleDialog={toggleUpdateBudget}
          category_budget={props.category_budget}
          category_label={props.category_label}
          category_type={props.category_type}
        />
      )}
    </div>
  );
};

export default BudgetCard;
