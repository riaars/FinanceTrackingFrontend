import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { transactionCreators, State } from "../redux";

import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import UpdateTransactionDialog from "../components/Transactions/UpdateTransactionDialog";
import DeleteTransactionDialog from "../components/Transactions/DeleteTransactionDialog";
import AddTransactionDialog from "../components/Transactions/AddTransactionDialog";

import {
  CategoryExpenseOptions,
  CategoryIncomeOptions,
  TypeOptions,
} from "../utils/Constant";
import Content from "../layout/Content";
import Pagination from "../components/Pagination";
import { downloadCSV, downloadPDF } from "../utils/downloadFile";
import { CategoryIcons } from "../utils/categoryIcons";

export type TransactionType = {
  date: Date | string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: number;
};

const initialFiltered = {
  type: "Select Type",
  category: "Select Category",
  detail: "",
};

function Transactions() {
  const token = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("email") || "";

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
      amount: 0,
    });

  const [isAdded, setIsAdded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [filtered, setFiltered] = useState(initialFiltered);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleFilterChange = (name: string, value: string) => {
    setCurrentPage(1);
    setFiltered((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTransactions = () => {
    let transactionList = transactions as TransactionType[];

    if (
      filtered.type === "Select Type" &&
      filtered.category === "Select Category" &&
      filtered.detail === ""
    ) {
      return transactionList;
    }

    return (transactions as TransactionType[]).filter(
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
  const totalItemsPerPage = 8;
  const start = (currentPage - 1) * totalItemsPerPage + 1;
  const end = Math.min(
    currentPage * totalItemsPerPage,
    filteredTransactions().length
  );

  const filteredTransactionsPerPage = filteredTransactions().slice(
    start - 1,
    end
  );

  const toggleAddDialog = () => {
    setIsAdded(!isAdded);
  };

  const toggleEditDialog = () => {
    setIsEdit(!isEdit);
  };

  const toggleDeleteDialog = () => {
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    if (token) getAllTransactions();
  }, [
    token,
    JSON.stringify(updateTransactionResult),
    JSON.stringify(addTransactionResult),
  ]);

  const getTransactionSummaryCount = () => {
    if (end > 0) {
      return `Showing ${start} - ${end}
            of ${
              (filteredTransactions() as TransactionType[]).length
            } transactions`;
    } else return "Showing 0 transactions";
  };

  return (
    <Content title="Transactions">
      {(transactions as TransactionType[]).length === 0 ? (
        <div className="empty-transactions">
          <div className="empty-transactions__text">
            You don't have any transaction yet. Please add it here.
          </div>
          <Button
            title=" + Add Transaction"
            type="button"
            className="primary-button add-button-transaction"
            onClick={() => {
              setIsAdded(true);
            }}
          />
        </div>
      ) : (
        <div className="transactions">
          <div>
            {/* <Button
              icon={<IoCloudDownloadOutline />}
              title="Download Report"
              type="button"
              className="secondary-button add-button-transaction"
              onClick={toggleAddDialog}
            /> */}

            {/* <Dropdown
              className="small"
              options={DownloadOptions}
              name="type"
              value={filtered.type}
              onChange={handleFilterChange}
            /> */}
            <Button
              title=" + Add Transaction"
              type="button"
              className="primary-button add-button-transaction"
              onClick={toggleAddDialog}
            />
          </div>
          <div>
            <div className="transaction-filter">
              <Input
                className="search-field"
                type="text"
                name="detail"
                placeholder="Search Transaction"
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
                options={
                  filtered.type === "Expense"
                    ? CategoryExpenseOptions
                    : CategoryIncomeOptions
                }
                value={filtered.category}
                onChange={handleFilterChange}
              />
              <Button
                title="Reset"
                type="button"
                className="secondary-button"
                onClick={() => setFiltered(initialFiltered)}
              />
            </div>
            <div className="transaction-filtered-count">
              {getTransactionSummaryCount()}
            </div>

            <div className="flex flex-right gap-1">
              <div
                className="link"
                onClick={() =>
                  downloadCSV(
                    transactions as TransactionType[],
                    `Trexo_Transactions_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`
                  )
                }
              >
                <FaFileCsv />
              </div>
              <div
                className="link"
                onClick={() =>
                  downloadPDF(
                    transactions as TransactionType[],
                    `Trexo_Transactions_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`,
                    loggedInUser
                  )
                }
              >
                <FaFilePdf />
              </div>
            </div>
          </div>

          <div className="transaction-desktop">
            <table className="transaction-table">
              <thead className="table-head">
                <tr className="table-row-head">
                  <td className="table-cell">Transaction</td>
                  <td className="table-cell">Amount</td>
                  <td className="table-cell">Date</td>
                  <td className="table-cell">Type</td>
                  <td className="table-cell">Details</td>
                  <td className="table-cell">Actions</td>
                </tr>
              </thead>
              <tbody>
                {filteredTransactionsPerPage?.map(
                  (transaction: TransactionType) => (
                    <tr key={transaction.transaction_id} className="table-row">
                      <td className="table-cell">
                        <div className="transaction-category__wrapper">
                          <button className="secondary-button">
                            {CategoryIcons(transaction.category)}
                          </button>
                          <div className="transaction-category__details">
                            {transaction.category}
                            <a href="" className="transaction-id">
                              {transaction.transaction_id}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className={`table-cell}`}>
                        <span
                          className={`${
                            transaction.type === "Expense"
                              ? "amount-expense"
                              : "amount-income"
                          }`}
                        >
                          {transaction.type === "Expense" ? "-" : "+"}
                          {transaction.amount} kr
                        </span>
                      </td>

                      <td className="table-cell">
                        {new Date(transaction.date).toLocaleDateString("en-SE")}
                      </td>
                      <td className="table-cell">
                        <Button
                          title={transaction?.type}
                          className={`tag-button ${transaction?.type?.toLowerCase()}`}
                        />
                      </td>

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
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="transaction-mobile">
            {filteredTransactionsPerPage?.map(
              (transaction: TransactionType) => (
                <div className="transaction-card" key={transaction._id}>
                  <div className="transaction-category__wrapper">
                    <button className="icon-button">
                      {CategoryIcons(transaction.category)}
                    </button>
                    <div className="transaction-category__details">
                      <div className="transaction-category">
                        {" "}
                        {transaction.category}
                      </div>
                      <div className="transaction-date">
                        {new Date(transaction.date).toLocaleDateString("en-SE")}
                      </div>
                    </div>
                  </div>

                  <div className="transaction-amount__wrapper">
                    <div className="transaction-amount">
                      <span
                        className={`${
                          transaction.type === "Expense"
                            ? "amount-expense"
                            : "amount-income"
                        }`}
                      >
                        {transaction.type === "Expense" ? "-" : "+"}
                        {transaction.amount} kr
                      </span>
                    </div>
                    {/* <div className="transaction-type">
                      <button
                        className={`${
                          transaction.type === "Income"
                            ? "tag-button income small"
                            : "tag-button expense small"
                        }`}
                      >
                        {transaction.type}
                      </button>
                    </div> */}
                  </div>
                </div>
              )
            )}
          </div>

          {filteredTransactionsPerPage.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItemsPerPage={totalItemsPerPage}
              totalItems={filteredTransactions().length}
              handleChange={handlePageChange}
            />
          )}

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
      )}

      {isAdded && <AddTransactionDialog toggleDialog={toggleAddDialog} />}
    </Content>
  );
}

export default Transactions;
