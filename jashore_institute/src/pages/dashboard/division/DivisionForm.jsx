import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function DivisionForm() {
  const [form, setForm] = useState({
    category: "library",
    title: "",
    author: "",
    content: "",
    image: null,
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA
  const fetchData = () => {
    AxiosInstance.get("admin/divisions/divisions/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔥 SUBMIT (FIXED 415 ERROR)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("category", form.category);
    fd.append("title", form.title);
    fd.append("author", form.author || "");
    fd.append("content", form.content);

    if (form.image) {
      fd.append("image", form.image);
    }

    try {
      if (editId) {
        await AxiosInstance.put(
          `admin/divisions/divisions/${editId}/`,
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await AxiosInstance.post(
          "admin/divisions/divisions/",
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      fetchData();
      resetForm();
    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
    }

    setLoading(false);
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      category: item.category,
      title: item.title,
      author: item.author || "",
      content: item.content,
      image: null,
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/divisions/divisions/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // 🔥 RESET
  const resetForm = () => {
    setEditId(null);
    setForm({
      category: "library",
      title: "",
      author: "",
      content: "",
      image: null,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">
        Division CMS
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-5 space-y-4 mb-8"
      >

        {/* CATEGORY + AUTHOR */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="library">📚 Library</option>
            <option value="sports">⚽ Sports</option>
            <option value="drama">🎭 Drama</option>
            <option value="town">🏙 Town</option>
            <option value="child">🧒 Child</option>
          </select>

          <input
            name="author"
            value={form.author}
            placeholder="Author (optional)"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          placeholder="Division Title"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* CONTENT */}
        <textarea
          name="content"
          value={form.content}
          placeholder="Write content..."
          onChange={handleChange}
          className="border p-2 rounded w-full h-32"
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading
              ? "Saving..."
              : editId
              ? "Update Division"
              : "Create Division"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4">

        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded p-3"
          >

            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                className="h-32 w-full object-cover rounded mb-2"
              />
            )}

            {/* INFO */}
            <p className="font-bold capitalize">
              {item.category}
            </p>

            <p className="text-sm font-semibold">
              {item.title}
            </p>

            <p className="text-xs text-gray-500 mb-2">
              {item.author}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-between text-sm">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}