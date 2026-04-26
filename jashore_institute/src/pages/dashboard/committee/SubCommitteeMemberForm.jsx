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
    <div className="p-6">

      <h2 className="font-bold mb-4">Sub Committee Members</h2>

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="border p-2 mb-4"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.type}</option>
        ))}
      </select>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="border p-2 w-full" />

        <select name="role_type" value={form.role_type} onChange={handleChange} className="border p-2 w-full">
          <option value="head">Head</option>
          <option value="member">Member</option>
        </select>

        <input type="number" name="order" value={form.order} onChange={handleChange} className="border p-2 w-full" />
        <input type="file" name="image" onChange={handleChange} />

        <button className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-4 gap-4">
        {data.map((m) => (
          <div key={m.id} className="border p-3 text-center">
            <img src={m.image} className="w-20 h-24 mx-auto mb-2" />
            <p>{m.name}</p>
            <p className="text-xs">{m.role}</p>

            <div className="flex gap-2 justify-center mt-2">
              <button onClick={() => handleEdit(m)}>Edit</button>
              <button onClick={() => handleDelete(m.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}