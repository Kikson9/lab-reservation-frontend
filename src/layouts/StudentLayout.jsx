import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../partials/StudentSidebar";
import Header from "../partials/Header";
import { Toaster } from "react-hot-toast";

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1E293B",
            color: "#F1F5F9",
            fontSize: "14px",
            borderRadius: "10px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#3B82F6",
              secondary: "#F1F5F9",
            },
          },
        }}
      />
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
