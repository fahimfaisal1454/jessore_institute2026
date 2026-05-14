import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

export default function PublicationForm() {
  const [publicationList, setPublicationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    information: null,
    link: "",
    description: "",
    order: 0,
  });

  // =========================
  // API BASE URL
  // =========================
  const API_BASE =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const BASE_URL = API_BASE.replace(/\/api\/?$/, "/");

  // =========================
  // FETCH PUBLICATIONS
  // =========================
  const fetchPublications = async () => {
    setLoading(true);

    try {
      const res = await AxiosInstance.get("admin/publication/");
      setPublicationList(res.data || []);
    } catch (error) {
      console.error("Publication fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : name === "order"
        ? Number(value)
        : value,
    }));
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setFormData({
      date: "",
      information: null,
      link: "",
      description: "",
      order: 0,
    });

    setEditingId(null);

    const fileInput = document.getElementById("publication-file-input");
    if (fileInput) fileInput.value = "";
  };

  // =========================
  // FILE URL FIX
  // =========================
  const getFileUrl = (filePath) => {
    if (!filePath) return null;

    if (filePath.startsWith("http")) return filePath;

    return `${BASE_URL}${filePath.replace(/^\/+/, "")}`;
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("date", formData.date);
      payload.append("link", formData.link);
      payload.append("description", formData.description);
      payload.append("order", formData.order);

      if (formData.information) {
        payload.append("information", formData.information);
      }

      if (editingId) {
        await AxiosInstance.patch(
          `admin/publication/${editingId}/`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await AxiosInstance.post(
          "admin/publication/",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      resetForm();
      fetchPublications();

    } catch (error) {
      console.error(
        "Submit failed:",
        error.response?.data || error
      );

      alert("Failed to save publication.");
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
      information: null,
      link: item.link || "",
      description: item.description || "",
      order: item.order || 0,
    });

    const fileInput = document.getElementById("publication-file-input");
    if (fileInput) fileInput.value = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this publication?"
      )
    )
      return;

    try {
      await AxiosInstance.delete(
        `admin/publication/${id}/`
      );

      fetchPublications();

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete publication.");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}
      <FormWrapper
        title={
          editingId
            ? "Update Publication"
            : "Add Publication"
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* DATE */}
          <div>
            <label className="block font-medium mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* FILE */}
          <div>
            <label className="block font-medium mb-2">
              Publication File
            </label>

            <input
              id="publication-file-input"
              type="file"
              name="information"
              onChange={handleChange}
              required={!editingId}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* LINK */}
          <div>
            <label className="block font-medium mb-2">
              Link
            </label>

            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter description"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* ORDER */}
          <div>
            <label className="block font-medium mb-2">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update Publication"
                : "Add Publication"}
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

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-8">
          Publication List
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading...
          </div>
        ) : publicationList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No publications added yet.
          </div>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3">Serial</th>
                <th className="border px-4 py-3">Date</th>
                <th className="border px-4 py-3">File</th>
                <th className="border px-4 py-3">Link</th>
                <th className="border px-4 py-3">Description</th>
                <th className="border px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {publicationList.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-4 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-3 whitespace-nowrap">
                    {item.date}
                  </td>

                  <td className="border px-4 py-3">
                    {item.information ? (
                      <a
                        href={getFileUrl(item.information)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      "-"
                    )}
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
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
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