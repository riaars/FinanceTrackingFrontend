import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";
import Dialog from "../components/Dialog";
import AccountSwitchLink from "../components/AccountSwitchLink";
import AuthPageLayout from "../layout/AuthPageLayout";
import PasswordInput from "../components/PasswordInput";

function Login() {
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(authCreators, dispatch);
  const { loginRequest, loginResponse, loginError } = useSelector(
    (state: State) => state.auth
  );

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [openLoginErrorDialog, setOpenLoginError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      signIn(form);
      setOpenLoginError(true);
    }
  };

  const isFormValid = () => {
    return form.email !== "" && form.password !== "";
  };

  useEffect(() => {
    if (!loginRequest && loginResponse?.token) {
      navigate(PATH.DASHBOARD);
    }
  }, [loginResponse?.token]);

  return (
    <AuthPageLayout>
      <div className="login__body">
        <div className="login__info">
          <h1>Welcome back</h1>
          <p>
            Log in to your account to continue managing your finances with ease.
          </p>
        </div>
        <div className="login__form">
          <h1>Login</h1>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <Link to={PATH.FORGOT_PASSWORD} className="forgot-password">
            <p>Forgot Password?</p>
          </Link>
          <Button
            title="Login"
            className="primary-button"
            disabled={!isFormValid()}
            onClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
          />
          <AccountSwitchLink source={"Login"} />
        </div>
      </div>

      {!loginRequest && loginError && openLoginErrorDialog && (
        <Dialog
          title="Login Failed"
          handleCloseDialog={() => setOpenLoginError(!openLoginErrorDialog)}
        >
          <div className="dialog__content">
            <p>Oops! Something went wrong on executing your request.</p>
            <span>
              Details:<i>{loginError.message}</i>
            </span>
          </div>
          <div className="dialog__actions">
            <button
              className="primary-button"
              onClick={() => setOpenLoginError(!openLoginErrorDialog)}
            >
              OK
            </button>
          </div>
        </Dialog>
      )}
    </AuthPageLayout>
  );
}

export default Login;
