import { useState, useEffect } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function OldCommitteeForm() {
  const [form, setForm] = useState({
    year: "",
    order: 0,
    file: null,
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH DATA
  const fetchData = () => {
    AxiosInstance.get("admin/committee/old-docs/")
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.order - b.order);
        setData(sorted);
      })
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

  // 🔥 SUBMIT (CREATE / UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("year", form.year);
    fd.append("order", form.order);

    // ✅ only append file if selected
    if (form.file instanceof File) {
      fd.append("file", form.file);
    }

    // 🔥 UPDATE
    if (editingId) {
      AxiosInstance.patch(
        `admin/committee/old-docs/${editingId}/`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch(console.error);

    } else {
      // 🔥 CREATE
      AxiosInstance.post(
        "admin/committee/old-docs/",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch(console.error);
    }
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      year: item.year,
      order: item.order,
      file: null,
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/committee/old-docs/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // 🔥 RESET FORM
  const resetForm = () => {
    setForm({
      year: "",
      order: 0,
      file: null,
    });
    setEditingId(null);
  };

 return (
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      {editingId ? "Edit PDF" : "Upload PDF"}
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <input
        name="year"
        value={form.year}
        placeholder="Year (e.g. 2000-2001)"
        onChange={handleChange}
        className="border p-3 w-full rounded"
        required
      />

      <input
        type="number"
        name="order"
        value={form.order}
        placeholder="Order"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <input
        type="file"
        name="file"
        onChange={handleChange}
        className="border p-3 w-full rounded text-sm"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="bg-purple-600 text-white px-4 py-3 rounded w-full sm:w-auto">
          {editingId ? "Update" : "Upload"}
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

      {data.map((d) => (
        <div
          key={d.id}
          className="border bg-white p-4 rounded shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div className="min-w-0">
            <p className="font-semibold break-words">
              {d.year}
            </p>

            <a
              href={d.file}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm break-words"
            >
              View PDF
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm w-full sm:w-auto">
            <button
              onClick={() => handleEdit(d)}
              className="text-blue-600 w-full sm:w-auto text-left"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(d.id)}
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