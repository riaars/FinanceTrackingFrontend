import React, { useState } from "react";

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
