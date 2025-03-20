import React, { useEffect, useState } from "react";
import Button from "../components/Button";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import Dialog from "../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { transactionCreators, State } from "../redux";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { CategoryOptions, TypeOptions } from "../utils/Constant";
import { debounce, formattedDate } from "../utils/helpers";
import * as PATH from "../config/Path";
import { useNavigate } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import UpdateTransactionDialog from "../components/Transactions/UpdateTransactionDialog";
import DeleteTransactionDialog from "../components/Transactions/DeleteTransactionDialog";

export type TransactionType = {
  date: Date | string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: string;
};

const initialFiltered = {
  type: "Select Type",
  category: "Select Category",
  detail: "",
};

function Transactions() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { getAllTransactions } = bindActionCreators(
    transactionCreators,
    dispatch
  );

  const { transactions, updateTransactionResult, addTransactionResult } =
    useSelector((state: State) => state.transaction);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>({
      date: "",
      transaction_id: "",
      email: "",
      category: "",
      type: "",
      detail: "",
      amount: "",
    });

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [filtered, setFiltered] = useState(initialFiltered);

  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);

  const handleFilterChange = (name: string, value: string) => {
    setFiltered((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditDialog = () => {
    setIsEdit(!isEdit);
  };

  const toggleDeleteDialog = () => {
    setIsDelete(!isDelete);
  };

  const debouncedFilterChange = debounce(handleFilterChange, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiltered((prev) => ({ ...prev, [e.target.name]: value }));
    debouncedFilterChange(e.target.name, value);
  };

  const filteredTransactions = () => {
    let transactionList = transactions;

    if (
      filtered.type === "Select Type" &&
      filtered.category === "Select Category" &&
      filtered.detail === ""
    ) {
      return transactionList;
    }

    return transactions.filter(
      (transaction: {
        type: string;
        category: string;
        transaction_id: string;
        detail: string;
      }) => {
        const matchTransactionIDDetails =
          filtered.detail === "" ||
          transaction.transaction_id.includes(filtered.detail) ||
          transaction.detail
            .toLowerCase()
            .includes(filtered.detail.toLowerCase());
        const matchType =
          filtered.type === "Select Type" || transaction.type === filtered.type;
        const matchCategory =
          filtered.category === "Select Category" ||
          transaction.category === filtered.category;

        return matchTransactionIDDetails && matchType && matchCategory;
      }
    );
  };

  useEffect(() => {
    if (token) getAllTransactions();
  }, [
    token,
    JSON.stringify(updateTransactionResult),
    JSON.stringify(addTransactionResult),
  ]);

  return (
    <div className="transactions-container">
      <div
        className="empty-transactions"
        style={{ display: transactions.length > 0 ? "none" : "flex" }}
      >
        <div className="empty-transactions__text">
          You don't have any transaction yet. Please add it here.
        </div>
        <Button
          title=" + Add Transaction"
          type="button"
          className="primary-button add-button-transaction"
          onClick={() => {
            setOpenAddTransactionDialog(true);
          }}
        />
      </div>

      <div
        className="transactions"
        style={{ display: transactions.length > 0 ? "block" : "none" }}
      >
        <div>
          <div className="transaction-filter">
            <Input
              className="search-field"
              type="text"
              name="detail"
              placeholder="Search by Transaction ID or Details"
              value={filtered.detail}
              onChange={handleSearchChange}
            />

            <Dropdown
              className="small"
              options={TypeOptions}
              name="type"
              value={filtered.type}
              onChange={handleFilterChange}
            />
            <Dropdown
              className="small"
              name="category"
              options={CategoryOptions}
              value={filtered.category}
              onChange={handleFilterChange}
            />
            <Button
              title="Reset"
              type="button"
              className="secondary-button"
              onClick={() => setFiltered(initialFiltered)}
            />
            <Button
              title=" + Add Transaction"
              type="button"
              className="primary-button add-button-transaction"
              onClick={() => setOpenAddTransactionDialog(true)}
            />
          </div>
          <div className="transaction-filtered-count">{`${
            filteredTransactions().length
          } of ${transactions.length} transactions `}</div>
        </div>

        <table className="transaction-table">
          <thead className="table-head">
            <tr className="table-row-head">
              <td className="table-cell">Date</td>
              <td className="table-cell">Transaction ID</td>
              <td className="table-cell">Type</td>
              <td className="table-cell">Category</td>
              <td className="table-cell">Amount</td>
              <td className="table-cell">Details</td>
              <td className="table-cell">Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions()?.map((transaction: any) => (
              <tr key={transaction.transaction_id} className="table-row">
                <td className="table-cell">
                  {new Date(transaction.date).toLocaleDateString("en-SE")}
                </td>
                <td className="table-cell">
                  <a href="" className="link">
                    {transaction.transaction_id}
                  </a>
                </td>

                <td className="table-cell">
                  <Button
                    title={transaction?.type?.toLowerCase()}
                    className={`tag-button ${transaction?.type?.toLowerCase()}`}
                  />
                </td>
                <td className="table-cell">{transaction.category}</td>
                <td className="table-cell">{transaction.amount}</td>
                <td className="table-cell">{transaction.detail}</td>
                <td className="table-cell">
                  <MdEdit
                    className="table-cell__icon edit"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setIsEdit(!isEdit);
                    }}
                  />
                  <MdDelete
                    className="table-cell__icon delete"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setIsDelete(!isDelete);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEdit && (
          <UpdateTransactionDialog
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
            toggleDialog={toggleEditDialog}
          />
        )}
        {isDelete && (
          <DeleteTransactionDialog
            selectedTransaction={selectedTransaction}
            toggleDialog={toggleDeleteDialog}
          />
        )}
      </div>

      {openAddTransactionDialog && (
        <Dialog
          title="Add New Transaction"
          handleCloseDialog={() =>
            setOpenAddTransactionDialog(!openAddTransactionDialog)
          }
        >
          <AddTransaction
            openAddTransactionDialog={openAddTransactionDialog}
            setOpenAddTransactionDialog={setOpenAddTransactionDialog}
            openUserInputDialog={openUserInputDialog}
            setOpenUserInputDialog={setOpenUserInputDialog}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Transactions;
