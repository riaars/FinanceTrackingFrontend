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
import { formattedDate } from "../utils/helpers";
import * as PATH from "../config/Path";
import { useNavigate } from "react-router-dom";
import AddTransaction from "./AddTransaction";

export type TransactionType = {
  date: string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: string;
};

type TransactionErrorsFormType = {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    deleteTransaction,
    getAllTransactions,
    updateTransaction,
    addTransaction,
  } = bindActionCreators(transactionCreators, dispatch);

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

  const [transactionSubmit, setTransactionSubmit] = useState(false);
  const [form, setForm] = useState({
    category: "Select category",
    type: "Select type",
    detail: "",
    amount: "",
  });

  const [formErrors, setFormErrors] = useState<TransactionErrorsFormType>({
    category: "",
    type: "",
    detail: "",
    amount: "",
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const handleTransactionChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormTransactionValid()) {
      try {
        if (token) {
          addTransaction(form, token);
          setTransactionSubmit(true);
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    } else {
      setOpenUserInputDialog(!openUserInputDialog);
    }
    setOpenAddTransactionDialog(false);
  };

  const isFormTransactionValid = () => {
    const newErrors: TransactionErrorsFormType =
      {} as TransactionErrorsFormType;
    if (form.type === "Select type") {
      newErrors.type = "Type is required";
    }
    if (form.category === "Select category") {
      newErrors.category = "Category is required";
    }

    if (form.detail === "") {
      newErrors.detail = "Detail is required";
    }

    if (parseInt(form.amount) === 0) {
      newErrors.amount = "Amount is required";
    }

    setFormErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setSelectedTransaction({ ...selectedTransaction, [name]: value });
  };

  const handleFilterChange = (name: string, value: string) => {
    setFiltered({ ...filtered, [name]: value });
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
    if (token) getAllTransactions(token);
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
      </div>

      <div
        className="transactions"
        style={{ display: transactions.length > 0 ? "block" : "none" }}
      >
        <div>
          <div className="transaction-filter">
            <Input
              type="text"
              name="detail"
              placeholder="Search by Transaction ID or Details"
              value={filtered.detail}
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
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

        <div>
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
                    {formattedDate(transaction.date)}
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
        </div>
        {isEdit && (
          <Dialog
            title="Update Transaction"
            handleCloseDialog={() => setIsEdit(!isEdit)}
          >
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
              <button
                className="secondary-button"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  if (token && selectedTransaction) {
                    updateTransaction(selectedTransaction, token);
                    setIsEdit(!isEdit);
                  }
                }}
              >
                Update
              </button>
            </div>
          </Dialog>
        )}
        {isDelete && (
          <Dialog
            title="Delete Transaction"
            handleCloseDialog={() => setIsDelete(!isDelete)}
          >
            <div className="dialog__content">
              <p>Are you sure want to delete this transaction?</p>
            </div>
            <div className="dialog__actions">
              <button
                className="secondary-button"
                onClick={() => setIsDelete(!isDelete)}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  if (token && selectedTransaction) {
                    deleteTransaction(
                      selectedTransaction?.transaction_id,
                      token
                    );
                    setIsDelete(!isDelete);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </Dialog>
        )}

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
    </div>
  );
}

export default Transactions;
