import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function getStatusBadge(status) {
  if (status === "Confirmed") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
        Confirmed
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

function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchMyReservations();
  }, []);

  function fetchMyReservations() {
    api
      .get("/reservations/")
      .then((response) => {
        // Filter to only this logged in student's own reservations
        const mine = response.data.filter((r) => r.user === user.id);
        setReservations(mine);
      })
      .catch(() => {
        toast.error("Failed to load your reservations");
      });
  }

  function handleCancel(id) {
    api
      .patch(`/reservations/${id}/`, { status: "Cancelled" })
      .then(() => {
        toast.success("Reservation cancelled");
        fetchMyReservations();
      })
      .catch(() => {
        toast.error("Failed to cancel reservation");
      });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            My Reservations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and manage your lab bookings
          </p>
        </div>
        <Link
          to="/student/browse-labs"
          className="mt-4 sm:mt-0 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition duration-150"
        >
          + Book a Seat
        </Link>
      </div>

      {/* Empty state or table */}
      {reservations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="text-blue-600"
              viewBox="0 0 16 16"
            >
              <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            No reservations yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            You haven't booked any lab seats yet. Browse available labs to get
            started.
          </p>
          <Link
            to="/student/browse-labs"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition duration-150"
          >
            Browse Labs
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
                <tr>
                  <th className="px-4 py-3 text-left">Lab</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                      {r.lab_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.reservation_date}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.reservation_time}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(r.status)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleCancel(r.id)}
                        disabled={r.status === "Cancelled"}
                        className={`text-sm font-medium ${
                          r.status === "Cancelled"
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-red-400 hover:text-red-500"
                        }`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
