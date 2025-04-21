import React, { useState } from "react";
import AuthPageLayout from "../layout/AuthPageLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import { Link, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword";
import * as PATH from "../config/Path";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { resetPassword, status } = useResetPassword();
  const [
    openResetPasswordConfirmationDialog,
    setOpenResetPasswordConfirmationDialog,
  ] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setOpenResetPasswordConfirmationDialog(true);
    e.preventDefault();
    await resetPassword(token, password);
  };

  const toggleDialog = () => {
    setOpenResetPasswordConfirmationDialog((prev) => !prev);
  };
  return (
    <AuthPageLayout>
      <div className="reset-password__body">
        <div className="reset-password__title">Create New Password</div>
        {/* <p className="reset-password__info">
          Please enter your valid email address to receive a reset link.
        </p> */}
        <form onSubmit={handleSubmit} className="reset-password__form">
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            name="repassword"
            placeholder="Confirm Password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />

          <Button
            title="Reset Password"
            className="primary-button"
            type="submit"
          />
        </form>
      </div>

      {openResetPasswordConfirmationDialog &&
        status === "Password has been successfully reset" && (
          <Dialog
            title="Your password has been updated"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>Your Trexo password was successfully reset.</p>
            </div>
            <div className="dialog__actions">
              <button className="secondary-button" onClick={toggleDialog}>
                OK
              </button>
              <Link to={PATH.LOGIN}>
                <button className="primary-button">Login</button>
              </Link>
            </div>
          </Dialog>
        )}

      {openResetPasswordConfirmationDialog &&
        status === "Password can not be the same as your previous one." && (
          <Dialog
            title="Reset Password Failed"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>{status}</p>
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

export default ResetPassword;
