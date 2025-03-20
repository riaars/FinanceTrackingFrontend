import React from "react";
import Dialog from "../Dialog";
import Dropdown from "../Dropdown";
import { TransactionType } from "../../pages/Transactions";
import { CategoryOptions, TypeOptions } from "../../utils/Constant";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { transactionCreators } from "../../redux";

const token = localStorage.getItem("token");

interface UpdateTransactionDialogProps {
  selectedTransaction: TransactionType;
  setSelectedTransaction: (e: TransactionType) => void;
  toggleDialog: () => void;
}

function UpdateTransactionDialog({
  selectedTransaction,
  setSelectedTransaction,
  toggleDialog,
}: UpdateTransactionDialogProps) {
  const dispatch = useDispatch();
  const { updateTransaction } = bindActionCreators(
    transactionCreators,
    dispatch
  );

  const handleChange = (name: string, value: string) => {
    setSelectedTransaction({ ...selectedTransaction, [name]: value });
  };

  return (
    <Dialog title="Update Transaction" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__header">
          {selectedTransaction?.transaction_id}
        </div>
        <div className="dialog__content__body">
          <Dropdown
            options={TypeOptions}
            name="type"
            value={selectedTransaction?.type || ""}
            onChange={handleChange}
          />

          <Dropdown
            options={CategoryOptions}
            name="category"
            value={selectedTransaction?.category || ""}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            value={selectedTransaction?.amount || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <Input
            type="text"
            name="detail"
            placeholder="Detail"
            value={selectedTransaction?.detail || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="dialog__actions">
        <button className="secondary-button" onClick={toggleDialog}>
          Cancel
        </button>
        <button
          className="primary-button"
          onClick={() => {
            if (token && selectedTransaction) {
              updateTransaction(selectedTransaction);
              toggleDialog();
            }
          }}
        >
          Update
        </button>
      </div>
    </Dialog>
  );
}

export default UpdateTransactionDialog;
