import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function SubCommitteeDocumentForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [form, setForm] = useState({
    year: "",
    order: 0,
    file: null,
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔥 LOAD CATEGORIES
  useEffect(() => {
    AxiosInstance.get("admin/committee/sub-categories/")
      .then((res) => {
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  // 🔥 LOAD DOCS
  const fetchDocs = () => {
    if (!selectedCategory) return;

    AxiosInstance.get("admin/committee/sub-docs/")
      .then((res) => {
        const filtered = res.data.filter(
          (d) => d.category === selectedCategory
        );
        setData(filtered.sort((a, b) => a.order - b.order));
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchDocs();
  }, [selectedCategory]);

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
    fd.append("category", selectedCategory);

    if (form.file instanceof File) {
      fd.append("file", form.file);
    }

    const request = editingId
      ? AxiosInstance.patch(
          `admin/committee/sub-docs/${editingId}/`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
      : AxiosInstance.post(
          "admin/committee/sub-docs/",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

    request
      .then(() => {
        fetchDocs();
        resetForm();
      })
      .catch(console.error);
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
    AxiosInstance.delete(`admin/committee/sub-docs/${id}/`)
      .then(fetchDocs)
      .catch(console.error);
  };

  // 🔥 RESET
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
      Sub Committee Old Documents
    </h2>

    {/* CATEGORY SELECT */}
    <div className="mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="border p-3 rounded w-full sm:w-auto"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label || c.type}
          </option>
        ))}
      </select>
    </div>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <input
        name="year"
        value={form.year}
        placeholder="Year (e.g. 2020-2021)"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <input
        type="number"
        name="order"
        value={form.order}
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
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border bg-white p-4 rounded shadow-sm"
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