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

  const balanceRemaining = props.category_budget - props.current_balance;
  const percentageUsed = (props.current_balance / props.category_budget) * 100;

  return (
    <div className="budget-card__container">
      <div className="budget-card__category-wrapper">
        <div>
          <button
            className={`category-icon-button ${formattedCategory(
              props.category_label
            )}`}
          >
            {CategoryIcons(props.category_label)}
          </button>
          {props.category_label}
        </div>
        <div>
          <span className="budget-card__spending-budget-overview">
            {props.current_balance} kr / {props.category_budget} kr
          </span>
        </div>
      </div>
      <div className="budget-card__progress">
        <ProgressBar percentage={percentageUsed} />
      </div>

      <div className="budget-card__stats-wrapper">
        <div className="budget-card__used">
          Used: <strong>{Math.min(percentageUsed, 100).toFixed(0)}%</strong>
        </div>
        <div className="budget-card__remaining">
          Remaining:{" "}
          <strong>
            <span
              className={`${
                balanceRemaining < 0 ? "budget-card__negative" : "inherit"
              }`}
            >
              {balanceRemaining} kr
            </span>
          </strong>
        </div>
      </div>

      <div className="budget-card__action">
        <button
          className="secondary-button medium"
          onClick={() => toggleUpdateBudget()}
        >
          <span className="button-icon__wrapper">
            <MdEdit />
            <span> Quick edit </span>
          </span>
        </button>
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
