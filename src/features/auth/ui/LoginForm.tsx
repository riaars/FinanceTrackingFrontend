import React, { useState } from "react";
import { useLoginMutation } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/schemas/LoginSchema";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import * as PATH from "@/config/Path";

function LoginForm({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const [login, { error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data).unwrap();
      navigate("/");
      onSuccess();
    } catch {
      console.error("Login failed", error);
      onError();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("email")}
          className="input-field"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
        <div>
          {errors.email && (
            <small className="error-input">{errors.email.message}</small>
          )}
        </div>
      </div>
      <div>
        <div className="password-input-wrapper">
          <input
            {...register("password")}
            className="input-field"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <div>
          {errors.password && (
            <small className="error-input">{errors.password.message}</small>
          )}
        </div>
      </div>
      <Link to={PATH.FORGOT_PASSWORD} className="forgot-password">
        <p>Forgot Password?</p>
      </Link>
      <Button
        type="submit"
        title={isSubmitting ? "Logging in..." : "Login"}
        className="primary-button"
        disabled={isSubmitting}
      />
    </form>
  );
}

export default LoginForm;
