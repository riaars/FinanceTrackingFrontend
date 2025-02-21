import React, { useState } from "react";

type SignupProps = {
  email: string;
  password: string;
  repassword: string;
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
