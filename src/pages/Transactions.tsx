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

export type TransactionType = {
  date: string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: number;
};

function Transactions() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { deleteTransaction, getAllTransactions, updateTransaction } =
    bindActionCreators(transactionCreators, dispatch);

  const { transactions, updateTransactionResult } = useSelector(
    (state: State) => state.transaction
  );

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>({
      date: "",
      transaction_id: "",
      email: "",
      category: "",
      type: "",
      detail: "",
      amount: 0,
    });

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [filtered, setFiltered] = useState({
    type: "Select Type",
    category: "Select Category",
  });

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
      filtered.category === "Select Category"
    ) {
      return transactionList;
    }

    return transactions.filter(
      (transaction: { type: string; category: string }) => {
        const matchType =
          filtered.type === "Select Type" || transaction.type === filtered.type;
        const matchCategory =
          filtered.category === "Select Category" ||
          transaction.category === filtered.category;

        return matchType && matchCategory;
      }
    );
  };

  useEffect(() => {
    if (token) getAllTransactions(token);
  }, [token, JSON.stringify(updateTransactionResult)]);

  return (
    <div>
      <div className="page_title">Transactions</div>
      <div className="transaction-filter">
        <Dropdown
          options={TypeOptions}
          name="type"
          value={filtered.type}
          onChange={handleFilterChange}
        />
        <Dropdown
          options={CategoryOptions}
          name="category"
          value={filtered.category}
          onChange={handleFilterChange}
        />
      </div>

      <table className="transaction-table">
        <thead className="table-head">
          <tr className="table-row">
            <td className="table-cell">Date</td>
            <td className="table-cell">Transaction ID</td>
            <td className="table-cell">Type</td>
            <td className="table-cell">Category</td>
            <td className="table-cell">Amount</td>
            <td className="table-cell">Detail</td>
            <td className="table-cell">Actions</td>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions()?.map((transaction: any) => (
            <tr key={transaction.transaction_id} className="table-row">
              <td className="table-cell">{formattedDate(transaction.date)}</td>
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
              <td className="table-cell">
                {/* <Button
                  title={transaction?.category?.toLowerCase()}
                  className={`tag-button ${transaction?.category?.toLowerCase()}`}
                /> */}
                {transaction.category}
              </td>
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
                type="text"
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
                  deleteTransaction(selectedTransaction?.transaction_id, token);
                  setIsDelete(!isDelete);
                }
              }}
            >
              Delete
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Transactions;
