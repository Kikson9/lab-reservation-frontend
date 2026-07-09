import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    // Phase 3: POST email to Django password reset endpoint
    console.log("Password reset requested for:", email);
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-8">
        {submitted ? (
          /* Success state */
          <div className="text-center">
            {/* Checkmark icon */}
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="text-green-500"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Check your email
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              We've sent a password reset link to{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {email}
              </span>
              . Check your inbox and follow the instructions.
            </p>
            <Link
              to="/login"
              className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 text-center"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          /* Form state */
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-600">LabReserve</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="you@university.edu"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    error
                      ? "border-red-400 dark:border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-150"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
