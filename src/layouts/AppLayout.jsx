import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function AppLayout() {
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

      {/* Sidebar - always visible */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header - always visible */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content swaps here depending on the URL */}
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
