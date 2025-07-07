import { ChangeEvent, useState } from "react";
import Tesseract from "tesseract.js";

export const useScanReceipt = () => {
  const [receipt, setReceipt] = useState<File>();
  const [loadingScan, setLoadingScan] = useState(true);
  const [parsedText, setParsedText] = useState({});

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

  return {
    receipt,
    loadingScan,
    parsedText,
    handleUploadReceipt,
  };
};
