import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";

function Login() {
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(authCreators, dispatch);
  const { loginResponse } = useSelector((state: State) => state.auth);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
    return form.email !== "" && form.password !== "";
  };

  useEffect(() => {
    if (token) {
      navigate(PATH.DASHBOARD);
    }
  }, [loginResponse, navigate]);

  return (
    <div>
      <div className="container login__form">
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

        <div className="login__form__field">
          <Button
            title="Login"
            className="primary-button"
            disabled={!isFormValid()}
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
