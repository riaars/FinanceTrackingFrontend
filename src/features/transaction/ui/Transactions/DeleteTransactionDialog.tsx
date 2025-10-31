import React from "react";
import Dialog from "@/components/Dialog";
import { useDeleteTransactionMutation } from "../../api";
import { Transaction } from "../../api/type";

interface DeleteTransactionDialogProps {
  selectedTransaction: Transaction;
  toggleDialog: () => void;
}
function DeleteTransactionDialog({
  selectedTransaction,
  toggleDialog,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction] = useDeleteTransactionMutation();

  return (
    <Dialog title="Delete Transaction" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <p>Are you sure want to delete this transaction?</p>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={() => {
            if (selectedTransaction) {
              deleteTransaction(selectedTransaction?.transaction_id);
              toggleDialog();
            }
          }}
        >
          Delete
        </button>
      </div>
    </Dialog>
  );
}

export default DeleteTransactionDialog;
