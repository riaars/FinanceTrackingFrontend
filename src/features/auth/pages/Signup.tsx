import React, { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import AccountSwitchLink from "../ui/AccountSwitchLink";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useSignupMutation } from "../api";
import SignupForm from "../ui/SignupForm";

function Signup() {
  const [openVerifyEmailDialog, setOpenVerifyEmailDialog] = useState(false);
  const [openSignupErrorDialog, setOpenSignupErrorDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [, setSignupError] = useState<any>(null);

  const [, { error, isLoading, isSuccess }] = useSignupMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOpenVerifyEmailDialog(true);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (!isLoading && error) {
      setOpenSignupErrorDialog(true);
    }
  }, [isLoading, error]);

  return (
    <AuthPageLayout>
      <div className="signup__body">
        <div className="signup__info">
          <div className="signup__info__logo">
            <span className="signup__form-title">Let’s get started with </span>{" "}
            <span className="signup__info__logo name">Trexo</span>
          </div>
          <p>Create your free account and take control of your finances.</p>
        </div>
        <div className="signup__form">
          <div className="signup__form-title">Create Account</div>
          <SignupForm
            onSuccess={(email) => {
              setEmail(email);
              setOpenVerifyEmailDialog(true);
            }}
            onError={(error) => {
              setSignupError(error);
              setOpenSignupErrorDialog(true);
            }}
          />

          <AccountSwitchLink source="Signup" />

          {openVerifyEmailDialog && (
            <Dialog
              title="You're almost there!"
              handleCloseDialog={() =>
                setOpenVerifyEmailDialog(!setOpenVerifyEmailDialog)
              }
            >
              <div className="dialog__content">
                <p>
                  {" "}
                  We have sent a verification email to{" "}
                  <span className="link">{email}</span>
                </p>
                <p>Just click the link to activate your account.</p>
              </div>
              <div className="dialog__actions">
                <button
                  className="action-button"
                  onClick={() =>
                    setOpenVerifyEmailDialog(!setOpenVerifyEmailDialog)
                  }
                >
                  OK
                </button>
              </div>
            </Dialog>
          )}

          {openSignupErrorDialog && (
            <Dialog
              title="Registration Failed"
              handleCloseDialog={() =>
                setOpenSignupErrorDialog(!openSignupErrorDialog)
              }
            >
              <div className="dialog__content">
                <p>Oops! Something went wrong on registering the user.</p>
                {/* {signupError.message} */}
              </div>
              <div className="dialog__actions">
                <button
                  className="action-button"
                  onClick={() =>
                    setOpenSignupErrorDialog(!openSignupErrorDialog)
                  }
                >
                  OK
                </button>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </AuthPageLayout>
  );
}

export default Signup;
