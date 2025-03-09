import React from "react";
import Button from "./Button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="error-fallback-container">
      <p className="error-message__header">Something went wrong:</p>
      <div className="error-message__content">{error.message}</div>
      <Button
        title="Try Again"
        className="secondary-button"
        onClick={resetErrorBoundary}
      />
    </div>
  );
}

export default ErrorFallback;
