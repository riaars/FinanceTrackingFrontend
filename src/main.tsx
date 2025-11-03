import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/main.scss";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
import ErrorFallback from "@/components/ErrorFallback";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
