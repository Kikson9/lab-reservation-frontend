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
    // API POINT - POST email to Django password reset endpoint
    console.log("Password reset requested for:", email);
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL - identical to Login and Signup */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#0F172A] relative overflow-hidden flex-col p-11">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 40%, rgba(15,23,42,0) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />

        {/* Glowing nodes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ top: "11%", left: "60%" }}>
            <div className="relative">
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-500/40 animate-ping" />
              <div
                className="w-2 h-2 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 10px #60A5FA" }}
              />
            </div>
          </div>
          <div className="absolute" style={{ top: "35%", left: "22%" }}>
            <div className="relative">
              <div
                className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-ping"
                style={{ animationDelay: "0.6s" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-blue-300"
                style={{ boxShadow: "0 0 8px #93C5FD" }}
              />
            </div>
          </div>
          <div className="absolute" style={{ top: "50%", left: "70%" }}>
            <div className="relative">
              <div
                className="absolute inset-0 w-2 h-2 rounded-full bg-blue-500/30 animate-ping"
                style={{ animationDelay: "1.2s" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 9px #60A5FA" }}
              />
            </div>
          </div>
          <div className="absolute" style={{ top: "70%", left: "35%" }}>
            <div className="relative">
              <div
                className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-ping"
                style={{ animationDelay: "1.8s" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-blue-300"
                style={{ boxShadow: "0 0 8px #93C5FD" }}
              />
            </div>
          </div>
          <div className="absolute" style={{ top: "25%", left: "44%" }}>
            <div className="relative">
              <div
                className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-ping"
                style={{ animationDelay: "0.9s" }}
              />
              <div
                className="w-1 h-1 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 7px #60A5FA" }}
              />
            </div>
          </div>
        </div>

        {/* Floating cards */}
        <div
          className="absolute z-20"
          style={{
            top: "15%",
            right: "7%",
            animation: "lf1 4s ease-in-out infinite",
          }}
        >
          <div
            className="rounded-xl p-3.5 min-w-[168px]"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Lab Availability
            </p>
            <p className="text-white font-semibold text-xs">Room 101</p>
            <p className="text-slate-400 text-[10.5px] mt-0.5">
              22 of 30 seats available
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                style={{ width: "27%" }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute z-20"
          style={{
            bottom: "25%",
            left: "6%",
            animation: "lf2 4.6s ease-in-out infinite",
          }}
        >
          <div
            className="rounded-xl p-3.5"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              My Reservations
            </p>
            <div className="flex gap-2">
              <span
                className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{
                  background: "rgba(74,222,128,0.15)",
                  color: "#4ADE80",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                2 Active
              </span>
              <span
                className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(96,165,250,0.15)",
                  color: "#60A5FA",
                }}
              >
                1 Pending
              </span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            LabReserve
          </h1>
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.18em] mt-1 font-semibold">
            University Lab System
          </p>
        </div>

        {/* Headline */}
        <div className="relative z-10 my-auto">
          <h2 className="text-[27px] font-bold text-white leading-tight tracking-tight mb-3">
            We've got you
            <br />
            <span className="text-blue-600">covered.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            Reset your password and get back to managing your lab reservations.
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10">
          <ul className="space-y-2.5 mb-6">
            <li className="flex items-center gap-2.5 text-slate-300 text-[12.5px]">
              <div
                className="w-[26px] h-[26px] rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(37,99,235,0.18)",
                  border: "1px solid rgba(59,130,246,0.3)",
                }}
              >
                <svg width="13" height="13" fill="#60A5FA" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </div>
              Real-time seat availability
            </li>
            <li className="flex items-center gap-2.5 text-slate-300 text-[12.5px]">
              <div
                className="w-[26px] h-[26px] rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(37,99,235,0.18)",
                  border: "1px solid rgba(59,130,246,0.3)",
                }}
              >
                <svg width="13" height="13" fill="#60A5FA" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
              Instant booking confirmation
            </li>
            <li className="flex items-center gap-2.5 text-slate-300 text-[12.5px]">
              <div
                className="w-[26px] h-[26px] rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(37,99,235,0.18)",
                  border: "1px solid rgba(59,130,246,0.3)",
                }}
              >
                <svg width="13" height="13" fill="#60A5FA" viewBox="0 0 16 16">
                  <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                </svg>
              </div>
              Manage your reservations
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[330px]">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-extrabold text-blue-600">
              LabReserve
            </h1>
          </div>

          {submitted ? (
            /* Success state */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="text-green-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                We've sent a reset link to
              </p>
              <p className="font-semibold text-gray-700 text-sm mb-6">
                {email}
              </p>
              <Link
                to="/login"
                className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-[9px] transition-all duration-150 hover:shadow-lg hover:shadow-blue-600/25 text-center"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <h2 className="text-[23px] font-bold text-gray-900 mb-1 tracking-tight">
                Forgot password?
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Enter your email and we'll send you a reset link
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
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
                    className={`w-full px-3.5 py-2.5 border-[1.5px] rounded-[9px] text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[3px] focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all ${
                      error ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-[9px] transition-all duration-150 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-px"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lf1 { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-9px) rotate(0deg); } }
        @keyframes lf2 { 0%,100% { transform: translateY(0) rotate(1.5deg); } 50% { transform: translateY(-11px) rotate(0deg); } }
      `}</style>
    </div>
  );
}

export default ForgotPassword;
