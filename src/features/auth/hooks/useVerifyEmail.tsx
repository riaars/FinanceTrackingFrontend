import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/config/API";

export const useVerifyEmail = (token: string) => {
  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);
  const called = useRef(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token || called.current) return;
      called.current = true;
      try {
        const res = await fetch(`${API_URL}/verifyEmail`, {
          method: "POST",
          body: JSON.stringify({ token }),
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
        setStatus("Token Expired/Invalid Token");
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [token]);

  return {
    status,
    loading,
  };
};
