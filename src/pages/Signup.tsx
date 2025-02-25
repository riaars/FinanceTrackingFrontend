import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators } from "../redux";

function Signup() {
  const dispatch = useDispatch();
  const { signUp } = bindActionCreators(authCreators, dispatch);

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
