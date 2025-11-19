import { useChangePasswordMutation } from "@/features/auth";
import PasswordInput from "@/features/auth/ui/PasswordInput";
import React, { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, { isLoading, isSuccess, isError }] =
    useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword({ oldPassword, newPassword }).unwrap();
  };

  return (
    <div className="password">
      <div className="password-content">
        <div className="password-header">Change Password</div>
        <div className="password-details">
          Update your password here. Password should be min 6 charachters long.
        </div>
      </div>
      <div className="password-content">
        <form onSubmit={handleSubmit}>
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
          <button className="primary-button" type="submit" disabled={isLoading}>
            Update Pasword
          </button>

          {isSuccess && (
            <div className="success-response">
              Password change is successful
            </div>
          )}

          {isError && (
            <div className="error-response">Failed to update your password</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Password;
