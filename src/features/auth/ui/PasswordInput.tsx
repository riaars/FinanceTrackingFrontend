import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  className?: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        className={props.className ? props.className : "input-field"}
        type={showPassword ? "text" : "password"}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
