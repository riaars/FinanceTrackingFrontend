import { useState } from "react";
import { API_URL } from "../config/API";

export const useForgotPassword = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const forgotPassword = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/forgotPassword`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong ");
      }
      const data = await res.json();
      setStatus(data.message);
    } catch (error: any) {
      console.log("error", error);
      setStatus("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    forgotPassword,
  };
};
