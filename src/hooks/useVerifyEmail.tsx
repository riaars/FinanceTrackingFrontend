import { useEffect, useState } from "react";
import { API_URL } from "../config/API";

export const useVerifyEmail = (token: string) => {
  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await fetch(`${API_URL}/verifyEmail`, {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.log("error");
        setStatus("Token Expired/Invalid Token");
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, []);

  return {
    status,
    loading,
  };
};
