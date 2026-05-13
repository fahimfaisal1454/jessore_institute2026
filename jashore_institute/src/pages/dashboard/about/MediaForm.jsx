import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

export default function MediaForm() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    information: "",
    link: "",
    description: "",
    order: 0,
  });

  // =========================
  // FETCH MEDIA
  // =========================
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get("admin/media/");
      setMediaList(res.data || []);
    } catch (error) {
      console.error("Media fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      date: "",
      information: "",
      link: "",
      description: "",
      order: 0,
    });
    setEditingId(null);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await AxiosInstance.patch(`admin/media/${editingId}/`, formData);
      } else {
        await AxiosInstance.post("admin/media/", formData);
      }

      resetForm();
      fetchMedia();
    } catch (error) {
      console.error("Submit failed:", error.response?.data || error);
      alert("Failed to save media item.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date || "",
      information: item.information || "",
      link: item.link || "",
      description: item.description || "",
      order: item.order || 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await AxiosInstance.delete(`admin/media/${id}/`);
      fetchMedia();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      {/* ========================= FORM ========================= */}
      <FormWrapper title={editingId ? "Update Media" : "Add Media"}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Information</label>
            <input
              type="text"
              name="information"
              value={formData.information}
              onChange={handleChange}
              required
              placeholder="Enter information title"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter description"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Display Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update Media"
                : "Add Media"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </FormWrapper>

      {/* ========================= TABLE ========================= */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-8">Media List</h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No media items added yet.
          </div>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3">Serial</th>
                <th className="border px-4 py-3">Date</th>
                <th className="border px-4 py-3">Information</th>
                <th className="border px-4 py-3">Link</th>
                <th className="border px-4 py-3">Description</th>
                <th className="border px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {mediaList.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-3 whitespace-nowrap">
                    {item.date}
                  </td>

                  <td className="border px-4 py-3 min-w-[220px]">
                    {item.information}
                  </td>

                  <td className="border px-4 py-3">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        Visit Link
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="border px-4 py-3 min-w-[250px]">
                    {item.description || "-"}
                  </td>

                  <td className="border px-4 py-3">
  <div className="flex justify-center gap-3">
    
    {/* EDIT BUTTON */}
    <button
      onClick={() => handleEdit(item)}
      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
      title="Edit"
    >
      ✏️
    </button>

    {/* DELETE BUTTON */}
    <button
      onClick={() => handleDelete(item.id)}
      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
      title="Delete"
    >
      🗑️
    </button>

  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
