import React from "react";

type ButtonType = {
  title: string;
  disabled?: boolean;
  className: string;
};
function Button(props: ButtonType) {
  return (
    <button className={props.className} disabled={props.disabled}>
      {props.title}
    </button>
  );
}

export default Button;
