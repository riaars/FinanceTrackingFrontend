import { useEffect, useState } from "react";
import { API_URL } from "../config/API";

export type TransactionType = {
  date: string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: number;
};

export const useGetAllTransactions = () => {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const getAllTransactions = async () => {
    const url = `${API_URL}/getAllTransactions`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("error");
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);

  return {
    transactions,
    setTransactions,
  };
};
