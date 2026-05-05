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
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      {editingId ? "Edit Notice" : "Add Notice"}
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <input
        name="title"
        value={form.title}
        placeholder="Title"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-3 w-full rounded"
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
          className="border p-3 w-full rounded text-sm"
        />
      )}

      {/* TEXT */}
      {form.type === "text" && (
        <textarea
          name="content"
          value={form.content}
          placeholder="Write notice content..."
          onChange={handleChange}
          className="border p-3 w-full rounded min-h-[150px]"
        />
      )}

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="bg-blue-600 text-white px-4 py-3 rounded w-full sm:w-auto">
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
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
    <div className="space-y-4">

      {data.map((n) => (
        <div
          key={n.id}
          className="border bg-white p-4 rounded shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
        >
          <div className="min-w-0 flex-1">
            <p className="font-semibold break-words">
              {n.title}
            </p>

            <p className="text-xs text-gray-500 mb-2">
              {n.date}
            </p>

            {/* FILE */}
            {n.file && (
              <a
                href={n.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm break-words"
              >
                View File
              </a>
            )}

            {/* TEXT */}
            {n.type === "text" && (
              <p className="text-sm mt-2 whitespace-pre-line break-words">
                {n.content}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm w-full sm:w-auto">
            <button
              onClick={() => handleEdit(n)}
              className="text-blue-600 w-full sm:w-auto text-left"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(n.id)}
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