import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function CommitteeMemberForm() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    role_type: "member",
    order: 0,
    image: null,
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/committee/members/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔥 CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("role_type", form.role_type);
    formData.append("order", form.order);

    // ✅ only send image if changed
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    const request = editingId
      ? AxiosInstance.patch(
          `admin/committee/members/${editingId}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
      : AxiosInstance.post(
          "admin/committee/members/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

    request
      .then(() => {
        fetchData();
        resetForm();
      })
      .catch(console.error);
  };

  // 🔥 EDIT CLICK
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      role: item.role,
      role_type: item.role_type,
      order: item.order,
      image: null, // ⚠️ don't preload image file
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/committee/members/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // 🔥 RESET
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

      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Member" : "Add Member"}
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="role"
          value={form.role}
          placeholder="Role"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select
          name="role_type"
          value={form.role_type}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="head">Head</option>
          <option value="member">Member</option>
        </select>

        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* 🔥 PREVIEW */}
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            className="w-20 h-24 border"
          />
        )}

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2">
            {editingId ? "Update" : "Save"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-4 gap-4">

        {data.map((item) => (
          <div key={item.id} className="border p-3 text-center">

            <img
              src={item.image || "/no-image.png"}
              className="w-20 h-24 mx-auto object-cover mb-2 border"
            />

            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs">{item.role}</p>

            <div className="flex justify-center gap-3 mt-2">

              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 text-sm"
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