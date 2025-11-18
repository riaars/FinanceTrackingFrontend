import React from "react";
import { useLogoutMutation, useMeQuery } from "@/features/auth";
import { IoLogOutOutline } from "react-icons/io5";
import * as PATH from "@/config/Path";
import { useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  const { data: user } = useMeQuery();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout().unwrap();
    navigate(PATH.LOGIN);
  };
  return (
    <div>
      <p>Username: {user?.data.username}</p>
      <p>
        Email: <span className="link">{user?.data.email} </span>{" "}
      </p>

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
