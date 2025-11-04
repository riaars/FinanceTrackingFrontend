import Button from "@/components/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../api";
import { SignupInput, SignupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
function SignupForm({
  onSuccess,
  onError,
}: {
  onSuccess: (email: string) => void;
  onError: (error: any) => void;
}) {
  const [signup, { error }] = useSignupMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
    },
  });
  const onSubmit = async (data: SignupInput) => {
    try {
      await signup(data).unwrap();
      onSuccess(data.email);
    } catch {
      console.error("Signup failed", error);
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("username")}
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
        />
        <div>
          {errors.username && (
            <small className="error-input">{errors.username.message}</small>
          )}
        </div>
      </div>
      <div>
        <input
          {...register("email")}
          type="text"
          name="email"
          placeholder="Email"
          className="input-field"
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
        title={isSubmitting ? "Creating Account" : "Create Account"}
        className="primary-button"
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
}

export default SignupForm;
