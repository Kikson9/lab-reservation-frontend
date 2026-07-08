import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar — always visible */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Header — always visible */}
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