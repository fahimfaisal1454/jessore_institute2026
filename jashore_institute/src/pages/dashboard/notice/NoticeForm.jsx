import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import { Pencil, Trash2 } from "lucide-react";
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/notices/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // SUBMIT
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

  // EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      type: item.type,
      content: item.content || "",
      date: item.date,
      file: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    AxiosInstance.delete(`admin/notices/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // RESET
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

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-3 sm:p-4">
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        {editingId ? "Edit Notice" : "Add Notice"}
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-6 bg-white border p-4 rounded shadow-sm"
      >
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm"
        >
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>

        {(form.type === "pdf" || form.type === "image") && (
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm"
          />
        )}

        {form.type === "text" && (
          <textarea
            name="content"
            value={form.content}
            placeholder="Write notice content..."
            onChange={handleChange}
            className="border p-2 w-full rounded min-h-[120px] text-sm"
          />
        )}

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm"
          required
        />

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white border rounded shadow-sm overflow-x-auto">
        <table className="w-full min-w-[750px] border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-2 w-[50px]">#</th>
              <th className="border px-2 py-2">Title</th>
              <th className="border px-2 py-2 w-[80px]">Type</th>
              <th className="border px-2 py-2 w-[110px]">Date</th>
              <th className="border px-2 py-2 w-[120px]">File</th>
              <th className="border px-2 py-2 w-[90px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((n, index) => (
              <tr key={n.id} className="hover:bg-gray-50 align-top">
                <td className="border px-2 py-2">
                  {startIndex + index + 1}
                </td>

                <td className="border px-2 py-2 break-words">
                  <p className="font-medium text-sm">{n.title}</p>

                  {n.type === "text" && n.content && (
                    <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">
                      {n.content.length > 80
                        ? `${n.content.slice(0, 80)}...`
                        : n.content}
                    </p>
                  )}
                </td>

                <td className="border px-2 py-2 capitalize text-xs">
                  {n.type}
                </td>

                <td className="border px-2 py-2 text-xs">
                  {n.date}
                </td>

                <td className="border px-2 py-2 text-xs">
                  {n.file ? (
                    <a
                      href={n.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="border px-1 py-2 text-center">
  <div className="flex flex-row justify-center items-center gap-1">
    <button
      type="button"
      onClick={() => handleEdit(n)}
      className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition"
      title="Edit"
    >
      <Pencil size={11} />
    </button>

    <button
      type="button"
      onClick={() => handleDelete(n.id)}
      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
      title="Delete"
    >
      <Trash2 size={11} />
    </button>
  </div>
</td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No notices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4 text-sm">
          <button
            onClick={() =>
              currentPage > 1 && setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              currentPage < totalPages &&
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}