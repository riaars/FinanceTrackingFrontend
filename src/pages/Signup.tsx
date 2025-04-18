import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils/helpers";
import Dialog from "../components/Dialog";
import AccountSwitchLink from "../components/AccountSwitchLink";
import Logo from "../assets/images/logo.png";

type SignupErrorsFormType = {
  username: string;
  email: string;
  password: string;
  repassword: string;
};

function Signup() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { signUp } = bindActionCreators(authCreators, dispatch);
  const { signupResponse, signupError } = useSelector(
    (state: State) => state.auth
  );

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [openUserInputDialog, setOpenUserInputDialog] = useState(false);
  const [openSignupErrorDialog, setOpenSignupErrorDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignupForm()) {
      signUp(form);
      setOpenSignupErrorDialog(true);
    } else {
      setOpenUserInputDialog(true);
    }
  };

  const validateSignupForm = () => {
    const newErrors: SignupErrorsFormType = {} as SignupErrorsFormType;
    if (form.username === "") {
      newErrors.username = "Username is required";
    }
    if (form.email === "") {
      newErrors.email = "Email is required";
    } else if (!isEmailValid(form.email)) {
      newErrors.email = "Email is not valid";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password is too short";
    } else if (form.password !== form.repassword) {
      newErrors.repassword = "Password is not match";
    }

    setFormErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (token) {
      navigate(PATH.DASHBOARD);
    }
  }, [signupResponse, navigate]);

  return (
    <div className="signup__container">
      <div className="signup__header">
        <img className="logo__icon" src={Logo} />
        <h2>Trexo</h2>
      </div>
      <div className="signup__body">
        <div className="signup__info">
          <div className="signup__info__logo">
            <h1>Let’s get started with </h1>{" "}
            <h1 className="signup__info__logo name">Trexo</h1>
          </div>

          <p>Create your free account and take control of your finances.</p>
        </div>
        <div className="signup__form">
          <h1>Create Account</h1>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="repassword"
            placeholder="Re-password"
            value={form.repassword}
            onChange={handleChange}
          />

          <Button
            title="Create Account"
            className="primary-button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as React.FormEvent<HTMLFormElement>);
            }}
          />
          <AccountSwitchLink source="Signup" />

          {!isFormValid && openUserInputDialog && (
            <Dialog
              title="Incomplete Request"
              handleCloseDialog={() =>
                setOpenUserInputDialog(!openUserInputDialog)
              }
            >
              <div className="dialog__content">
                <p>
                  Oops! We couldn’t register because some required fields are
                  missing. Please fill in the following:
                </p>
                <ul>
                  {Object.entries(formErrors).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
                <p>
                  Make sure all required fields are completed before submitting.
                </p>
              </div>
              <div className="dialog__actions">
                <button
                  className="primary-button"
                  onClick={() => setOpenUserInputDialog(!openUserInputDialog)}
                >
                  OK
                </button>
              </div>
            </Dialog>
          )}

          {signupError && openSignupErrorDialog && (
            <Dialog
              title="Registration Failed"
              handleCloseDialog={() =>
                setOpenSignupErrorDialog(!openSignupErrorDialog)
              }
            >
              <div className="dialog__content">
                <p>Oops! Something went wrong on registering the user.</p>
                {signupError.message}
              </div>
              <div className="dialog__actions">
                <button
                  className="primary-button"
                  onClick={() =>
                    setOpenSignupErrorDialog(!openSignupErrorDialog)
                  }
                >
                  OK
                </button>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
