import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = 'default' }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close on Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Persist sidebar expanded state
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === 'v2'
            ? 'border-r border-gray-200 dark:border-gray-700/60'
            : 'rounded-r-2xl shadow-xs'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button (mobile) */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo / App name */}
          <NavLink end to="/" className="block">
            <span className="text-violet-500 font-bold text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              LabReserve
            </span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Navigation</span>
            </h3>

            <ul className="mt-3">

              {/* Dashboard */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                pathname === '/' && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              }`}>
                <NavLink end to="/" className={`block truncate transition duration-150 ${
                  pathname === '/' ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname === '/' ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M2 6.575V13h4V9h4v4h4V6.575L8 1.19 2 6.575Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Labs */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                pathname.includes('labs') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              }`}>
                <NavLink end to="/labs" className={`block truncate transition duration-150 ${
                  pathname.includes('labs') ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('labs') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M9 2a1 1 0 0 0-2 0v5.293L5.707 9H1a1 1 0 0 0 0 2h5a1 1 0 0 0 .707-.293L8 9.414l1.293 1.293A1 1 0 0 0 10 11h5a1 1 0 1 0 0-2h-4.707L9 7.293V2Z"/>
                      <path d="M4.23 11.61 2 14.5V15h12v-.5l-2.23-2.89A3 3 0 0 1 10 11H6a3 3 0 0 1-1.77.61Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Labs
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Users */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                pathname.includes('users') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              }`}>
                <NavLink end to="/users" className={`block truncate transition duration-150 ${
                  pathname.includes('users') ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('users') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14a6 6 0 1 1 12 0H2Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Users
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Reservations */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                pathname.includes('reservations') && 'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              }`}>
                <NavLink end to="/reservations" className={`block truncate transition duration-150 ${
                  pathname.includes('reservations') ? 'text-violet-500' : 'text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('reservations') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Reservations
                    </span>
                  </div>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;