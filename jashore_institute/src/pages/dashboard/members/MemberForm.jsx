import { useState, useEffect } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function MemberForm() {

  const [form, setForm] = useState({
    member_no: "",
    name: "",
    date: "",
    member_type: "general",
    mobile: "",
    image: null,
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  // 🔥 FETCH DATA
  const fetchData = () => {
    AxiosInstance.get("admin/members/members/")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] })); // ✅ FIX
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== "") {
        fd.append(key, form[key]);
      }
    });

    let request;

    if (editId) {
      request = AxiosInstance.patch(
        `admin/members/members/${editId}/`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      request = AxiosInstance.post(
        "admin/members/members/",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    request
      .then(() => {
        fetchData();
        setEditId(null);

        setForm({
          member_no: "",
          name: "",
          date: "",
          member_type: "general",
          mobile: "",
          image: null,
        });
      })
      .catch(err => console.error("ERROR:", err.response?.data || err));
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      member_no: item.member_no || "",
      name: item.name || "",
      date: item.date || "",
      member_type: item.member_type || "general",
      mobile: item.mobile || "",
      image: null, // keep null for update
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/members/members/${id}/`)
      .then(fetchData)
      .catch(err => console.error(err));
  };

  // 🔥 IMAGE FIX
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/100";

    if (img.startsWith("http")) return img;

    return `http://127.0.0.1:8000${img}`;
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Members</h2>

      {/* 🔥 FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="all">All</option>
        <option value="donor">Donor</option>
        <option value="lifetime">Lifetime</option>
        <option value="general">General</option>
        <option value="library">Library</option>
        <option value="sports">Sports</option>
        <option value="drama">Drama</option>
        <option value="town">Town</option>
        <option value="child">Child</option>
      </select>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          name="member_no"
          value={form.member_no}
          placeholder="Member No"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="name"
          value={form.name}
          placeholder="Name + Address"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="member_type"
          value={form.member_type}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="donor">Donor</option>
          <option value="lifetime">Lifetime</option>
          <option value="general">General</option>
          <option value="library">Library</option>
          <option value="sports">Sports</option>
          <option value="drama">Drama</option>
          <option value="town">Town</option>
          <option value="child">Child</option>
        </select>

        <input
          name="mobile"
          value={form.mobile}
          placeholder="Mobile"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          {editId ? "Update" : "Create"}
        </button>

      </form>

      {/* 🔥 LIST */}
      <div className="grid grid-cols-4 gap-4">

        {data
          .filter(item => filter === "all" || item.member_type === filter)
          .map(item => (

            <div key={item.id} className="border p-3 text-center">

              <img
                src={getImage(item.image)}
                className="w-24 h-28 mx-auto mb-2 object-cover border"
              />

              <p className="font-semibold text-sm">
                {item.member_no}
              </p>

              <p className="text-xs text-gray-600">
                {item.member_type}
              </p>

              <p className="text-xs mt-1 whitespace-pre-line">
                {item.name}
              </p>

              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 text-xs mt-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 text-xs ml-2"
              >
                Delete
              </button>

            </div>

          ))}

      </div>

    </div>
  );
}