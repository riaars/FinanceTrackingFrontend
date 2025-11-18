import { useChangePasswordMutation } from "@/features/auth";
import PasswordInput from "@/features/auth/ui/PasswordInput";
import React, { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword({ oldPassword, newPassword }).unwrap();
  };

  return (
    <div className="change-password__form">
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
      </form>
    </div>
  );
};

export default Password;
