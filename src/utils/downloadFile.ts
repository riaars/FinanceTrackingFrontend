import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/images/logo.png";
import { Transaction } from "@/features/transaction/api/type";

export const downloadPDF = (
  transactions: Transaction[],
  fileName = "transactions.pdf",
  userInfo: any
) => {
  const doc = new jsPDF();
  const logo = new Image();
  logo.src = Logo;

  logo.onload = () => {
    doc.addImage(logo, "PNG", 14, 10, 14, 14);
    doc.text("Trexo", 26, 19);

    doc.setFontSize(12);
    doc.text(userInfo, 150, 19);
    doc.setFontSize(8);
    doc.text(new Date().toLocaleString(), 150, 24);
    doc.setFontSize(18);
    doc.text("Transaction Summary", 14, 40);

    autoTable(doc, {
      head: [
        ["Date", "Transaction ID", "Category", "Type", "Detail", "Amount"],
      ],
      body: transactions.map((tx: Transaction) => [
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

export const downloadCSV = (data: Transaction[], filename = "data.csv") => {
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
