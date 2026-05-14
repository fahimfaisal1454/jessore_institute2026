import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "general",
    serial: "",
    salary: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH EMPLOYEES
  // =========================
  const fetchEmployees = async () => {
    try {
      const res = await AxiosInstance.get("admin/committee/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "general",
      serial: "",
      salary: "",
      image: null,
    });

    setEditingId(null);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    setLoading(true);

    try {
      if (editingId) {
        await AxiosInstance.put(
          `admin/committee/employees/${editingId}/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await AxiosInstance.post(
          "admin/committee/employees/",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      fetchEmployees();
      resetForm();

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      serial: employee.serial,
      salary: employee.salary || "",
      image: null,
    });

    setEditingId(employee.id);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await AxiosInstance.delete(`admin/committee/employees/${id}/`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* FORM */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Employee" : "Add Employee"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="general">সাধারণ বিভাগ</option>
            <option value="library">লাইব্রেরি বিভাগ</option>
            <option value="sports">ক্রীড়া সংসদ</option>
            <option value="drama">নাট্যকলা সংসদ</option>
          </select>

          <input
            type="number"
            name="serial"
            placeholder="Serial"
            value={formData.serial}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Employee"
                : "Add Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

     {/* TABLE */}
<div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto border border-gray-200">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    <h2 className="text-2xl font-bold text-gray-800">
      Employee List
    </h2>

    <input
      type="text"
      placeholder="Search employee..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm uppercase">
        <th className="p-3 text-left">Image</th>
        <th className="p-3 text-left">Serial</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Position</th>
        <th className="p-3 text-left">Department</th>
        <th className="p-3 text-left">Salary</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <tr
            key={employee.id}
            className={`border-b hover:bg-blue-50 transition ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            {/* IMAGE */}
            <td className="p-3">
              {employee.image ? (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-16 h-16 object-cover rounded-lg border shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg text-xs text-gray-500">
                  No Image
                </div>
              )}
            </td>

            {/* SERIAL */}
            <td className="p-3 font-medium text-gray-700">
              {employee.serial}
            </td>

            {/* NAME */}
            <td className="p-3 font-semibold text-gray-800">
              {employee.name}
            </td>

            {/* POSITION */}
            <td className="p-3 text-gray-700">
              {employee.position}
            </td>

            {/* DEPARTMENT */}
            <td className="p-3">
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-medium">
                {employee.department}
              </span>
            </td>

            {/* SALARY */}
            <td className="p-3 text-green-700 font-semibold">
              {employee.salary || "N/A"}
            </td>

            {/* ACTIONS */}
            <td className="p-3">
              <div className="flex justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(employee.id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="text-center py-10 text-gray-500 text-lg"
          >
            No employees found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
      </div>
    </div>
  );
}