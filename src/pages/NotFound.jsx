import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Big 404 number */}
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back home */}
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
