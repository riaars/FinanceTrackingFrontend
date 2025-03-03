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
    <div className="container signup__form">
      <Input
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="email"
        placeholder="email"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="repassword"
        placeholder="re-password"
        value={form.repassword}
        onChange={handleChange}
      />

      <Button
        title="Signup"
        className="primary-button"
        onClick={(e) => handleSubmit(e)}
      />

      {!isFormValid && openUserInputDialog && (
        <Dialog
          title="Incomplete Request"
          handleCloseDialog={() => setOpenUserInputDialog(!openUserInputDialog)}
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
              onClick={() => setOpenSignupErrorDialog(!openSignupErrorDialog)}
            >
              OK
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Signup;
