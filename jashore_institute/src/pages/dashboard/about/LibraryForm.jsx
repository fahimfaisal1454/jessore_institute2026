import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function LibraryForm() {
  const [form, setForm] = useState({
    library_name: "",
    library_address: "",
    library_details: "",
    order: 0,
  });

  const [libraries, setLibraries] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // FETCH LIBRARIES
  const fetchLibraries = () => {
    AxiosInstance.get("admin/libraries/")
      .then((res) => {
        let data = res.data;

        if (data?.results) {
          data = data.results;
        }

        setLibraries(Array.isArray(data) ? data : []);
      })
      .catch((err) =>
        console.error("Library fetch error:", err)
      );
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const request = editingId
      ? AxiosInstance.patch(
          `admin/libraries/${editingId}/`,
          form
        )
      : AxiosInstance.post(
          "admin/libraries/",
          form
        );

    request
      .then(() => {
        fetchLibraries();
        resetForm();
      })
      .catch((err) =>
        console.error("Library save error:", err)
      );
  };

  // EDIT
  const handleEdit = (library) => {
    setEditingId(library.id);

    setForm({
      library_name: library.library_name || "",
      library_address: library.library_address || "",
      library_details: library.library_details || "",
      order: library.order || 0,
    });
  };

  // DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/libraries/${id}/`)
      .then(() => fetchLibraries())
      .catch((err) =>
        console.error("Library delete error:", err)
      );
  };

  // RESET
  const resetForm = () => {
    setForm({
      library_name: "",
      library_address: "",
      library_details: "",
      order: 0,
    });

    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Library" : "Add Library"}
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded shadow-sm p-7 max-w-[700px] space-y-6 mb-10"
      >

        <input
          type="text"
          name="library_name"
          value={form.library_name}
          onChange={handleChange}
          placeholder="Library Name"
          className="border p-4 w-full"
          required
        />

        <textarea
          name="library_address"
          value={form.library_address}
          onChange={handleChange}
          placeholder="Library Address / Website"
          className="border p-4 w-full"
          rows={4}
          required
        />

        <textarea
          name="library_details"
          value={form.library_details}
          onChange={handleChange}
          placeholder="Library Details"
          className="border p-4 w-full"
          rows={6}
          required
        />

        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          className="border p-4 w-full"
          placeholder="Display Order"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3"
          >
            {editingId ? "Update" : "Save"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-8 py-3"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* LIBRARY LIST */}
      <div className="space-y-5">

        {libraries.map((library, index) => (
          <div
            key={library.id}
            className="bg-white border rounded shadow-sm p-5"
          >

            <h3 className="text-xl font-bold">
              {index + 1}. {library.library_name}
            </h3>

            <p className="mt-3 whitespace-pre-line text-gray-800">
              {library.library_address}
            </p>

            <p className="mt-3 whitespace-pre-line text-gray-700 text-sm">
              {library.library_details}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Order: {library.order}
            </p>

            <div className="flex gap-5 mt-4">
              <button
                onClick={() => handleEdit(library)}
                className="text-blue-600 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(library.id)}
                className="text-red-600 font-medium"
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