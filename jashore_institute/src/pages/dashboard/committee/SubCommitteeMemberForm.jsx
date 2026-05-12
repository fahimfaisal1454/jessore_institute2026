import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function SubCommitteeMemberForm() {
  // =========================
  // FORM STATE
  // =========================
  const [form, setForm] = useState({
    member_role: "",
    member_name: "",
    member_number: "",
    order: 0,
    image: null,
  });

  // =========================
  // DATA STATE
  // =========================
  const [subCommittees, setSubCommittees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  // =========================
  // FILTER + SEARCH STATE
  // =========================
  const [selectedSubCommittee, setSelectedSubCommittee] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // EDIT STATE
  // =========================
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // =========================
  // FETCH SUB COMMITTEES
  // =========================
  const fetchSubCommittees = () => {
    AxiosInstance.get("admin/committee/subcommittees/")
      .then((res) => setSubCommittees(res.data))
      .catch(console.error);
  };

  // =========================
  // FETCH CATEGORIES
  // =========================
  const fetchCategories = () => {
    AxiosInstance.get("admin/committee/sub-categories/")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  };

  // =========================
  // FETCH MEMBERS
  // =========================
  const fetchMembers = () => {
    AxiosInstance.get("admin/committee/sub-members/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSubCommittees();
    fetchCategories();
    fetchMembers();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // =========================
  // FILTERED CATEGORIES
  // =========================
  const filteredCategories = categories.filter(
    (cat) => String(cat.subcommittee) === String(selectedSubCommittee),
  );

  // =========================
  // SUBMIT MEMBER
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("category", selectedCategory);

    fd.append("member_role", form.member_role);

    fd.append("member_name", form.member_name);

    fd.append("member_number", form.member_number);

    fd.append("order", form.order);

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    const request = editingId
      ? AxiosInstance.patch(`admin/committee/sub-members/${editingId}/`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      : AxiosInstance.post("admin/committee/sub-members/", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

    request
      .then(() => {
        fetchMembers();
        resetForm();
      })
      .catch(console.error);
  };

  // =========================
  // EDIT MEMBER
  // =========================
  const handleEdit = (item) => {
    setEditingId(item.id);

    const categoryObj = categories.find((cat) => cat.id === item.category);

    if (categoryObj) {
      setSelectedSubCommittee(categoryObj.subcommittee);

      setSelectedCategory(item.category);
    }

    setExistingImage(item.image || "");

    setForm({
      member_role: item.member_role,
      member_name: item.member_name,
      member_number: item.member_number || "",
      order: item.order,
      image: null,
    });
  };

  // =========================
  // DELETE MEMBER
  // =========================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this member?")) return;

    AxiosInstance.delete(`admin/committee/sub-members/${id}/`)
      .then(fetchMembers)
      .catch(console.error);
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      member_role: "",
      member_name: "",
      member_number: "",
      order: 0,
      image: null,
    });

    setEditingId(null);

    setExistingImage("");
  };

  // =========================
  // FILTER MEMBERS
  // =========================
  const filteredMembers = data.filter((member) => {
    const category = categories.find((cat) => cat.id === member.category);

    const subMatch =
      !selectedSubCommittee ||
      String(category?.subcommittee) === String(selectedSubCommittee);

    const catMatch =
      !selectedCategory || String(member.category) === String(selectedCategory);

    const searchMatch = member.member_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return subMatch && catMatch && searchMatch;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-8">
        Sub Committee Members Management
      </h2>

      {/* ========================= */}
      {/* MEMBER FORM */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-md border p-6 mb-10">
        <h3 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Sub Committee Member" : "Add Sub Committee Member"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <select
            value={selectedSubCommittee}
            onChange={(e) => {
              setSelectedSubCommittee(e.target.value);

              setSelectedCategory("");
            }}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Sub Committee</option>

            {subCommittees.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Category</option>

            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="member_role"
            value={form.member_role}
            onChange={handleChange}
            placeholder="Member Role"
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="member_name"
            value={form.member_name}
            onChange={handleChange}
            placeholder="Member Name"
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="member_number"
            value={form.member_number}
            onChange={handleChange}
            placeholder="Membership Number"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            placeholder="Display Order"
            className="border p-3 rounded-lg"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {(form.image || existingImage) && (
            <div>
              <img
                src={
                  form.image ? URL.createObjectURL(form.image) : existingImage
                }
                alt="Preview"
                className="w-28 h-32 object-cover rounded-lg border"
              />
            </div>
          )}

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {editingId ? "Update Member" : "Save Member"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ========================= */}
      {/* FILTER SECTION */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-md border p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Filter Members</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedSubCommittee}
            onChange={(e) => {
              setSelectedSubCommittee(e.target.value);
              setSelectedCategory("");
            }}
            className="border p-3 rounded-lg"
          >
            <option value="">All Sub Committees</option>

            {subCommittees.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All Categories</option>

            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search member by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* MEMBERS TABLE */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h3 className="text-xl font-semibold mb-6">Existing Members</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Order</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((item, index) => {
                  const category = categories.find(
                    (cat) => cat.id === item.category,
                  );

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border text-center">{index + 1}</td>

                      <td className="p-3 border text-center">
                        {item.image ? (
                          <a href={item.image} target="_blank" rel="noreferrer">
                            <img
                              src={item.image}
                              alt={item.member_name}
                              className="w-14 h-16 object-cover rounded-md border mx-auto hover:scale-105 transition"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>

                      <td className="p-3 border">{item.member_name}</td>

                      <td className="p-3 border">{item.member_role}</td>

                      <td className="p-3 border">{category?.label}</td>

                      <td className="p-3 border text-center">{item.order}</td>

                      <td className="p-3 border text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
