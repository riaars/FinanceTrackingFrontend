import { formattedCategory } from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useGetActiveRecurringsQuery } from "../api";
import Content from "@/layout/Content";
import UpdateRecurringPlanDialog from "../ui/UpdateRecurringPlanDialog";
import DeleteRecurringPlanDialog from "../ui/DeleteRecurringPlanDialog";
import { Transaction } from "@/features/transaction/api/type";

const Recurring = () => {
  const { data: recurrings } = useGetActiveRecurringsQuery();
  const [selectedRecurring, setSelectedRecurring] =
    React.useState<Transaction>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const recurringsData = recurrings?.data || [];

  const toggleEditDialog = () => {
    setIsEdit(!isEdit);
  };

  const toggleDeleteDialog = () => {
    setIsDelete(!isDelete);
  };

  return (
    <Content title="Recurring Transactions">
      <div className="transaction-desktop">
        <table className="transaction-table">
          <thead className="table-head">
            <tr className="table-row-head">
              <td className="table-cell">Transaction</td>
              <td className="table-cell">Amount</td>
              <td className="table-cell">Period</td>
              <td className="table-cell">Next Date</td>
              <td className="table-cell">Actions</td>
            </tr>
          </thead>
          <tbody>
            {recurringsData?.map((recurringItem: any) => (
              <tr key={recurringItem.transaction_id} className="table-row">
                <td className="table-cell">
                  <div className="transaction-category__wrapper">
                    <button
                      className={`category-icon-button ${formattedCategory(
                        recurringItem.category
                      )}`}
                    >
                      {CategoryIcons(recurringItem.category)}
                    </button>
                    <div className="transaction-category__details">
                      {recurringItem.category}
                      <a href="" className="transaction-id">
                        {recurringItem.detail.slice(0, 30)}
                      </a>
                    </div>
                  </div>
                </td>

                <td className={`table-cell}`}>
                  <span
                    className={`${
                      recurringItem.type === "Expense"
                        ? "amount-expense"
                        : "amount-income"
                    }`}
                  >
                    {recurringItem.type === "Expense" ? "-" : "+"}
                    {recurringItem.amount} kr
                  </span>
                </td>

                <td className="table-cell transaction-detail">
                  {recurringItem.interval}
                </td>
                <td className="table-cell">
                  {new Date(recurringItem.nextDate).toLocaleDateString("en-SE")}{" "}
                </td>

                <td className="table-cell">
                  <MdEdit
                    className="table-cell__icon edit"
                    onClick={() => {
                      setSelectedRecurring(recurringItem);
                      setIsEdit(!isEdit);
                    }}
                  />
                  <MdDelete
                    className="table-cell__icon delete"
                    onClick={() => {
                      setSelectedRecurring(recurringItem);
                      setIsDelete(!isDelete);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEdit && selectedRecurring && (
          <UpdateRecurringPlanDialog
            selectedRecurring={selectedRecurring}
            setSelectedRecurring={setSelectedRecurring}
            toggleDialog={toggleEditDialog}
          />
        )}
        {isDelete && selectedRecurring && (
          <DeleteRecurringPlanDialog
            selectedRecurring={selectedRecurring}
            toggleDialog={toggleDeleteDialog}
          />
        )}
      </div>
    </Content>
  );
};

export default Recurring;
