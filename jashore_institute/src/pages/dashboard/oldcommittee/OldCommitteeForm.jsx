import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import { Pencil, Trash2 } from "lucide-react";

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
  const [filterCategory, setFilterCategory] = useState("");

  // =========================
  // FETCH CATEGORIES
  // =========================
  const fetchCategories = () => {
    AxiosInstance.get("admin/oldcommittee/old-categories/")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  };

  // =========================
  // FETCH MEMBERS
  // =========================
  const fetchData = () => {
    AxiosInstance.get("admin/oldcommittee/old-members/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  // =========================
  // HANDLE FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      category: "",
      name: "",
      year: "",
      image: null,
    });

    setEditId(null);
  };

  // =========================
  // CATEGORY LABEL
  // =========================
  const getCategoryLabel = (category) => {
    return (
      category.type_display ||
      category.get_type_display ||
      category.type_label ||
      category.type
    );
  };

  // =========================
  // SUBMIT FORM
  // =========================
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
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await AxiosInstance.post(
          "admin/oldcommittee/old-members/",
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      fetchData();
      resetForm();

    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      category: item.category,
      name: item.name,
      year: item.year,
      image: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this member?")) return;

    AxiosInstance.delete(`admin/oldcommittee/old-members/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = filterCategory
    ? data.filter(
        (item) => item.category === Number(filterCategory)
      )
    : data;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Old Committee CMS
      </h2>

      {/* =========================
          FORM
      ========================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {getCategoryLabel(c)}
            </option>
          ))}
        </select>

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 w-full rounded"
        />

        {/* YEAR */}
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year (e.g. 2000-2001)"
          className="border p-3 w-full rounded"
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-3 w-full rounded text-sm"
        />

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            {editId ? "Update" : "Create"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* =========================
          FILTER
      ========================= */}
      <div className="mb-6">
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
          className="border p-3 rounded w-full sm:w-auto"
        >
          <option value="">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {getCategoryLabel(c)}
            </option>
          ))}
        </select>
      </div>

      {/* =========================
          TABLE LIST
      ========================= */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-300 text-black font-extrabold">
            <tr>
              <th className="border px-4 py-3">SL</th>
              <th className="border px-4 py-3">ছবি</th>
              <th className="border px-4 py-3">ক্যাটাগরি</th>
              <th className="border px-4 py-3">নাম</th>
              <th className="border px-4 py-3">সাল</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const categoryObj = categories.find(
                  (c) => c.id === item.category
                );

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-center"
                  >
                    {/* SL */}
                    <td className="border px-4 py-3">
                      {index + 1}
                    </td>

                    {/* IMAGE */}
                    <td className="border px-4 py-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mx-auto"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mx-auto text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="border px-4 py-3 font-medium">
                      {categoryObj
                        ? getCategoryLabel(categoryObj)
                        : "-"}
                    </td>

                    {/* NAME */}
                    <td className="border px-4 py-3">
                      {item.name}
                    </td>

                    {/* YEAR */}
                    <td className="border px-4 py-3">
                      {item.year}
                    </td>

                    {/* ACTIONS */}
                    <td className="border px-4 py-3">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No committee members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}