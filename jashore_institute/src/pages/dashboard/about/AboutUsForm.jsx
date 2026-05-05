import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";

const AboutUsForm = () => {
  const [form, setForm] = useState({
    page_type: "history",
    title: "",
    content: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await axios.get("/admin/aboutus/");
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ SUBMIT (CREATE OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`/admin/aboutus/${editingId}/`, form);
      } else {
        // CREATE
        await axios.post("/admin/aboutus/", form);
      }

      setForm({ page_type: "history", title: "", content: "" });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Submit error:", err);
    }

    setLoading(false);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/aboutus/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ EDIT (LOAD DATA INTO FORM)
  const handleEdit = (item) => {
    setForm({
      page_type: item.page_type,
      title: item.title,
      content: item.content,
    });
    setEditingId(item.id);
  };

return (
  <div className="p-4 sm:p-6 space-y-6">
    <h2 className="text-xl font-bold">About Us</h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 sm:p-6 rounded shadow"
    >
      <select
        name="page_type"
        value={form.page_type}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="history">History</option>
        <option value="mission">Mission</option>
      </select>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        className="w-full border p-3 rounded min-h-[150px]"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        {loading
          ? "Saving..."
          : editingId
          ? "Update"
          : "Save"}
      </button>
    </form>

    {/* LIST */}
    <div className="bg-white p-4 sm:p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Saved Data</h3>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm">No data found</p>
      )}

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <div>
              <p className="font-bold break-words">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.page_type}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default AboutUsForm;