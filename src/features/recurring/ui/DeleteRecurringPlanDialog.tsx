import Dialog from "@/components/Dialog";
import { Transaction } from "@/features/transaction/api/type";
import React, { useEffect } from "react";
import { useDeleteRecurringMutation } from "../api";

type DeleteRecurringPlanDialogProps = {
  toggleDialog: () => void;
  selectedRecurring: Transaction;
};
const DeleteRecurringPlanDialog = ({
  toggleDialog,
  selectedRecurring,
}: DeleteRecurringPlanDialogProps) => {
  const [deleteRecurring, { isLoading, isSuccess }] =
    useDeleteRecurringMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toggleDialog();
    }
  }, [isLoading, isSuccess, toggleDialog]);

  return (
    <Dialog title="Delete Recurring Plan" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <p>Are you sure want to delete this recurring plan?</p>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={() => {
            if (selectedRecurring) {
              deleteRecurring({
                transaction_id: selectedRecurring?.transaction_id,
              });
            }
          }}
        >
          Delete
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteRecurringPlanDialog;
