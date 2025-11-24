import React from "react";
import { useLogoutMutation, useMeQuery } from "@/features/auth";
import { IoLogOutOutline } from "react-icons/io5";
import * as PATH from "@/config/Path";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { data: user } = useMeQuery();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout().unwrap();
    navigate(PATH.LOGIN);
  };
  return (
    <div className="account__container">
      <div className="account__profile">
        <div className="account__profile-content">
          <div className="account__profile-header">Profile</div>
          <div className="account__profile-details">
            Set your account details
          </div>
        </div>

        <div className="account__profile-content">
          <div className="account__profile-input">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-field disabled"
              value={user?.data.username}
              disabled
            />
          </div>
          <div className="account__profile-input">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input-field disabled"
              value={user?.data.email}
              disabled
            />
          </div>
        </div>
      </div>

      <div
        className="account__logout"
        style={{ marginTop: "2rem" }}
        onClick={() => handleSignOut()}
      >
        {<IoLogOutOutline />} {"Logout"}
      </div>
    </div>
  );
};

export default Account;
