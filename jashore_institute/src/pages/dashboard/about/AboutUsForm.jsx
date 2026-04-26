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
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">About Us</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <select
          name="page_type"
          value={form.page_type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="history">History</option>
          <option value="mission">Mission</option>
        </select>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update"
            : "Save"}
        </button>
      </form>

      {/* LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Saved Data</h3>

        {data.length === 0 && (
          <p className="text-gray-500 text-sm">No data found</p>
        )}

        {data.map((item) => (
          <div
            key={item.id}
            className="border p-3 mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.page_type}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsForm;