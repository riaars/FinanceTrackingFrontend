import React from "react";
import Dialog from "@/components/Dialog";
import Dropdown from "@/components/Dropdown";
import { TypeOptions } from "@/utils/Constant";
import Input from "@/components/Input";
import CategoryGrid from "./CategoryGrid";
import { useUpdateTransactionMutation } from "../../api";
import { Transaction } from "../../api/type";

interface UpdateTransactionDialogProps {
  selectedTransaction: Transaction;
  setSelectedTransaction: (e: Transaction) => void;
  toggleDialog: () => void;
}

function UpdateTransactionDialog({
  selectedTransaction,
  setSelectedTransaction,
  toggleDialog,
}: UpdateTransactionDialogProps) {
  const [updateTransaction] = useUpdateTransactionMutation();

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

          {selectedTransaction?.type !== "Select Type" && (
            <CategoryGrid
              type={selectedTransaction?.type}
              setSelectedCategory={handleChange}
              selectedCategory={selectedTransaction?.category || ""}
            />
          )}

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
            if (selectedTransaction) {
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
