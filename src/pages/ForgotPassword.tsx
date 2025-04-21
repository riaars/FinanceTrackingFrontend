import React, { ChangeEvent, useState } from "react";
import AuthPageLayout from "../layout/AuthPageLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <AuthPageLayout>
      <div className="forgot-password__body">
        <div className="forgot-password__title">Forgot Password</div>
        <p className="forgot-password__info">
          Please enter your valid emaill address to receive a reset link.
        </p>
        <form onSubmit={handleSubmit} className="forgot-password__form">
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />

          <Button
            title="Send"
            className="primary-button"
            disabled={!email}
            type="submit"
          />
        </form>
      </div>
    </AuthPageLayout>
  );
};

export default ForgotPassword;
