import React, { ChangeEvent, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { transactionCreators } from "../../redux";
import { CategoryOptions, TypeOptions } from "../../utils/Constant";
import Dialog from "../Dialog";
import { formattedDate } from "../../utils/helpers";
import InputDate from "../Date";
import Tesseract from "tesseract.js";

type TransactionErrorsFormType = {
  date: string;
  category: string;
  type: string;
  detail: string;
  amount: string;
};

type AddTransactionDialogProps = {
  toggleDialog: () => void;
};

function AddTransactionDialog({ toggleDialog }: AddTransactionDialogProps) {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { addTransaction } = bindActionCreators(transactionCreators, dispatch);

  let date = new Date(Date.now());

  const [form, setForm] = useState({
    date: date.toISOString().split("T")[0],
    category: "Select Category",
    type: "Select Type",
    detail: "",
    amount: "",
  });

  const [formErrors, setFormErrors] = useState<TransactionErrorsFormType>({
    date: "",
    category: "",
    type: "",
    detail: "",
    amount: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);
  const [transactionSubmit, setTransactionSubmit] = useState(false);
  const [receipt, setReceipt] = useState<File>();
  const [loadingScan, setLoadingScan] = useState(true);
  const [parsedText, setParsedText] = useState({});

  const handleTransactionChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormTransactionValid()) {
      try {
        if (token) {
          addTransaction(form);
          setTransactionSubmit(true);
          toggleDialog();
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    } else {
      setOpenUserInputDialog(!openUserInputDialog);
    }
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

  const handleUploadReceipt = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    console.log("uploading");

    if (file) {
      setReceipt(file);
      scanReceipt(file);
    }
  };

  const scanReceipt = async (file: File) => {
    const imageURL = URL.createObjectURL(file);
    Tesseract.recognize(imageURL, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setParsedText(text);
      })
      .catch((err) => {
        console.error("OCR error:", err);
        setParsedText("Failed to read the receipt.");
      })
      .finally(() => {
        setLoadingScan(false);
      });
  };

  return (
    <Dialog title="Add New Transaction" handleCloseDialog={toggleDialog}>
      <div className="add-transaction__dialog">
        <div
          className="add-transaction__form"
          style={{
            display: !isFormValid && openUserInputDialog ? "none" : "block",
          }}
        >
          <div className="dialog__content__body">
            {/* <input
              type="file"
              name="receipt"
              placeholder="Upload Receipt"
              accept="image/*"
              onChange={handleUploadReceipt}
              className="input-field"
            /> */}

            <InputDate
              name="date"
              value={form.date}
              placeholder="Date"
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
              min="1970-01-01"
              max={formattedDate(new Date(Date.now()).toISOString())}
            />
            <Dropdown
              options={TypeOptions}
              name="type"
              value={form.type}
              onChange={handleTransactionChange}
            />

            <Dropdown
              options={CategoryOptions}
              name="category"
              value={form.category}
              onChange={handleTransactionChange}
            />

            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
            />

            <textarea
              className="input-field"
              name="detail"
              rows={3}
              placeholder="Details"
              value={form.detail}
              onChange={(e) =>
                handleTransactionChange(e.target.name, e.target.value)
              }
            />
          </div>
          <div className="dialog__actions">
            <button className="secondary-button" onClick={toggleDialog}>
              Cancel
            </button>
            <Button
              title="Add Transaction"
              className="primary-button"
              onClick={(e) =>
                handleSubmit(e as React.FormEvent<HTMLFormElement>)
              }
            ></Button>
          </div>
        </div>

        {!isFormValid && openUserInputDialog && (
          <Dialog
            title="Incomplete Request"
            handleCloseDialog={() =>
              setOpenUserInputDialog(!openUserInputDialog)
            }
          >
            <div className="dialog__content">
              <p>
                Oops! We couldn’t submit your transaction because some required
                fields are missing:
              </p>
              <ul>
                {Object.entries(formErrors).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
              <p>
                Make sure all required fields are completed before submitting.
              </p>
            </div>
            <div className="dialog__actions">
              <button
                className="primary-button"
                onClick={() => setOpenUserInputDialog(!openUserInputDialog)}
              >
                OK
              </button>
            </div>
          </Dialog>
        )}
      </div>
    </Dialog>
  );
}

export default AddTransactionDialog;
