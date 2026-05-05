import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function SubCommitteeMemberForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    role_type: "member",
    order: 0,
    image: null,
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔥 LOAD CATEGORIES
  useEffect(() => {
    AxiosInstance.get("admin/committee/sub-categories/")
      .then((res) => {
        setCategories(res.data);
        if (res.data.length) setSelectedCategory(res.data[0].id);
      });
  }, []);

  // 🔥 LOAD MEMBERS
  const fetchMembers = () => {
    AxiosInstance.get("admin/committee/sub-members/")
      .then((res) => {
        const filtered = res.data.filter(
          (m) => m.category === selectedCategory
        );
        setData(filtered.sort((a, b) => a.order - b.order));
      });
  };

  useEffect(() => {
    if (selectedCategory) fetchMembers();
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("role_type", form.role_type);
    fd.append("order", form.order);
    fd.append("category", selectedCategory);

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    const req = editingId
      ? AxiosInstance.patch(`admin/committee/sub-members/${editingId}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : AxiosInstance.post("admin/committee/sub-members/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    req.then(() => {
      fetchMembers();
      resetForm();
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      role_type: item.role_type,
      order: item.order,
      image: null,
    });
  };

  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/committee/sub-members/${id}/`).then(fetchMembers);
  };

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      role_type: "member",
      order: 0,
      image: null,
    });
    setEditingId(null);
  };

  return (
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Sub Committee Members
    </h2>

    {/* CATEGORY */}
    <div className="mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="border p-3 rounded w-full sm:w-auto"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.type}
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
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-3 w-full rounded"
      />

      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role"
        className="border p-3 w-full rounded"
      />

      <select
        name="role_type"
        value={form.role_type}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      >
        <option value="head">Head</option>
        <option value="member">Member</option>
      </select>

      <input
        type="number"
        name="order"
        value={form.order}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full text-sm"
      />

      <button className="bg-blue-600 text-white px-4 py-3 rounded w-full sm:w-auto">
        {editingId ? "Update" : "Add"}
      </button>
    </form>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {data.map((m) => (
        <div
          key={m.id}
          className="border bg-white p-4 rounded shadow-sm text-center"
        >
          <img
            src={m.image}
            alt={m.name}
            className="w-24 h-28 mx-auto mb-3 object-cover rounded border"
          />

          <p className="font-semibold break-words">
            {m.name}
          </p>

          <p className="text-sm text-gray-600 break-words">
            {m.role}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
            <button
              onClick={() => handleEdit(m)}
              className="text-blue-600 w-full sm:w-auto"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(m.id)}
              className="text-red-500 w-full sm:w-auto"
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