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
  <div className="p-4 sm:p-6 max-w-5xl mx-auto">

    {/* HEADER */}
    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Division CMS
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-4 mb-8"
    >

      {/* CATEGORY + AUTHOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
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
          className="border p-3 rounded"
        />
      </div>

      {/* TITLE */}
      <input
        name="title"
        value={form.title}
        placeholder="Division Title"
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      {/* CONTENT */}
      <textarea
        name="content"
        value={form.content}
        placeholder="Write content..."
        onChange={handleChange}
        className="border p-3 rounded w-full min-h-[180px]"
      />

      {/* IMAGE */}
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-3 rounded w-full text-sm"
      />

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-3 rounded w-full sm:w-auto"
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
            className="bg-gray-400 text-white px-4 py-3 rounded w-full sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>

    </form>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow rounded p-4"
        >

          {/* IMAGE */}
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
          )}

          {/* INFO */}
          <p className="font-bold capitalize break-words">
            {item.category}
          </p>

          <p className="text-sm font-semibold break-words">
            {item.title}
          </p>

          <p className="text-xs text-gray-500 mb-3 break-words">
            {item.author}
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
            <button
              onClick={() => handleEdit(item)}
              className="text-blue-500 w-full sm:w-auto text-left"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 w-full sm:w-auto text-left"
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