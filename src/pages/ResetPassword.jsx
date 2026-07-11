import React, { useState } from "react";
import { Link } from "react-router-dom";

function getPasswordStrength(password) {
  if (password.length === 0) return null;
  if (password.length < 6)
    return { label: "Weak", color: "bg-red-400", width: "w-1/3" };
  if (password.length < 10)
    return { label: "Fair", color: "bg-yellow-400", width: "w-2/3" };
  return { label: "Strong", color: "bg-green-400", width: "w-full" };
}

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  }

  function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    // API POINT - replace with:
    // const token = new URLSearchParams(window.location.search).get('token');
    // axios.post('/api/auth/reset-password/', { token, password: formData.password })
    //   .then(() => setSubmitted(true))
    //   .catch(() => setErrors({ password: 'Reset link is invalid or has expired.' }))
    console.log("Password reset submitted:", formData.password);
    setLoading(false);
    setSubmitted(true);
  }

  const eyeOff = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" />
      <path
        fillRule="evenodd"
        d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
      />
    </svg>
  );

  const eyeOn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 border-[1.5px] rounded-[9px] text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[3px] focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL - same as other auth pages */}
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
            Almost there.
            <br />
            <span className="text-blue-600">Set your new password.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            Choose a strong password to keep your account secure.
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
                Password reset successful
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Your password has been updated. You can now sign in with your
                new password.
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
                Reset your password
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Enter your new password below
              </p>

              <div className="space-y-4">
                {/* New password */}
                <div>
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={inputClass("password") + " pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? eyeOff : eyeOn}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                        />
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          passwordStrength.label === "Weak"
                            ? "text-red-400"
                            : passwordStrength.label === "Fair"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {passwordStrength.label} password
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={inputClass("confirmPassword") + " pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? eyeOff : eyeOn}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit */}
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
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
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

export default ResetPassword;
