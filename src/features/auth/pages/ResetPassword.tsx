import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as PATH from "@/config/Path";
import Dialog from "@/components/Dialog";
import AuthPageLayout from "@/layout/AuthPageLayout";
import ResetPasswordForm from "../ui/ResetPasswordForm";

const ResetPassword = () => {
  const [errorsStatus, setErrorStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const [
    openResetPasswordConfirmationDialog,
    setOpenResetPasswordConfirmationDialog,
  ] = useState(false);

  const toggleDialog = () => {
    setOpenResetPasswordConfirmationDialog((prev) => !prev);
  };
  console.log(status);

  return (
    <AuthPageLayout>
      <div className="reset-password__body">
        <div className="reset-password__title">Create New Password</div>
        {/* <p className="reset-password__info">
          Please enter your valid email address to receive a reset link.
        </p> */}

        <ResetPasswordForm
          onSuccess={(message) => {
            setSuccessStatus(message);
            setOpenResetPasswordConfirmationDialog(true);
          }}
          onError={(message) => {
            setErrorStatus(message);
            setOpenResetPasswordConfirmationDialog(true);
          }}
        />
      </div>

      {openResetPasswordConfirmationDialog &&
        successStatus === "Password has been successfully reset" && (
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
                <button className="action-button">Login</button>
              </Link>
            </div>
          </Dialog>
        )}

      {openResetPasswordConfirmationDialog &&
        errorsStatus ===
          "Password can not be the same as your previous one." && (
          <Dialog
            title="Reset Password Failed"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>{status}</p>
            </div>
            <div className="dialog__actions">
              <button className="action-button" onClick={toggleDialog}>
                OK
              </button>
            </div>
          </Dialog>
        )}
    </AuthPageLayout>
  );
};

export default ResetPassword;
