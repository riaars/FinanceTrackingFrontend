import React from "react";
import Logo from "@/assets/images/logo.png";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth__container">
      <div className="auth__header">
        <img className="logo__icon" src={Logo} />
        <h2>Trexo</h2>
      </div>
      {children}
    </div>
  );
};

export default AuthPageLayout;
