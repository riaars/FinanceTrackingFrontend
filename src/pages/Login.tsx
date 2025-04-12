import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import * as PATH from "../config/Path";
import Dialog from "../components/Dialog";

function Login() {
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(authCreators, dispatch);
  const { loginResponse, loginError } = useSelector(
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
    if (token) {
      navigate(PATH.DASHBOARD);
    }
  }, [loginResponse]);

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
            onClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
          />
        </div>
      </div>

      {loginError && openLoginErrorDialog && (
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
    </div>
  );
}

export default Login;
