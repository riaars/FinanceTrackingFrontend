import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators } from "../redux";

function Login() {
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(authCreators, dispatch);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      signIn(form);
    }
  };

  const isFormValid = () => {
    return true;
  };

  return (
    <div>
      <form
        action="submit"
        className="container login__form"
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
          type="text"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="login__form__field">
          <Button
            title="Login"
            className="primary-button"
            disabled={!isFormValid()}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
