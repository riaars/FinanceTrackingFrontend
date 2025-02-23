import React, { useState } from "react";
import { API_URL } from "../config/API";
import Button from "../components/Button";
import Input from "../components/Input";

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
      localStorage.setItem("email", data.email);
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
      <Input
        type="text"
        name="repassword"
        placeholder="re-password"
        value={form.repassword}
        onChange={handleChange}
      />

      <Button
        title="Signup"
        className="action-button"
        disabled={!isFormValid()}
      />
    </form>
  );
}

export default Signup;
