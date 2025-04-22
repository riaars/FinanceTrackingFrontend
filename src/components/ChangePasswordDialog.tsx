import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import PasswordInput from "./PasswordInput";
import { useChangePassword } from "../hooks/useChangePassword";

interface ChangePasswordDialogProps {
  toggleDialog: () => void;
}
const ChangePasswordDialog = ({ toggleDialog }: ChangePasswordDialogProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { changePassword, status } = useChangePassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword(oldPassword, newPassword);
  };

  useEffect(() => {
    if (status === "Password has been successfully updated") {
      toggleDialog();
    }
  }, [status]);
  return (
    <Dialog title="Change Password" handleCloseDialog={toggleDialog}>
      <div className="dialog__content">
        <div className="dialog__content__header"></div>
        <div className="dialog__content__body">
          <form onSubmit={handleSubmit} className="change-password__form">
            <PasswordInput
              name="oldPassword"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <PasswordInput
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordInput
              name="confirmNewPassword"
              placeholder="Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </form>
        </div>

        <div className="dialog__actions">
          <button className="secondary-button" onClick={toggleDialog}>
            Cancel
          </button>
          <button className="primary-button" onClick={handleSubmit}>
            Update Pasword
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangePasswordDialog;
