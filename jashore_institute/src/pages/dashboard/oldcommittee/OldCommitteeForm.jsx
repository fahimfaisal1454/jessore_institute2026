import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function OldCommitteeForm() {
  const [form, setForm] = useState({
    category: "",
    name: "",
    year: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ NEW (FILTER STATE)
  const [filterCategory, setFilterCategory] = useState("");

  const fetchCategories = () => {
    AxiosInstance.get("admin/oldcommittee/old-categories/")
      .then(res => setCategories(res.data))
      .catch(console.error);
  };

  const fetchData = () => {
    AxiosInstance.get("admin/oldcommittee/old-members/")
      .then(res => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm(prev => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setForm({
      category: "",
      name: "",
      year: "",
      image: null,
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.name || !form.year) {
      alert("All fields required");
      return;
    }

    const fd = new FormData();

    fd.append("category", Number(form.category));
    fd.append("name", form.name);
    fd.append("year", form.year);

    if (form.image) {
      fd.append("image", form.image);
    }

    try {
      if (editId) {
        await AxiosInstance.patch(
          `admin/oldcommittee/old-members/${editId}/`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await AxiosInstance.post(
          "admin/oldcommittee/old-members/",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      fetchData();
      resetForm();

    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      category: item.category,
      name: item.name,
      year: item.year,
      image: null,
    });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this member?")) return;

    AxiosInstance.delete(`admin/oldcommittee/old-members/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // ✅ FILTERED DATA
  const filteredData = filterCategory
    ? data.filter(item => item.category === Number(filterCategory))
    : data;

return (
  <div className="p-4 sm:p-6 max-w-5xl mx-auto">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Old Committee CMS
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded shadow mb-8 space-y-4"
    >

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      >
        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.type}
          </option>
        ))}
      </select>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-3 w-full rounded"
      />

      <input
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year (e.g. 2000-2001)"
        className="border p-3 w-full rounded"
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-3 w-full rounded text-sm"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="bg-blue-600 text-white px-4 py-3 rounded w-full sm:w-auto">
          {editId ? "Update" : "Create"}
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

    {/* FILTER */}
    <div className="mb-6">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border p-3 rounded w-full sm:w-auto"
      >
        <option value="">All Categories</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.type}
          </option>
        ))}
      </select>
    </div>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {filteredData.map((item) => (
        <div
          key={item.id}
          className="border bg-white p-4 text-center rounded shadow-sm"
        >

          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover mb-3 rounded"
            />
          )}

          <p className="font-semibold break-words">
            {item.name}
          </p>

          <p className="text-sm text-gray-500 break-words">
            {item.year}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              onClick={() => handleEdit(item)}
              className="text-blue-600 text-sm w-full sm:w-auto"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 text-sm w-full sm:w-auto"
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