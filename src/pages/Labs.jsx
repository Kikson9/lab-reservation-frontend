import React, { useState, useEffect } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import toast from "react-hot-toast";
import api from "../axios";

// Helper: decide badge color based on availability
function getStatusBadge(status) {
  if (status === "Full") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
        Full
      </span>
    );
  } else if (status === "Almost Full") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">
        Almost Full
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
        Open
      </span>
    );
  }
}

function Labs() {
  const [labs, setLabs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const [formData, setFormData] = useState({
    room_number: "",
    total_seats: "",
    available_seats: "",
  });
  const [modalErrors, setModalErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [labToDelete, setLabToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLabs();
  }, []);

  function fetchLabs() {
    api
      .get("/labs/")
      .then((response) => {
        setLabs(response.data);
      })
      .catch((error) => {
        toast.error("Failed to load labs");
      });
  }

  const filteredLabs = labs.filter((lab) =>
    lab.room_number.toString().includes(searchTerm),
  );

  // Open modal for adding a new lab
  function handleAddClick() {
    setEditingLab(null);
    setFormData({ room_number: "", total_seats: "", available_seats: "" });
    setModalErrors({});
    setModalOpen(true);
  }

  // Open modal pre-filled for editing
  function handleEditClick(lab) {
    setEditingLab(lab);
    setFormData({
      room_number: lab.room_number,
      total_seats: lab.total_seats,
      available_seats: lab.available_seats,
    });
    setModalErrors({});
    setModalOpen(true);
  }

  // Delete a lab by id
  function handleDeleteClick(lab) {
    setLabToDelete(lab);
    setConfirmOpen(true);
  }

  function handleDeleteConfirm() {
    api
      .delete(`/labs/${labToDelete.id}/`)
      .then(() => {
        toast.success("Lab deleted");
        fetchLabs();
        setConfirmOpen(false);
        setLabToDelete(null);
      })
      .catch(() => {
        toast.error("Failed to delete lab");
        setConfirmOpen(false);
        setLabToDelete(null);
      });
  }

  // Handle form input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Save - either update existing or add new
  function validate() {
    const newErrors = {};

    if (!formData.room_number) {
      newErrors.room_number = "Room number is required.";
    } else if (isNaN(formData.room_number)) {
      newErrors.room_number = "Room number must be a valid number.";
    }

    if (!formData.total_seats) {
      newErrors.total_seats = "Total seats is required.";
    } else if (isNaN(formData.total_seats)) {
      newErrors.total_seats = "Total seats must be a valid number.";
    } else if (Number(formData.total_seats) <= 0) {
      newErrors.total_seats = "Total seats must be greater than 0.";
    }

    if (!formData.available_seats && formData.available_seats !== 0) {
      newErrors.available_seats = "Available seats is required.";
    } else if (isNaN(formData.available_seats)) {
      newErrors.available_seats = "Available seats must be a valid number.";
    } else if (Number(formData.available_seats) < 0) {
      newErrors.available_seats = "Available seats cannot be negative.";
    } else if (
      Number(formData.available_seats) > Number(formData.total_seats)
    ) {
      newErrors.available_seats = "Available seats cannot exceed total seats.";
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

    const payload = {
      room_number: Number(formData.room_number),
      total_seats: Number(formData.total_seats),
      available_seats: Number(formData.available_seats),
    };

    if (editingLab) {
      api
        .put(`/labs/${editingLab.id}/`, payload)
        .then(() => {
          toast.success("Lab updated successfully");
          fetchLabs();
          setModalOpen(false);
        })
        .catch(() => {
          toast.error("Failed to update lab");
        });
    } else {
      api
        .post("/labs/", payload)
        .then(() => {
          toast.success("Lab added successfully");
          fetchLabs();
          setModalOpen(false);
        })
        .catch(() => {
          toast.error("Failed to add lab");
        });
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Labs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your laboratory rooms
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 w-48"
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
          {/* Add button */}
          <button
            onClick={handleAddClick}
            className="btn bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add Lab
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            {/* Table head */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
              <tr>
                <th className="px-4 py-3 text-left">Room No.</th>
                <th className="px-4 py-3 text-center">Total Seats</th>
                <th className="px-4 py-3 text-center">Available</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {filteredLabs.map((lab) => (
                <tr key={lab.id}>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    Room {lab.room_number}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                    {lab.total_seats}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                    {lab.available_seats}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(lab.status)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditClick(lab)}
                      className="text-blue-600 hover:text-blue-700 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(lab)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLabs.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    {searchTerm
                      ? `No labs found matching "${searchTerm}"`
                      : 'No labs yet. Click "+ Add Lab" to create one.'}
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
              {editingLab ? "Edit Lab" : "Add New Lab"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Room Number
                </label>
                <input
                  type="number"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.room_number
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.room_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.room_number}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="total_seats"
                  value={formData.total_seats}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.total_seats
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.total_seats && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.total_seats}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="available_seats"
                  value={formData.available_seats}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.available_seats
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.available_seats && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.available_seats}
                  </p>
                )}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setModalErrors({});
                  setModalOpen(false);
                }}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {editingLab ? "Save Changes" : "Save Lab"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Lab?"
        message={`${labToDelete?.room_number} will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        confirmStyle="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setConfirmOpen(false);
          setLabToDelete(null);
        }}
      />
    </div>
  );
}

export default Labs;
