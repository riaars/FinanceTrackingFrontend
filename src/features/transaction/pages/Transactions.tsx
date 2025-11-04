import React, { useMemo, useState } from "react";

import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";

import Content from "@/layout/Content";

import UpdateTransactionDialog from "../ui/Transactions/UpdateTransactionDialog";
import DeleteTransactionDialog from "../ui/Transactions/DeleteTransactionDialog";
import AddTransactionDialog from "../ui/Transactions/AddTransactionDialog";

import {
  CategoryExpenseOptions,
  CategoryIncomeOptions,
  TypeOptions,
} from "@/utils/Constant";
import { CategoryIcons } from "@/utils/categoryIcons";
import { downloadCSV, downloadPDF } from "@/utils/downloadFile";

import { useMeQuery } from "@/features/auth";
import { useGetAllTransactionsQuery } from "../api";
import { Transaction } from "../api/type";

import useDebounce from "@/hooks/useDebounce";

const initialFiltered = {
  type: "Select Type",
  category: "Select Category",
  detail: "",
};

function Transactions() {
  const { data: user } = useMeQuery();
  const email = user?.email || "";

  const { data: transactionsData } = useGetAllTransactionsQuery();
  const transactions = useMemo(
    () => transactionsData || [],
    [transactionsData]
  );

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({
    date: "",
    transaction_id: "",
    email: "",
    category: "",
    type: "Expense",
    detail: "",
    amount: 0,
  });

  const [isAdded, setIsAdded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [filtered, setFiltered] = useState(initialFiltered);
  const debounceFilter = useDebounce(filtered.detail, 500);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleFilterChange = (name: string, value: string) => {
    setCurrentPage(1);
    setFiltered((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTransactions = useMemo(() => {
    const term = debounceFilter.toLowerCase();
    return transactions?.filter((transaction: Transaction) => {
      const matchQuery = term
        ? transaction.transaction_id.toLowerCase().includes(term) ||
          transaction.detail.toLowerCase().includes(term)
        : true;

      const matchType =
        filtered.type === "Select Type" || transaction.type === filtered.type;
      const matchCategory =
        filtered.category === "Select Category" ||
        transaction.category === filtered.category;

      return matchCategory && matchType && matchQuery;
    });
  }, [transactions, debounceFilter, filtered.type, filtered.category]);

  const totalItemsPerPage = 8;
  const start = (currentPage - 1) * totalItemsPerPage + 1;
  const end = Math.min(
    currentPage * totalItemsPerPage,
    filteredTransactions?.length || 0
  );

  const filteredTransactionsPerPage = filteredTransactions?.slice(
    start - 1,
    end
  );

  const getTransactionSummaryCount = () => {
    if (end > 0) {
      return `Showing ${start} - ${end}
            of ${filteredTransactions?.length} transactions`;
    } else return "Showing 0 transactions";
  };

  const toggleAddDialog = () => {
    setIsAdded(!isAdded);
  };

  const toggleEditDialog = () => {
    setIsEdit(!isEdit);
  };

  const toggleDeleteDialog = () => {
    setIsDelete(!isDelete);
  };
  return (
    <Content title="Transactions">
      {transactions?.length === 0 ? (
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
                    transactions,
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
                    transactions,
                    `Trexo_Transactions_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`,
                    email
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
                {filteredTransactionsPerPage?.map((transaction) => (
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="transaction-mobile">
            {filteredTransactionsPerPage?.map((transaction) => (
              <div
                className="transaction-card"
                key={transaction.transaction_id}
              >
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
            ))}
          </div>

          {filteredTransactionsPerPage.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItemsPerPage={totalItemsPerPage}
              totalItems={filteredTransactions.length}
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
