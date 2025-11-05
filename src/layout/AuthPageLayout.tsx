import React from "react";
import Logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
import * as PATH from "@/config/Path";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth__container">
      <div className="auth__header">
        <Link to={PATH.DASHBOARD} className="auth__logo">
          <img className="logo__icon" src={Logo} />
          <h2>Trexo</h2>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AuthPageLayout;
