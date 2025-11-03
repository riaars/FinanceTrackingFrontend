import React, { useEffect, useState } from "react";

import Dialog from "@/components/Dialog";
import AccountSwitchLink from "../ui/AccountSwitchLink";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api";
import LoginForm from "../ui/LoginForm";
import * as PATH from "@/config/Path";

function Login() {
  const [, { isLoading, isError, isSuccess }] = useLoginMutation();

  const [openLoginErrorDialog, setOpenLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOpenLoginError(false);
      navigate(PATH.DASHBOARD);
    }
  }, [isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (!isLoading && isError) {
      setOpenLoginError(true);
    }
  }, [isLoading, isError]);

  return (
    <AuthPageLayout>
      <div className="login__body">
        <div className="login__info">
          <h1>Welcome back</h1>
          <p>
            Log in to your account to continue managing your finances with ease.
          </p>
        </div>
        <div className="login__form">
          <h1>Login</h1>
          <LoginForm
            onSuccess={() => {
              setOpenLoginError(false);
            }}
            onError={() => {
              setOpenLoginError(true);
            }}
          />
          <AccountSwitchLink source={"Login"} />
        </div>
      </div>

      {!isLoading && openLoginErrorDialog && (
        <Dialog
          title="Login Failed"
          handleCloseDialog={() => setOpenLoginError(!openLoginErrorDialog)}
        >
          <div className="dialog__content">
            <p>Oops! Something went wrong on executing your request.</p>
            <span>{/* Details:<i>{error.message}</i> */}</span>
          </div>
          <div className="dialog__actions">
            <button
              className="action-button"
              onClick={() => setOpenLoginError(!openLoginErrorDialog)}
            >
              OK
            </button>
          </div>
        </Dialog>
      )}
    </AuthPageLayout>
  );
}

export default Login;
