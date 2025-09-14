import React from "react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <p className="text-red-500 text-lg font-semibold mb-4">
        {message ?? "Something went wrong!"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
