import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
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

    api
      .post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        const { token, user } = response.data;
        login(user, token);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data.error) {
          setErrors({ password: error.response.data.error });
        } else {
          setErrors({ password: "Something went wrong. Please try again." });
        }
      });
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#0F172A] relative overflow-hidden flex-col p-11">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 40%, rgba(15,23,42,0) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />

        {/* Glowing nodes - 5 spread across */}
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

        {/* Floating card 1 - top right, clear of headline */}
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

        {/* Floating card 2 - bottom left, clear of features */}
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

        {/* Top - logo */}
        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            LabReserve
          </h1>
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.18em] mt-1 font-semibold">
            University Lab System
          </p>
        </div>

        {/* Middle - headline, vertically centered */}
        <div className="relative z-10 my-auto">
          <h2 className="text-[27px] font-bold text-white leading-tight tracking-tight mb-3">
            Reserve your lab
            <br />
            seat in <span className="text-blue-600">seconds.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            The smart way to manage university lab reservations.
          </p>
        </div>

        {/* Bottom - features + copyright */}
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

          <h2 className="text-[23px] font-bold text-gray-900 mb-1 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to your account to continue
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                className={`w-full px-3.5 py-2.5 border-[1.5px] rounded-[9px] text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[3px] focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-3.5 py-2.5 pr-10 border-[1.5px] rounded-[9px] text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[3px] focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
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
                  ) : (
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
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
              )}
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-[9px] transition-all duration-150 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-px mt-2"
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes lf1 { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-9px) rotate(0deg); } }
        @keyframes lf2 { 0%,100% { transform: translateY(0) rotate(1.5deg); } 50% { transform: translateY(-11px) rotate(0deg); } }
      `}</style>
    </div>
  );
}

export default Login;
