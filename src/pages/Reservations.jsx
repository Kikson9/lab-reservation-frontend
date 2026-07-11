import React, { useState } from "react";
import toast from "react-hot-toast";

// Static placeholder data I will replace this with real API data
const labOptions = ["Room 101", "Room 203", "Room 305", "Room 102"];
const userOptions = [
  "Daniel Okike",
  "Adu Ahenkan",
  "Sixtus John",
  "Ben Hassan",
];

const initialReservations = [
  {
    id: 1,
    student: "Daniel Okike",
    lab: "Room 101",
    date: "2026-05-20",
    time: "09:00",
    status: "Active",
  },
  {
    id: 2,
    student: "Adu Ahenkan",
    lab: "Room 203",
    date: "2026-05-20",
    time: "11:00",
    status: "Pending",
  },
  {
    id: 3,
    student: "Sixtus John",
    lab: "Room 305",
    date: "2026-05-19",
    time: "14:00",
    status: "Cancelled",
  },
  {
    id: 4,
    student: "Ben Hassan",
    lab: "Room 102",
    date: "2026-05-21",
    time: "08:00",
    status: "Active",
  },
];

// Status badge - three possible states this time
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

function Reservations() {
  const [reservations, setReservations] = useState(initialReservations);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    student: userOptions[0],
    lab: labOptions[0],
    date: "",
    time: "",
    status: "Pending",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReservations = reservations.filter(
    (r) =>
      r.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lab.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleAddClick() {
    setEditingReservation(null);
    setFormData({
      student: userOptions[0],
      lab: labOptions[0],
      date: "",
      time: "",
      status: "Pending",
    });
    setModalOpen(true);
  }

  function handleEditClick(reservation) {
    setEditingReservation(reservation);
    setFormData({
      student: reservation.student,
      lab: reservation.lab,
      date: reservation.date,
      time: reservation.time,
      status: reservation.status,
    });
    setModalOpen(true);
  }

  // Cancel just updates the status - it doesn't delete the record
  // This is important: cancelled reservations should still be visible in history
  function handleCancel(id) {
    setReservations(
      reservations.map((r) =>
        r.id === id ? { ...r, status: "Cancelled" } : r,
      ),
    );
    toast.success("Reservation cancelled");
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    if (editingReservation) {
      setReservations(
        reservations.map((r) =>
          r.id === editingReservation.id ? { ...r, ...formData } : r,
        ),
      );
      toast.success("Reservation updated");
    } else {
      const newReservation = {
        id: reservations.length + 1,
        ...formData,
      };
      setReservations([...reservations, newReservation]);
      toast.success("Reservation created");
    }
    setModalOpen(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Reservations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and manage all lab reservations
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 w-56"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
            </svg>
          </div>
          <button
            onClick={handleAddClick}
            className="btn bg-blue-600 hover:bg-blue-700 text-white"
          >
            + New Reservation
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Lab</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {filteredReservations.map((r) => (
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
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditClick(r)}
                      className="text-blue-600 hover:text-blue-700 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancel(r.id)}
                      disabled={r.status === "Cancelled"}
                      className={`font-medium ${
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
              {filteredReservations.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    No reservations found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {editingReservation ? "Edit Reservation" : "New Reservation"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Student dropdown */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Student
                </label>
                <select
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {userOptions.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lab dropdown */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Lab
                </label>
                <select
                  name="lab"
                  value={formData.lab}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {labOptions.map((lab) => (
                    <option key={lab} value={lab}>
                      {lab}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Status */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {editingReservation ? "Save Changes" : "Save Reservation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservations;
