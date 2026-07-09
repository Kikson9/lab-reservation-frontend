import React from "react";
import { Link } from "react-router-dom";

// API point — replace with axios.get('/api/reservations/my/') in useEffect
const myReservations = [
  {
    id: 1,
    lab: "Room 101",
    date: "2025-06-01",
    time: "09:00",
    status: "Active",
  },
  {
    id: 2,
    lab: "Room 203",
    date: "2025-06-03",
    time: "11:00",
    status: "Pending",
  },
  {
    id: 3,
    lab: "Room 305",
    date: "2025-05-19",
    time: "14:00",
    status: "Cancelled",
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

function StudentDashboard() {
  // Derive stats directly from the data
  // API point — in Phase 3 these calculate from real API response
  const activeCount = myReservations.filter(
    (r) => r.status === "Active",
  ).length;
  const pendingCount = myReservations.filter(
    (r) => r.status === "Pending",
  ).length;
  const totalCount = myReservations.length;

  // Only show non-cancelled, max 3
  const upcoming = myReservations
    .filter((r) => r.status !== "Cancelled")
    .slice(0, 3);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div>
          {/* Phase 3: replace "Student" with real logged in user's name */}
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Welcome back, Student
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's a summary of your lab activity
          </p>
        </div>
        <Link
          to="/student/browse-labs"
          className="mt-4 sm:mt-0 inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition duration-150"
        >
          + Book a Seat
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Active */}
        <div className="col-span-12 sm:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Active
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
            {activeCount}
          </div>
          <div className="text-sm text-gray-500">Active reservations</div>
        </div>

        {/* Pending */}
        <div className="col-span-12 sm:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Pending
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
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {pendingCount}
          </div>
          <div className="text-sm text-gray-500">Awaiting confirmation</div>
        </div>

        {/* Total */}
        <div className="col-span-12 sm:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Total
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
                <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {totalCount}
          </div>
          <div className="text-sm text-gray-500">Total reservations made</div>
        </div>
      </div>

      {/* Upcoming reservations */}
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl mb-6">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            Upcoming Reservations
          </h2>
          <Link
            to="/student/my-reservations"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              You have no upcoming reservations.
            </p>
            <Link
              to="/student/browse-labs"
              className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition duration-150"
            >
              Browse Labs
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
                <tr>
                  <th className="px-4 py-3 text-left">Lab</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {upcoming.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
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
        )}
      </div>

      {/* Quick action banner */}
      <div className="bg-blue-600 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-bold text-lg">Need a lab seat?</h3>
          <p className="text-blue-200 text-sm mt-1">
            Browse available labs and book your seat in seconds.
          </p>
        </div>
        <Link
          to="/student/browse-labs"
          className="shrink-0 px-6 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm rounded-lg transition duration-150"
        >
          Browse Labs
        </Link>
      </div>
    </div>
  );
}

export default StudentDashboard;
