import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function NoticeForm() {
  const [form, setForm] = useState({
    title: "",
    type: "pdf",
    file: null,
    content: "",
    date: "",
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/notices/")
      .then((res) => setData(res.data))
      .catch(console.error);
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

  // 🔥 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("type", form.type);
    fd.append("date", form.date);

    if (form.type === "text") {
      fd.append("content", form.content);
    }

    if (form.file instanceof File) {
      fd.append("file", form.file);
    }

    const request = editingId
      ? AxiosInstance.patch(`admin/notices/${editingId}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : AxiosInstance.post("admin/notices/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        fetchData();
        resetForm();
      })
      .catch(console.error);
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      type: item.type,
      content: item.content || "",
      date: item.date,
      file: null,
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/notices/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // 🔥 RESET
  const resetForm = () => {
    setForm({
      title: "",
      type: "pdf",
      file: null,
      content: "",
      date: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Notice" : "Add Notice"}
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>

        {/* FILE */}
        {(form.type === "pdf" || form.type === "image") && (
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        {/* TEXT */}
        {form.type === "text" && (
          <textarea
            name="content"
            value={form.content}
            placeholder="Write notice content..."
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2">
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* LIST */}
      <div className="space-y-3">

        {data.map((n) => (
          <div
            key={n.id}
            className="border p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-xs text-gray-500">{n.date}</p>

              {/* FILE */}
              {n.file && (
                <a
                  href={n.file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm"
                >
                  View File
                </a>
              )}

              {/* TEXT */}
              {n.type === "text" && (
                <p className="text-sm mt-1">{n.content}</p>
              )}
            </div>

            <div className="flex gap-4 text-sm">
              <button
                onClick={() => handleEdit(n)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(n.id)}
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