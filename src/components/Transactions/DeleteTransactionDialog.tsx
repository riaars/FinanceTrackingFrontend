import React from "react";
import Dialog from "../Dialog";
import { TransactionType } from "../../pages/Transactions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { transactionCreators } from "../../redux";

const token = localStorage.getItem("token");

interface DeleteTransactionDialogProps {
  selectedTransaction: TransactionType;
  toggleDialog: () => void;
}
function DeleteTransactionDialog({
  selectedTransaction,
  toggleDialog,
}: DeleteTransactionDialogProps) {
  const dispatch = useDispatch();
  const { deleteTransaction } = bindActionCreators(
    transactionCreators,
    dispatch
  );

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
            if (token && selectedTransaction) {
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
