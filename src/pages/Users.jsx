import React, { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import toast from "react-hot-toast";

// Static placeholder data I will replace this with real API data

const initialUsers = [
  {
    id: 1,
    name: "Daniel Okike",
    email: "daniel@university.edu",
    role: "Student",
    status: "Active",
    studentId: "9240214001",
  },
  {
    id: 2,
    name: "Adu Ahenkan",
    email: "adu@university.edu",
    role: "Student",
    status: "Active",
    studentId: "9240214002",
  },
  {
    id: 3,
    name: "Sixtus John",
    email: "sixtus@university.edu",
    role: "Admin",
    status: "Active",
    studentId: "",
  },
  {
    id: 4,
    name: "Ben Hassan",
    email: "ben@university.edu",
    role: "Student",
    status: "Inactive",
    studentId: "9240214004",
  },
];

function getRoleBadge(role) {
  return role === "Admin" ? (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
      Admin
    </span>
  ) : (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
      Student
    </span>
  );
}

function getStatusBadge(status) {
  return status === "Active" ? (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
      Active
    </span>
  ) : (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
      Inactive
    </span>
  );
}

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    status: "Active",
    studentId: "",
  });
  const [modalErrors, setModalErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleAddClick() {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "Student",
      status: "Active",
      studentId: "",
    });
    setModalErrors({});
    setModalOpen(true);
  }

  function handleEditClick(user) {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      studentId: user.studentId || "",
    });
    setModalErrors({});
    setModalOpen(true);
  }

  function handleDeleteClick(user) {
    setUserToDelete(user);
    setConfirmOpen(true);
  }

  function handleDeleteConfirm() {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    setConfirmOpen(false);
    setUserToDelete(null);
    toast.success("User deleted");
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.role === "Student") {
      if (!formData.studentId.trim()) {
        newErrors.studentId = "Student ID is required.";
      } else if (formData.studentId.trim().length < 4) {
        newErrors.studentId = "Please enter a valid Student ID.";
      }
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

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user,
        ),
      );
      toast.success("User updated successfully");
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
      toast.success("User added successfully");
    }
    setModalOpen(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Users
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage students and administrators
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
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
          <button
            onClick={handleAddClick}
            className="btn bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Student ID</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {user.role === "Admin" ? (
                      <span className="text-gray-300 dark:text-gray-600 text-xs italic">
                        N/A
                      </span>
                    ) : (
                      user.studentId || (
                        <span className="text-red-400 text-xs">Not set</span>
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-700 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    No users found matching "{searchTerm}"
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
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Daniel Okike"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.name
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.name}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. daniel@university.edu"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.email
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.email}
                  </p>
                )}
              </div>
              {/* Student ID - only for students */}
              {formData.role === "Student" && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. 9240214001"
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      modalErrors.studentId
                        ? "border-red-400"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                  {modalErrors.studentId && (
                    <p className="text-red-500 text-xs mt-1">
                      {modalErrors.studentId}
                    </p>
                  )}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

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
                {editingUser ? "Save Changes" : "Save User"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete User?"
        message={`${userToDelete?.name} will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        confirmStyle="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setConfirmOpen(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
}

export default Users;
