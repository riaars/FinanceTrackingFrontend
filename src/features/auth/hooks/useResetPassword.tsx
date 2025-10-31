import { useState } from "react";
import { API_URL } from "@/config/API";

export const useResetPassword = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const resetPassword = async (token: string, password: string) => {
    setStatus("");
    try {
      const res = await fetch(`${API_URL}/resetPassword`, {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Password can not be the same as your previous one.");
      }
      const data = await res.json();
      setStatus(data.message);
    } catch (error: any) {
      console.log("error", error);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    resetPassword,
  };
};
