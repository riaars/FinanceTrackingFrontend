import React from "react";
import { Link } from "react-router-dom";
import * as PATH from "../config/Path";

interface AccountSwitchLinkProps {
  source: "Login" | "Signup";
}
const AccountSwitchLink = ({ source }: AccountSwitchLinkProps) => {
  const isLoggedIn = source === "Login";
  const promptText = isLoggedIn
    ? "Don't have an account?"
    : "Have an account? ";
  const linkPath = isLoggedIn ? PATH.SIGNUP : PATH.LOGIN;
  const linkTo = isLoggedIn ? "Sign up" : "Login";

  return (
    <p className="center">
      {promptText}
      <Link to={linkPath} className="link">
        {" "}
        {linkTo}
      </Link>
    </p>
  );
};

export default AccountSwitchLink;
