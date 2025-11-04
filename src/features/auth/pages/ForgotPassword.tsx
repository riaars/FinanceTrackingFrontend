import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import AuthPageLayout from "@/layout/AuthPageLayout";
import { useForgotPasswordMutation } from "../api";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from "@/schemas/ForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
  const [forgotPassword, { data, error, isSuccess, isLoading }] =
    useForgotPasswordMutation();
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [openForgotPasswordErrorDialog, setOpenForgotPasswordErrorDialog] =
    useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const email = data.email;
    try {
      await forgotPassword({ email }).unwrap();
    } catch {
      console.error("Forgot password failed", error);
    }
  };

  const toggleDialog = () => {
    setOpenForgotPasswordDialog((prev) => !prev);
  };
  const toggleErrorDialog = () => {
    setOpenForgotPasswordErrorDialog((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setOpenForgotPasswordDialog(true);
    }
  }, [isSuccess, isLoading]);

  useEffect(() => {
    if (error && !isLoading) {
      setOpenForgotPasswordErrorDialog(true);
    }
  }, [error, isLoading]);

  const email = getValues("email");

  let errorMessage = (error as any)?.data.message;

  return (
    <AuthPageLayout>
      <div className="forgot-password__body">
        <div className="forgot-password__title">Forgot Password</div>
        <p className="forgot-password__info">
          Please enter your valid email address to receive a reset link.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password__form"
        >
          <div>
            <input
              {...register("email")}
              className="input-field"
              type="text"
              name="email"
              placeholder="Email"
            />
            <div>
              {errors.email && (
                <small className="error-input">{errors.email.message}</small>
              )}
            </div>
          </div>

          <Button
            title="Send"
            className="primary-button"
            disabled={isSubmitting}
            type="submit"
          />
        </form>
      </div>

      {openForgotPasswordDialog &&
        data?.message === "Reset link send to email" && (
          <Dialog
            title="Reset password link sent!"
            handleCloseDialog={toggleDialog}
          >
            <div className="dialog__content">
              <p>
                We sent the reset link to your email{" "}
                <span className="link">{email}</span>
              </p>

              <p className="forgot-password__info">
                You can check your inbox. This link will expire in 15 minutes.{" "}
              </p>
            </div>
            <div className="dialog__actions">
              <button className="action-button" onClick={toggleDialog}>
                OK
              </button>
            </div>
          </Dialog>
        )}

      {openForgotPasswordErrorDialog && errorMessage === "User not found" && (
        <Dialog
          title="Reset password is not successful!"
          handleCloseDialog={toggleDialog}
        >
          <div className="dialog__content">
            <p>
              Oops! The email <span className="link">{email}</span> is not
              registered in our system.
            </p>
          </div>
          <div className="dialog__actions">
            <button className="action-button" onClick={toggleErrorDialog}>
              OK
            </button>
          </div>
        </Dialog>
      )}
    </AuthPageLayout>
  );
};

export default ForgotPassword;
