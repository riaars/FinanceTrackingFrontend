import React, { useEffect, useState } from "react";
import { API_URL } from "../config/API";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";

type LoginInputType = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({});

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

  const signIn = async (form: LoginInputType) => {
    const url = `${API_URL}/signIn`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setLogin(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      navigate(PATH.DASHBOARD);
    } catch (error) {
      console.error("error");
    }
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
            className="action-button"
            disabled={!isFormValid()}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
