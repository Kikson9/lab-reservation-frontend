import React from "react";
import { Link } from "react-router-dom";

// API point — replace with axios.get('/api/labs/') in useEffect
const labs = [
  { id: 1, room_number: "Room 101", totalSeats: 30, availableSeats: 22 },
  { id: 2, room_number: "Room 203", totalSeats: 30, availableSeats: 1 },
  { id: 3, room_number: "Room 305", totalSeats: 40, availableSeats: 0 },
  { id: 4, room_number: "Room 102", totalSeats: 25, availableSeats: 25 },
];

// API point — replace with axios.get('/api/users/') in useEffect
const users = [
  {
    id: 1,
    name: "Daniel Okike",
    email: "daniel@university.edu",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "Adu Ahenkan",
    email: "adu@university.edu",
    role: "Student",
    status: "Active",
  },
  {
    id: 3,
    name: "Sixtus John",
    email: "sixtus@university.edu",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Ben Hassan",
    email: "ben@university.edu",
    role: "Student",
    status: "Inactive",
  },
];

// API point — replace with axios.get('/api/reservations/') in useEffect
const reservations = [
  {
    id: 1,
    student: "Daniel Okike",
    lab: "Room 101",
    date: "2025-05-20",
    time: "09:00",
    status: "Active",
  },
  {
    id: 2,
    student: "Adu Ahenkan",
    lab: "Room 203",
    date: "2025-05-20",
    time: "11:00",
    status: "Pending",
  },
  {
    id: 3,
    student: "Sixtus John",
    lab: "Room 305",
    date: "2025-05-19",
    time: "14:00",
    status: "Cancelled",
  },
  {
    id: 4,
    student: "Ben Hassan",
    lab: "Room 102",
    date: "2025-05-21",
    time: "08:00",
    status: "Active",
  },
  {
    id: 5,
    student: "Daniel Okike",
    lab: "Room 101",
    date: "2025-05-22",
    time: "10:00",
    status: "Pending",
  },
];

function getStatusBadge(status) {
  if (status === "Active") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
        Active
      </span>
    );
  } else if (status === "Pending") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">
        Pending
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
        Cancelled
      </span>
    );
  }
}

function Dashboard() {
  // Derive stat numbers from data
  // API point — in Phase 3 these calculate from real API responses
  const totalLabs = labs.length;
  const totalUsers = users.length;
  const activeReservations = reservations.filter(
    (r) => r.status === "Active",
  ).length;
  const availableSeats = labs.reduce((sum, lab) => sum + lab.availableSeats, 0);

  // Most recent 5 reservations
  const recentReservations = reservations.slice(0, 5);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back. Here's what's happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Total Labs */}
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Total Labs
            </div>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-600/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="text-blue-600"
                viewBox="0 0 16 16"
              >
                <path d="M9 2a1 1 0 0 0-2 0v5.293L5.707 9H1a1 1 0 0 0 0 2h5a1 1 0 0 0 .707-.293L8 9.414l1.293 1.293A1 1 0 0 0 10 11h5a1 1 0 1 0 0-2h-4.707L9 7.293V2Z" />
                <path d="M4.23 11.61 2 14.5V15h12v-.5l-2.23-2.89A3 3 0 0 1 10 11H6a3 3 0 0 1-1.77.61Z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {totalLabs}
          </div>
          <div className="text-sm text-gray-500">Active lab rooms</div>
        </div>

        {/* Total Users */}
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Total Users
            </div>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="text-blue-500"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14a6 6 0 1 1 12 0H2Z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {totalUsers}
          </div>
          <div className="text-sm text-gray-500">Registered students</div>
        </div>

        {/* Active Reservations */}
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Active Reservations
            </div>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="text-green-500"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {activeReservations}
          </div>
          <div className="text-sm text-gray-500">Ongoing today</div>
        </div>

        {/* Available Seats */}
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Available Seats
            </div>
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="text-yellow-500"
                viewBox="0 0 16 16"
              >
                <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {availableSeats}
          </div>
          <div className="text-sm text-gray-500">Across all labs</div>
        </div>
      </div>

      {/* Bottom two columns */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lab availability snapshot */}
        <div className="col-span-12 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              Lab Availability
            </h2>
            <Link
              to="/labs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage
            </Link>
          </div>
          <div className="p-5 space-y-4">
            {labs.map((lab) => (
              <div key={lab.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lab.room_number}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        lab.availableSeats === 0
                          ? "bg-red-400"
                          : lab.availableSeats / lab.totalSeats < 0.2
                            ? "bg-yellow-400"
                            : "bg-green-400"
                      }`}
                      style={{
                        width: `${((lab.totalSeats - lab.availableSeats) / lab.totalSeats) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                    {lab.availableSeats}/{lab.totalSeats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reservations */}
        <div className="col-span-12 xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              Recent Reservations
            </h2>
            <Link
              to="/reservations"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Lab</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {recentReservations.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                      {r.student}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.lab}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.date}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.time}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(r.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
