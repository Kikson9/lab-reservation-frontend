import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../axios";

/*
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
*/

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

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [labs, setLabs] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    user: "",
    lab: "",
    reservation_date: "",
    reservation_time: "",
    status: "Pending",
  });
  const [modalErrors, setModalErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Search filter - matches against Django's returned field names
  const filteredReservations = reservations.filter(
    (r) =>
      r.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lab_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    fetchReservations();
    fetchLabs();
    fetchUsers();
  }, []);

  function fetchReservations() {
    api
      .get("/reservations/")
      .then((response) => {
        setReservations(response.data);
      })
      .catch(() => {
        toast.error("Failed to load reservations");
      });
  }

  function fetchLabs() {
    api
      .get("/labs/")
      .then((response) => {
        setLabs(response.data);
      })
      .catch(() => {
        toast.error("Failed to load labs");
      });
  }

  function fetchUsers() {
    api
      .get("/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        toast.error("Failed to load users");
      });
  }

  function handleAddClick() {
    setEditingReservation(null);
    setFormData({
      user: users[0]?.id || "",
      lab: labs[0]?.id || "",
      reservation_date: "",
      reservation_time: "",
      status: "Pending",
    });
    setModalErrors({});
    setModalOpen(true);
  }

  function handleEditClick(reservation) {
    setEditingReservation(reservation);
    setFormData({
      user: reservation.user,
      lab: reservation.lab,
      reservation_date: "",
      reservation_time: "",
      status: reservation.status,
    });
    setModalErrors({});
    setModalOpen(true);
  }

  // Cancel updates status to Cancelled via the API
  // Doesn't delete the record - cancelled reservations stay visible in history
  function handleCancel(id) {
    api
      .patch(`/reservations/${id}/`, { status: "Cancelled" })
      .then(() => {
        toast.success("Reservation cancelled");
        fetchReservations();
        fetchLabs();
      })
      .catch(() => {
        toast.error("Failed to cancel reservation");
      });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (modalErrors[e.target.name]) {
      setModalErrors({ ...modalErrors, [e.target.name]: "" });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.user) {
      newErrors.user = "Please select a student.";
    }

    if (!formData.lab) {
      newErrors.lab = "Please select a lab.";
    }

    if (!formData.reservation_date) {
      newErrors.reservation_date = "Please select a date.";
    }

    if (!formData.reservation_time) {
      newErrors.reservation_time = "Please select a time.";
    }

    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setModalErrors(validationErrors);
      return;
    }
    setModalErrors({});

    // Combining date and time into one ISO datetime string
    const isoDateTime = `${formData.reservation_date}T${formData.reservation_time}:00`;

    const payload = {
      user: formData.user,
      lab: formData.lab,
      reservation_date: isoDateTime,
      status: formData.status,
    };

    if (editingReservation) {
      api
        .put(`/reservations/${editingReservation.id}/`, payload)
        .then(() => {
          toast.success("Reservation updated");
          fetchReservations();
          setModalOpen(false);
        })
        .catch((error) => {
          const errorMsg =
            error.response?.data?.error || "Failed to update reservation";
          toast.error(errorMsg);
        });
    } else {
      api
        .post("/reservations/", payload)
        .then(() => {
          toast.success("Reservation created");
          fetchReservations();
          fetchLabs(); // refresh labs since available_seats changed
          setModalOpen(false);
        })
        .catch((error) => {
          const errorMsg =
            error.response?.data?.error || "Failed to create reservation";
          toast.error(errorMsg);
        });
    }
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
                    {r.user_name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
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
                    {searchTerm
                      ? `No reservations found matching "${searchTerm}"`
                      : 'No reservations yet. Click "+ New Reservation" to create one.'}
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
              {/* Student dropdown - real users from the database */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Student
                </label>
                <select
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.user
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <option value="">Select a student</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name}
                    </option>
                  ))}
                </select>
                {modalErrors.user && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.user}
                  </p>
                )}
              </div>

              {/* Lab dropdown - real labs from the database */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Lab
                </label>
                <select
                  name="lab"
                  value={formData.lab}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.lab
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <option value="">Select a lab</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      Room {lab.room_number}
                    </option>
                  ))}
                </select>
                {modalErrors.lab && (
                  <p className="text-red-500 text-xs mt-1">{modalErrors.lab}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="reservation_date"
                  value={formData.reservation_date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.reservation_date
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.reservation_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.reservation_date}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="reservation_time"
                  value={formData.reservation_time}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.reservation_time
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.reservation_time && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.reservation_time}
                  </p>
                )}
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
                  <option value="Confirmed">Confirmed</option>
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
