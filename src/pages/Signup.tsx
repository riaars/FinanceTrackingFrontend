import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      signUp(form);
    }
  };

  const isFormValid = () => {
    return true;
  };

  useEffect(() => {
    if (token) {
      navigate(PATH.DASHBOARD);
    }
  }, [signupResponse, navigate]);

  return (
    <form
      action="submit"
      className="container signup__form"
      onSubmit={handleSubmit}
    >
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
        disabled={!isFormValid()}
      />
    </form>
  );
}

export default Signup;
