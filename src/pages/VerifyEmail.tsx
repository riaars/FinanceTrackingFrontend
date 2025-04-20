import React from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import AuthPageLayout from "../layout/AuthPageLayout";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { status } = useVerifyEmail(token);

  return (
    <AuthPageLayout>
      <div className="verify-email__container">{status}</div>
    </AuthPageLayout>
  );
};

export default VerifyEmail;
