import React, { ChangeEvent, useState } from "react";
import AuthPageLayout from "../layout/AuthPageLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";
import Dialog from "../components/Dialog";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, status } = useForgotPassword();
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setOpenForgotPasswordDialog(true);
    e.preventDefault();
    await forgotPassword(email);
  };

  const toggleDialog = () => {
    setOpenForgotPasswordDialog((prev) => !prev);
  };
  return (
    <AuthPageLayout>
      <div className="forgot-password__body">
        <div className="forgot-password__title">Forgot Password</div>
        <p className="forgot-password__info">
          Please enter your valid email address to receive a reset link.
        </p>
        <form onSubmit={handleSubmit} className="forgot-password__form">
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />

          <Button
            title="Send"
            className="primary-button"
            disabled={email === ""}
            type="submit"
          />
        </form>
      </div>

      {openForgotPasswordDialog && status === "Reset link send to email" && (
        <Dialog
          title="Reset password link sent!"
          handleCloseDialog={toggleDialog}
        >
          <div className="dialog__content">
            <p>
              We sent the reset link to your email{" "}
              <span className="link">{email}</span>
            </p>

            <p className="forgot-password__info">
              You can check your inbox. This link will expire in 15 minutes.{" "}
            </p>
          </div>
          <div className="dialog__actions">
            <button className="primary-button" onClick={toggleDialog}>
              OK
            </button>
          </div>
        </Dialog>
      )}
    </AuthPageLayout>
  );
};

export default ForgotPassword;
