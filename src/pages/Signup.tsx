import React from "react";

function Signup() {
  return (
    <form action="submit">
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
      <input type="text" placeholder="re-password" />
      <button>Sign up</button>
    </form>
  );
}

export default Signup;
