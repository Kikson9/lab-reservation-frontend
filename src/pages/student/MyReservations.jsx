import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// API POINT - replace with axios.get('/api/reservations/my/') in useEffect
const initialReservations = [
  
  {
    id: 1,
    lab: 'Room 101',
    date: '2026-05-20',
    time: '09:00',
    status: 'Active',
  },
  {
    id: 2,
    lab: 'Room 203',
    date: '2026-05-22',
    time: '11:00',
    status: 'Pending',
  },
  {
    id: 3,
    lab: 'Room 305',
    date: '2026-05-19',
    time: '14:00',
    status: 'Cancelled',
  },
  
];

function getStatusBadge(status) {
  if (status === 'Active') {
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">Active</span>;
  } else if (status === 'Pending') {
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">Pending</span>;
  } else {
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">Cancelled</span>;
  }
}

function MyReservations() {
  const [reservations, setReservations] = useState(initialReservations);

  function handleCancel(id) {
    // API POINT - replace with:
    // axios.patch(`/api/reservations/${id}/cancel/`)
    //   .then(() => setReservations(reservations.map(r =>
    //     r.id === id ? { ...r, status: 'Cancelled' } : r
    //   )))
    setReservations(reservations.map(r =>
      r.id === id ? { ...r, status: 'Cancelled' } : r
    ));
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
          className="mt-4 sm:mt-0 inline-block px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg transition duration-150"
        >
          + Book a Seat
        </Link>
      </div>

      {/* Empty state or table */}
      {reservations.length === 0 ? (

        /* Empty state */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-12 text-center">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-violet-500" viewBox="0 0 16 16">
              <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            No reservations yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            You haven't booked any lab seats yet. Browse available labs to get started.
          </p>
          <Link
            to="/student/browse-labs"
            className="inline-block px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg transition duration-150"
          >
            Browse Labs
          </Link>
        </div>

      ) : (

        /* Reservations table */
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
                      {r.lab}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {r.date}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray:400">
                      {r.time}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(r.status)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleCancel(r.id)}
                        disabled={r.status === 'Cancelled'}
                        className={`text-sm font-medium ${
                          r.status === 'Cancelled'
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'text-red-400 hover:text-red-500'
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