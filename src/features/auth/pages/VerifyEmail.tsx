import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import AuthPageLayout from "@/layout/AuthPageLayout";

import * as PATH from "@/config/Path";

import { useVerifyEmailMutation } from "../api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [verifyEmail, { data }] = useVerifyEmailMutation();
  const status = data?.message;
  const isVerified =
    status === "Email verified successfully" ||
    status === "User is already verified";

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  //Redirect to login if the verification successfull
  useEffect(() => {
    if (isVerified) {
      navigate(PATH.LOGIN);
    }
  }, [status, navigate, isVerified]);

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
