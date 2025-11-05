import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as PATH from "@/config/Path";
import Dialog from "@/components/Dialog";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useResetPasswordMutation } from "../api";
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from "@/schemas/ResetPasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Button from "@/components/Button";
import { AuthCode } from "@/utils/Constant";

const ResetPassword = () => {
  const [
    openResetPasswordConfirmationDialog,
    setOpenResetPasswordConfirmationDialog,
  ] = useState(false);
  const [resetPassword, { data: resetSuccess, error, isSuccess, isError }] =
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

  const errorStatus = (error as any)?.data;

  const onSubmit = async (data: ResetPasswordInput) => {
    const password = data.password;
    try {
      await resetPassword({ token, password }).unwrap();
    } catch {
      console.error("Reset password failed", error);
    }
  };

  const toggleDialog = () => {
    setOpenResetPasswordConfirmationDialog((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setOpenResetPasswordConfirmationDialog(true);
    }
  }, [isSuccess, isError]);

  return (
    <AuthPageLayout>
      <div className="reset-password__body">
        <div className="reset-password__title">Create New Password</div>
        <p className="reset-password__info">
          Please enter your valid email address to receive a reset link.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="reset-password__form"
        >
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
                <small className="error-input">
                  {errors.repassword.message}
                </small>
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
      </div>

      {openResetPasswordConfirmationDialog &&
        resetSuccess?.code === AuthCode.PASSWORD_RESET_SUCCESS && (
          <Dialog
            title="Your password has been updated"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>Your Trexo password was successfully reset.</p>
            </div>
            <div className="dialog__actions">
              <button className="secondary-button" onClick={toggleDialog}>
                OK
              </button>
              <Link to={PATH.LOGIN}>
                <button className="action-button">Login</button>
              </Link>
            </div>
          </Dialog>
        )}

      {openResetPasswordConfirmationDialog &&
        errorStatus?.code === AuthCode.SAME_AS_OLD_PASSWORD && (
          <Dialog
            title="Reset Password Failed"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>{errorStatus?.message}</p>
            </div>
            <div className="dialog__actions">
              <button className="action-button" onClick={toggleDialog}>
                OK
              </button>
            </div>
          </Dialog>
        )}
    </AuthPageLayout>
  );
};

export default ResetPassword;
