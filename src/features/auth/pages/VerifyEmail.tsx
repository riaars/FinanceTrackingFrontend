import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import AuthPageLayout from "@/layout/AuthPageLayout";
import * as PATH from "@/config/Path";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { status } = useVerifyEmail(token);

  const isVerified =
    status === "Email verified successfully" ||
    status === "User is already verified";

  //Redirect to login if the verification successfull
  useEffect(() => {
    if (isVerified) {
      navigate(PATH.LOGIN);
    }
  }, [status]);

  return (
    <AuthPageLayout>
      <div className="verify-email__container">
        <div>{status}</div>
        {isVerified && (
          <Link to={PATH.LOGIN}>
            <button className="primary-button">Login Now</button>
          </Link>
        )}
      </div>
    </AuthPageLayout>
  );
};

export default VerifyEmail;
