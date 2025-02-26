import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils/helpers";

type SignupErrorsFormType = {
  email: string;
  password: string;
  repassword: string;
};

function Signup() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { signUp } = bindActionCreators(authCreators, dispatch);
  const { signupResponse } = useSelector((state: State) => state.auth);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignupForm()) {
      signUp(form);
    } else {
    }
  };

  const validateSignupForm = () => {
    const newErrors: SignupErrorsFormType = {} as SignupErrorsFormType;
    if (form.email === "") {
      newErrors.email = "Email is required";
    } else if (!isEmailValid(form.email)) {
      newErrors.email = "Email is not valid";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password is too short";
    }

    if (form.password !== form.repassword) {
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
    </div>
  );
}

export default Signup;
