import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function BookCategoryAdmin() {
  const initialForm = {
    category_code: "",
    category_name: "",
    category_name_bangla: "",
    parent_category: "",
    remarks: "",
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get("admin/book/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const payload = {
        ...formData,
        parent_category: formData.parent_category || null,
      };

      if (editingId) {
        await AxiosInstance.put(`admin/book/categories/${editingId}/`, payload);
      } else {
        await AxiosInstance.post("admin/book/categories/", payload);
      }

      resetForm();
      fetchCategories();
    } catch (err) {
      console.error("Save failed:", err.response?.data || err);
      alert("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      category_code: item.category_code || "",
      category_name: item.category_name || "",
      category_name_bangla: item.category_name_bangla || "",
      parent_category: item.parent_category || "",
      remarks: item.remarks || "",
      is_active: item.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await AxiosInstance.delete(`admin/book/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed.");
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const filteredCategories = categories.filter((item) =>
    [
      item.category_code,
      item.category_name,
      item.category_name_bangla,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg border border-gray-300 p-4 md:p-8 mt-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Book Category" : "Add Book Category"}
        </h1>
        <button
          onClick={resetForm}
          className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Category
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="font-semibold">Category Code *</label>
          <input
            type="text"
            name="category_code"
            value={formData.category_code}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Category Name *</label>
          <input
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Category Name Bangla</label>
          <input
            type="text"
            name="category_name_bangla"
            value={formData.category_name_bangla}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Parent Category</label>
          <select
            name="parent_category"
            value={formData.parent_category}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Main Category</option>
            {categories
              .filter((cat) => cat.id !== editingId)
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_code} - {cat.category_name}
                </option>
              ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="2"
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          <label className="font-semibold">Active</label>
        </div>

        <div className="md:col-span-3 flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {saving ? "Saving..." : editingId ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* SEARCH */}
      <div className="mt-10 mb-4">
        <input
          type="text"
          placeholder="Search category by code or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border p-2 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">Code</th>
              <th className="border p-3">English Name</th>
              <th className="border p-3">Bangla Name</th>
              <th className="border p-3">Parent</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-3">{item.category_code}</td>
                  <td className="border p-3">{item.category_name}</td>
                  <td className="border p-3">{item.category_name_bangla}</td>
                  <td className="border p-3">
                    {categories.find((c) => c.id === item.parent_category)
                      ? `${categories.find((c) => c.id === item.parent_category).category_code} - ${categories.find((c) => c.id === item.parent_category).category_name}`
                      : "Main Category"}
                  </td>
                  <td className="border p-3">
                    {item.is_active ? "Active" : "Inactive"}
                  </td>
                  <td className="border p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
