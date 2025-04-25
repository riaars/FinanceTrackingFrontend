import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { transactionCreators, State } from "../redux";

import { MdEdit, MdDelete } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { IoStarSharp } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";

import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import UpdateTransactionDialog from "../components/Transactions/UpdateTransactionDialog";
import DeleteTransactionDialog from "../components/Transactions/DeleteTransactionDialog";
import AddTransactionDialog from "../components/Transactions/AddTransactionDialog";

import { CategoryOptions, TypeOptions } from "../utils/Constant";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/images/logo.png";
import Content from "../layout/Content";
import Pagination from "../components/Pagination";

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
  const totalItemsPerPage = 8;

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleFilterChange = (name: string, value: string) => {
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

  const filteredTransactionsPerPage = filteredTransactions().slice(
    (currentPage - 1) * totalItemsPerPage + 1,
    totalItemsPerPage * currentPage
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

  const downloadCSV = (data: TransactionType[], filename = "data.csv") => {
    let originalHeaders = Object.keys(data[0]);
    const headers = originalHeaders.filter(
      (item) => item !== "email" && item !== "_id" && item !== "__v"
    );
    const csv = [
      headers.join(","), // header row
      ...data.map((row) => headers.map((field) => `"${row[field]}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = (
    transactions: TransactionType[],
    fileName = "transactions.pdf"
  ) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = Logo;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 14, 10, 14, 14);
      doc.text("Trexo", 26, 19);

      doc.setFontSize(12);
      doc.text(loggedInUser, 150, 19);
      doc.setFontSize(8);
      doc.text(new Date().toLocaleString(), 150, 24);
      doc.setFontSize(18);
      doc.text("Transaction Summary", 14, 40);

      autoTable(doc, {
        head: [
          ["Date", "Transaction ID", "Category", "Type", "Detail", "Amount"],
        ],
        body: transactions.map((tx: TransactionType) => [
          tx.date,
          tx.transaction_id,
          tx.category,
          tx.type,
          tx.detail,
          `SEK${tx.amount.toFixed(2)}`,
        ]),
        styles: {
          head: {
            fillColor: [52, 89, 212],
            textColor: 255,
            fontStyle: "bold",
          },
        },
        startY: 50,
      });
      doc.save(fileName);
    };
  };

  const CategoryIcon = (category: string) => {
    switch (category) {
      case "Food":
        return <IoFastFood fontSize={"18px"} />;
      case "Transport":
        return <FaCarAlt fontSize={"18px"} />;
      case "Entertainment":
        return <MdMovieFilter fontSize={"18px"} />;
      case "Rent":
        return <FaHome fontSize={"18px"} />;
      case "Salary":
        return <GrMoney fontSize={"18px"} />;

      default:
        return <IoStarSharp fontSize={"18px"} />;
    }
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
            </div>
            <div className="transaction-filtered-count">{`Showing ${
              filteredTransactions().length
            } of ${
              (transactions as TransactionType[]).length
            } transactions`}</div>

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
                    `Trexo_Transactions_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`
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
                  {/* <td className="table-cell">Actions</td> */}
                </tr>
              </thead>
              <tbody>
                {filteredTransactionsPerPage?.map(
                  (transaction: TransactionType) => (
                    <tr key={transaction.transaction_id} className="table-row">
                      <td className="table-cell">
                        <div className="transaction-category__wrapper">
                          <button className="secondary-button">
                            {CategoryIcon(transaction.category)}
                          </button>
                          <div className="transaction-category__details">
                            {transaction.category}
                            <a href="" className="transaction-id">
                              {transaction.transaction_id}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">{transaction.amount} kr</td>

                      <td className="table-cell">
                        {new Date(transaction.date).toLocaleDateString("en-SE")}
                      </td>

                      <td className="table-cell">{transaction.detail}</td>
                      <td className="table-cell">
                        <Button
                          title={transaction?.type}
                          className={`tag-button ${transaction?.type?.toLowerCase()}`}
                        />
                      </td>

                      {/* <td className="table-cell">
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
                    </td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="transaction-mobile">
            {filteredTransactionsPerPage?.map(
              (transaction: TransactionType) => (
                <div className="transaction-card">
                  <div className="transaction-category__wrapper">
                    <button className="icon-button">
                      {CategoryIcon(transaction.category)}
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
                      {transaction.amount} kr
                    </div>
                    <div className="transaction-type">
                      <button
                        className={`${
                          transaction.type === "Income"
                            ? "tag-button income small"
                            : "tag-button expense small"
                        }`}
                      >
                        {transaction.type}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItemsPerPage={totalItemsPerPage}
            totalItems={filteredTransactions().length}
            handleChange={handlePageChange}
          />

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
