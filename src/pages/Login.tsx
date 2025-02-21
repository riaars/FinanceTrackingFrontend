import React, { useState } from "react";
import { API_URL } from "../config/API";

type LoginInputType = {
  email: string;
  password: string;
};

type LoginOutputType = {
  message: string;
  token: string;
};
function Login() {
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

      const data = response.json();
      console.log(data);
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
        <div className="login__form__field">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="login__form__field">
          <input
            type="text"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="login__form__field">
          <button className="login__form__button" disabled={!isFormValid()}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
