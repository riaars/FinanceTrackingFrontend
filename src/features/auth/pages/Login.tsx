import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, useNavigate } from "react-router-dom";
import * as PATH from "@/config/Path";
import Dialog from "@/components/Dialog";
import AccountSwitchLink from "../ui/AccountSwitchLink";
import AuthPageLayout from "@/layout/AuthPageLayout";
import PasswordInput from "../ui/PasswordInput";
import { useLoginMutation } from "../api";

interface LoginFormProps {
  email: string;
  password: string;
}
function Login() {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [openLoginErrorDialog, setOpenLoginError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        await login(form).unwrap();
        console.log("Login successful");
        navigate("/"); // if using react-router
      } catch {
        // handled by isError + error below
      }
    }
  };

  const isFormValid = () => {
    const emailValid = /\S+@\S+\.\S+/.test(form.email);
    const passwordValid = form.password.length >= 6;
    return emailValid && passwordValid;
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOpenLoginError(false);
      navigate(PATH.DASHBOARD);
    }
  }, [isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (!isLoading && isError) {
      setOpenLoginError(true);
    }
  }, [isLoading, isError]);

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

      {!isLoading && error && openLoginErrorDialog && (
        <Dialog
          title="Login Failed"
          handleCloseDialog={() => setOpenLoginError(!openLoginErrorDialog)}
        >
          <div className="dialog__content">
            <p>Oops! Something went wrong on executing your request.</p>
            <span>{/* Details:<i>{error.message}</i> */}</span>
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
