import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Expense Manager</h1>

      <button>Expense Tracking</button>
      <button>Income Tracking</button>
    </>
  );
}

export default App;
