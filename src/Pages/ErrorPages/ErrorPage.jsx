import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-bold text-error mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-500 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
