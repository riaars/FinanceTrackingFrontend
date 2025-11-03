import React, { useState } from "react";
import Content from "@/layout/Content";
import ChangePasswordDialog from "@/features/auth/ui/ChangePasswordDialog";
import SavingPlans from "@/components/SavingPlans";
import { useMeQuery } from "@/features/auth";

function Settings() {
  const { data: user } = useMeQuery();

  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  const togglePasswordChange = () => {
    setOpenChangePasswordDialog((prev) => !prev);
  };
  return (
    <Content title={"Settings"}>
      <div>
        <h2>Profile</h2>
        <p>Username: {user?.username}</p>
        <p>
          Email: <span className="link">{user?.email} </span>{" "}
        </p>

        <button
          className="primary-button"
          onClick={() => setOpenChangePasswordDialog(true)}
        >
          Change password
        </button>
      </div>

      {/* <MonthlyBudgetForm /> */}
      <SavingPlans />

      {openChangePasswordDialog && (
        <ChangePasswordDialog toggleDialog={togglePasswordChange} />
      )}
    </Content>
  );
}

export default Settings;
