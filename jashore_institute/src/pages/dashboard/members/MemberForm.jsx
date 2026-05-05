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
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Members
    </h2>

    {/* FILTER */}
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-3 rounded mb-6 w-full sm:w-auto"
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

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <input
        name="member_no"
        value={form.member_no}
        placeholder="Member No"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <textarea
        name="name"
        value={form.name}
        placeholder="Name + Address"
        onChange={handleChange}
        className="border p-3 w-full rounded min-h-[120px]"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      <select
        name="member_type"
        value={form.member_type}
        onChange={handleChange}
        className="border p-3 w-full rounded"
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
        className="border p-3 w-full rounded"
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-3 w-full rounded text-sm"
      />

      <button className="bg-blue-600 text-white px-4 py-3 rounded w-full sm:w-auto">
        {editId ? "Update" : "Create"}
      </button>

    </form>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {data
        .filter(
          (item) =>
            filter === "all" || item.member_type === filter
        )
        .map((item) => (

          <div
            key={item.id}
            className="border bg-white p-4 rounded shadow-sm text-center"
          >

            <img
              src={getImage(item.image)}
              alt={item.name}
              className="w-24 h-28 mx-auto mb-3 object-cover border rounded"
            />

            <p className="font-semibold text-sm break-words">
              {item.member_no}
            </p>

            <p className="text-xs text-gray-600 capitalize">
              {item.member_type}
            </p>

            <p className="text-xs mt-2 whitespace-pre-line break-words">
              {item.name}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 text-sm w-full sm:w-auto"
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