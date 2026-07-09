import React, { useState } from "react";

// Static placeholder data I will replace this with real API data

const initialLabs = [
  { id: 1, room_number: "Room 101", totalSeats: 30, availableSeats: 22 },
  { id: 2, room_number: "Room 203", totalSeats: 30, availableSeats: 1 },
  { id: 3, room_number: "Room 305", totalSeats: 40, availableSeats: 0 },
  { id: 4, room_number: "Room 102", totalSeats: 25, availableSeats: 25 },
];

// Helper: decide badge color based on availability
function getStatusBadge(available, total) {
  if (available === 0) {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
        Full
      </span>
    );
  } else if (available / total < 0.2) {
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
  const [labs, setLabs] = useState(initialLabs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const [formData, setFormData] = useState({
    room_number: "",
    totalSeats: "",
    availableSeats: "",
  });
  const [modalErrors, setModalErrors] = useState({});

  // Open modal for adding a new lab
  function handleAddClick() {
    setEditingLab(null);
    setFormData({ room_number: "", totalSeats: "", availableSeats: "" });
    setModalErrors({});
    setModalOpen(true);
  }

  // Open modal pre-filled for editing
  function handleEditClick(lab) {
    setEditingLab(lab);
    setFormData({
      room_number: lab.room_number,
      totalSeats: lab.totalSeats,
      availableSeats: lab.availableSeats,
    });
    setModalErrors({});
    setModalOpen(true);
  }

  // Delete a lab by id
  function handleDelete(id) {
    setLabs(labs.filter((lab) => lab.id !== id));
  }

  // Handle form input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Save - either update existing or add new
  function validate() {
    const newErrors = {};

    if (!formData.room_number.trim()) {
      newErrors.room_number = "Room number is required.";
    }

    if (!formData.totalSeats) {
      newErrors.totalSeats = "Total seats is required.";
    } else if (Number(formData.totalSeats) <= 0) {
      newErrors.totalSeats = "Total seats must be greater than 0.";
    }

    if (!formData.availableSeats && formData.availableSeats !== 0) {
      newErrors.availableSeats = "Available seats is required.";
    } else if (Number(formData.availableSeats) < 0) {
      newErrors.availableSeats = "Available seats cannot be negative.";
    } else if (Number(formData.availableSeats) > Number(formData.totalSeats)) {
      newErrors.availableSeats = "Available seats cannot exceed total seats.";
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

    if (editingLab) {
      setLabs(
        labs.map((lab) =>
          lab.id === editingLab.id
            ? {
                ...lab,
                ...formData,
                totalSeats: Number(formData.totalSeats),
                availableSeats: Number(formData.availableSeats),
              }
            : lab,
        ),
      );
    } else {
      const newLab = {
        id: labs.length + 1,
        room_number: formData.room_number,
        totalSeats: Number(formData.totalSeats),
        availableSeats: Number(formData.availableSeats),
      };
      setLabs([...labs, newLab]);
    }
    setModalOpen(false);
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
        <button
          onClick={handleAddClick}
          className="mt-4 sm:mt-0 btn bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Add Lab
        </button>
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
              {labs.map((lab) => (
                <tr key={lab.id}>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {lab.room_number}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                    {lab.totalSeats}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                    {lab.availableSeats}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(lab.availableSeats, lab.totalSeats)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditClick(lab)}
                      className="text-blue-600 hover:text-blue-700 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lab.id)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  placeholder="e.g. Room 101"
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
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.totalSeats
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.totalSeats && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.totalSeats}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.availableSeats
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.availableSeats && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.availableSeats}
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
    </div>
  );
}

export default Labs;
