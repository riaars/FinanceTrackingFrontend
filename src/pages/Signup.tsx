import React, { useState } from "react";
import { API_URL } from "../config/API";

type SignupInputType = {
  email: string;
  password: string;
  repassword: string;
};

type UserType = {
  id: string;
  email: string;
};

type SignupResponseType = {
  message: string;
  token: string;
  user: UserType;
};

function Signup() {
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

  const signUp = async (form: SignupInputType) => {
    const url = `${API_URL}/signUp`;
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
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <form
      action="submit"
      className="container signup__form"
      onSubmit={handleSubmit}
    >
      <div className="signup__form__field">
        <input
          type="text"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="signup__form__field">
        <input
          type="text"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div className="signup__form__field">
        <input
          type="text"
          name="repassword"
          placeholder="re-password"
          value={form.repassword}
          onChange={handleChange}
        />
      </div>
      <div className="signup__form__field">
        <button className="signup__form__button" disabled={!isFormValid()}>
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Signup;
