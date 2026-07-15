import React, { useState, useEffect } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import toast from "react-hot-toast";
import api from "../axios";

// Static placeholder data I will replace this with real API data
/*
const initialUsers = [
  {
    id: 1,
    name: "Daniel Okike",
    email: "daniel@university.edu",
    role: "Student",
    status: "Active",
    student_id: "9240214001",
  },
  {
    id: 2,
    name: "Adu Ahenkan",
    email: "adu@university.edu",
    role: "Student",
    status: "Active",
    student_id: "9240214002",
  },
  {
    id: 3,
    name: "Sixtus John",
    email: "sixtus@university.edu",
    role: "Admin",
    status: "Active",
    student_id: "",
  },
  {
    id: 4,
    name: "Ben Hassan",
    email: "ben@university.edu",
    role: "Student",
    status: "Inactive",
    student_id: "9240214004",
  },
];
*/

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
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    role: "Student",
    status: "Active",
    student_id: "",
    password: "",
  });
  const [modalErrors, setModalErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.student_id &&
        user.student_id
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
  );

  function handleAddClick() {
    setEditingUser(null);
    setFormData({
      first_name: "",
      email: "",
      role: "Student",
      status: "Active",
      student_id: "",
      password: "",
    });
    setModalErrors({});
    setModalOpen(true);
  }

  function handleEditClick(user) {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name,
      email: user.email,
      role: user.role,
      status: user.status,
      student_id: user.student_id || "",
    });
    setModalErrors({});
    setModalOpen(true);
  }

  function handleDeleteClick(user) {
    setUserToDelete(user);
    setConfirmOpen(true);
  }

  function handleDeleteConfirm() {
    api
      .delete(`/users/${userToDelete.id}/`)
      .then(() => {
        toast.success("User deleted");
        fetchUsers();
        setConfirmOpen(false);
        setUserToDelete(null);
      })
      .catch(() => {
        toast.error("Failed to delete user");
        setConfirmOpen(false);
        setUserToDelete(null);
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Full name is required.";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "Name must be at least 2 characters.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.role === "Student") {
      if (!formData.student_id.trim()) {
        newErrors.student_id = "Student ID is required.";
      } else if (formData.student_id.trim().length < 4) {
        newErrors.student_id = "Please enter a valid Student ID.";
      }
    }

    // Only require password when adding a new user, not editing
    if (!editingUser) {
      if (!formData.password) {
        newErrors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
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

    const payload = {
      username: formData.email,
      first_name: formData.first_name,
      email: formData.email,
      role: formData.role,
      student_id: formData.role === "Student" ? formData.student_id : null,
      is_active: formData.status === "Active",
      ...(!editingUser && { password: formData.password }),
    };

    if (editingUser) {
      api
        .put(`/users/${editingUser.id}/`, payload)
        .then(() => {
          toast.success("User updated successfully");
          fetchUsers();
          setModalOpen(false);
        })
        .catch(() => {
          toast.error("Failed to update user");
        });
    } else {
      api
        .post("/users/", payload)
        .then(() => {
          toast.success("User added successfully");
          fetchUsers();
          setModalOpen(false);
        })
        .catch(() => {
          toast.error("Failed to add user");
        });
    }
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
                    {user.first_name}
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
                      user.student_id || (
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
                    {searchTerm
                      ? `No users found matching "${searchTerm}"`
                      : 'No users yet. Click "+ Add User" to create one.'}{" "}
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
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="e.g. Daniel Okike"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    modalErrors.first_name
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {modalErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {modalErrors.first_name}
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
              {!editingUser && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Set an initial password"
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      modalErrors.password
                        ? "border-red-400"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                  {modalErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {modalErrors.password}
                    </p>
                  )}
                </div>
              )}
              {/* Student ID - only for students */}
              {formData.role === "Student" && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleChange}
                    placeholder="e.g. 9240214001"
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      modalErrors.student_id
                        ? "border-red-400"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                  {modalErrors.student_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {modalErrors.student_id}
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
        message={`${userToDelete?.first_name} will be permanently removed. This cannot be undone.`}
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
