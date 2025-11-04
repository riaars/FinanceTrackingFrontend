import Button from "@/components/Button";
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from "@/schemas/ResetPasswordSchema";
import React from "react";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../api";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const ResetPasswordForm = ({
  onSuccess,
  onError,
}: {
  onSuccess: (status: string) => void;
  onError: (status: string) => void;
}) => {
  const [resetPassword, { data: resetSuccess, error }] =
    useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      repassword: "",
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);

  const errorStatus = (error as any)?.data?.message || "";

  const onSubmit = async (data: ResetPasswordInput) => {
    const password = data.password;
    try {
      await resetPassword({ token, password }).unwrap();
      onSuccess(
        resetSuccess?.message || "Password has been successfully reset"
      );
    } catch {
      console.error("Reset password failed", error);
      onError(errorStatus);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reset-password__form">
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
      <div>
        <div className="password-input-wrapper">
          <input
            {...register("repassword")}
            className="input-field"
            name="repassword"
            type={showRePassword ? "text" : "password"}
            placeholder="Repassword"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowRePassword((prev) => !prev)}
          >
            {showRePassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <div>
          {errors.repassword && (
            <small className="error-input">{errors.repassword.message}</small>
          )}
        </div>
      </div>
      <Button
        title={isSubmitting ? "Resetting Password" : "Reset Password"}
        className="primary-button"
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ResetPasswordForm;
