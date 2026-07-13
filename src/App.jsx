import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "./css/style.css";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Labs from "./pages/Labs";
import Users from "./pages/Users";
import Reservations from "./pages/Reservations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentLayout from "./layouts/StudentLayout";
import BrowseLabs from "./pages/student/BrowseLabs";
import MyReservations from "./pages/student/MyReservations";
import BookSeat from "./pages/student/BookSeat";
import StudentDashboard from "./pages/student/StudentDashboard";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin pages - protected */}
        <Route element={<ProtectedRoute allowedRole="Admin" />}>
          {/* App pages - wrapped in AppLayout (sidebar + header) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reservations" element={<Reservations />} />
          </Route>
        </Route>

        {/* Student pages - protected */}
        <Route element={<ProtectedRoute allowedRole="Student" />}>
          {/* Student pages - wrapped in StudentLayout */}
          <Route element={<StudentLayout />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/browse-labs" element={<BrowseLabs />} />
            <Route
              path="/student/my-reservations"
              element={<MyReservations />}
            />
            <Route path="/student/book-seat" element={<BookSeat />} />
          </Route>
        </Route>

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
