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
  const dispatch = useDispatch();
  const { deleteTransaction, getAllTransactions } = bindActionCreators(
    transactionCreators,
    dispatch
  );

  const { transactions } = useSelector((state: State) => state.transaction);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const [form, setForm] = useState({
    category: "Select transaction category",
    type: "Select transaction type",
    detail: "",
    amount: 0,
  });

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <table className="transaction-table">
        <thead className="table-head">
          <tr className="table-row">
            <td className="table-cell">Date</td>
            <td className="table-cell">Transaction ID</td>
            <td className="table-cell">Type</td>
            <td className="table-cell">Category</td>
            <td className="table-cell">Detail</td>
            <td className="table-cell">Amount</td>
            <td className="table-cell">Actions</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction: any) => (
            <tr key={transaction?.transaction_id} className="table-row">
              <td className="table-cell">{formattedDate(transaction.date)}</td>
              <td className="table-cell">
                <a href="" style={{ color: "#ffd000" }}>
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
              <td className="table-cell">{transaction.detail}</td>
              <td className="table-cell">{transaction.amount}</td>
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
                    deleteTransaction(transaction?.transaction_id);
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
          // content={`Edit transaction with id ${selectedTransaction?.transaction_id}`}
        >
          <div className="dialog__content">
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              {selectedTransaction?.transaction_id}
            </div>
            <Dropdown
              options={TypeOptions}
              name="type"
              value={selectedTransaction?.type}
              onChange={handleChange}
            />

            <Dropdown
              options={CategoryOptions}
              name="category"
              value={selectedTransaction?.category}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="detail"
              placeholder="Detail"
              value={selectedTransaction?.detail}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <Input
              type="text"
              name="amount"
              placeholder="Amount"
              value={selectedTransaction?.amount}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
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
              onClick={() => setIsEdit(!isEdit)}
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
          <div className="dialog__actions">
            <button
              className="secondary-button"
              onClick={() => setIsEdit(!isEdit)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              onClick={() => setIsEdit(!isEdit)}
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
