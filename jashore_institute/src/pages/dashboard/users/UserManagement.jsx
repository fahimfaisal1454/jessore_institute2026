import { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import {
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaUserShield,
  FaUserPlus,
  FaKey,
} from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resetPasswords, setResetPasswords] = useState({});
  const [showResetPasswords, setShowResetPasswords] = useState({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "member",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("users/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("users/create/", form);

      setForm({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "member",
      });

      fetchUsers();
      alert("User created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`users/${id}/role/`, { role });
      fetchUsers();
      alert("Role updated successfully");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Failed to update role"
      );
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`users/${id}/delete/`);
      fetchUsers();
      alert("User deleted successfully");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Failed to delete user"
      );
    }
  };

  const resetPassword = async (id) => {
    const password = resetPasswords[id];

    if (!password || password.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      await axios.patch(
        `users/${id}/reset-password/`,
        {
          password,
        }
      );

      alert("Password reset successful");

      setResetPasswords((prev) => ({
        ...prev,
        [id]: "",
      }));
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Failed to reset password"
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <FaUserShield className="text-3xl text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">
          User Management
        </h2>
      </div>

      {/* CREATE USER */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <FaUserPlus className="text-blue-600 text-xl" />
          <h3 className="text-xl font-semibold text-gray-800">
            Create New User
          </h3>
        </div>

        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-3 rounded-xl"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-3 rounded-xl"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="w-full border p-3 rounded-xl"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <select
            className="w-full border p-3 rounded-xl"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="member">
              Member
            </option>
            <option value="admin">
              Admin
            </option>
            <option value="superadmin">
              Super Admin
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create User"}
          </button>
        </form>
      </div>

      {/* USER LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-6">
          All Users
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">
                  Username
                </th>
                <th className="p-4 text-left">
                  Email
                </th>
                <th className="p-4 text-left">
                  Phone
                </th>
                <th className="p-4 text-left">
                  Role
                </th>
                <th className="p-4 text-left">
                  Reset Password
                </th>
                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    index % 2 === 0
                      ? "bg-gray-50"
                      : "bg-white"
                  }`}
                >
                  <td className="p-4 font-medium">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.email || "-"}
                  </td>

                  <td className="p-4">
                    {user.phone || "-"}
                  </td>

                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRole(
                          user.id,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-lg"
                    >
                      <option value="member">
                        Member
                      </option>
                      <option value="admin">
                        Admin
                      </option>
                      <option value="superadmin">
                        Super Admin
                      </option>
                    </select>
                  </td>

                  {/* RESET PASSWORD */}
                  <td className="p-4">
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <input
                          type={
                            showResetPasswords[
                              user.id
                            ]
                              ? "text"
                              : "password"
                          }
                          placeholder="New Password"
                          className="border p-2 rounded-lg"
                          value={
                            resetPasswords[
                              user.id
                            ] || ""
                          }
                          onChange={(e) =>
                            setResetPasswords(
                              (prev) => ({
                                ...prev,
                                [user.id]:
                                  e.target
                                    .value,
                              })
                            )
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowResetPasswords(
                              (
                                prev
                              ) => ({
                                ...prev,
                                [user.id]:
                                  !prev[
                                    user.id
                                  ],
                              })
                            )
                          }
                          className="absolute right-2 top-3 text-gray-500"
                        >
                          {showResetPasswords[
                            user.id
                          ] ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          resetPassword(
                            user.id
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaKey />
                        Reset
                      </button>
                    </div>
                  </td>

                  {/* DELETE */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}