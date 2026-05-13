import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

export default function HeroSliderForm() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    order: 0,
    is_active: true,
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // API / MEDIA BASE URL
  // =========================
  const API_BASE =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const BASE_URL = API_BASE.replace(/\/api\/?$/, "/");

  // =========================
  // FETCH SLIDERS
  // =========================
  const fetchSliders = async () => {
    setLoading(true);

    try {
      const res = await AxiosInstance.get("admin/hero-slider/");
      setSliders(res.data || []);
    } catch (error) {
      console.error("Slider fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : type === "checkbox"
        ? checked
        : type === "number"
        ? Number(value)
        : value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      title: "",
      image: null,
      order: 0,
      is_active: true,
    });

    setEditingId(null);

    const fileInput = document.getElementById("slider-image-input");
    if (fileInput) fileInput.value = "";
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("order", formData.order);
      payload.append("is_active", formData.is_active);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (editingId) {
        await AxiosInstance.patch(
          `admin/hero-slider/${editingId}/`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await AxiosInstance.post(
          "admin/hero-slider/",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      resetForm();
      fetchSliders();

    } catch (error) {
      console.error("Submit failed:", error.response?.data || error);
      alert("Failed to save slider.");
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
      title: item.title || "",
      image: null,
      order: item.order || 0,
      is_active: item.is_active,
    });

    const fileInput = document.getElementById("slider-image-input");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slider?"
    );

    if (!confirmDelete) return;

    try {
      await AxiosInstance.delete(`admin/hero-slider/${id}/`);
      fetchSliders();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete slider.");
    }
  };

  // =========================
  // IMAGE URL FIXER
  // =========================
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/fallback.jpg";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BASE_URL}${imagePath.replace(/^\/+/, "")}`;
  };

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}
      <FormWrapper
        title={editingId ? "Update Hero Slider" : "Add Hero Slider"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* TITLE */}
          <div>
            <label className="block font-medium mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter slider title"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block font-medium mb-2">
              Slider Image
            </label>

            <input
              id="slider-image-input"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required={!editingId}
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

          {/* ACTIVE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />

            <label className="font-medium">
              Active Slide
            </label>
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
                ? "Update Slider"
                : "Add Slider"}
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
      {/* LIST */}
      {/* ========================= */}
     <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-x-auto">
  <h2 className="text-3xl font-bold mb-8">
    Hero Slider List
  </h2>

  {loading ? (
    <div className="text-center py-10 text-gray-500">
      Loading...
    </div>
  ) : sliders.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      No sliders added yet.
    </div>
  ) : (
    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-3 text-left">Image</th>
          <th className="border px-4 py-3 text-left">Title</th>
          <th className="border px-4 py-3 text-center">Order</th>
          <th className="border px-4 py-3 text-center">Status</th>
          <th className="border px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {sliders.map((item) => (
          <tr
            key={item.id}
            className="hover:bg-gray-50"
          >
            {/* IMAGE */}
            <td className="border px-4 py-3">
              <img
                src={getImageUrl(item.image)}
                alt={item.title || "Slider"}
                className="w-32 h-20 object-cover rounded-md bg-gray-100"
              />
            </td>

            {/* TITLE */}
            <td className="border px-4 py-3 font-medium">
              {item.title || "No Title"}
            </td>

            {/* ORDER */}
            <td className="border px-4 py-3 text-center">
              {item.order}
            </td>

            {/* STATUS */}
            <td className="border px-4 py-3 text-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </span>
            </td>

            {/* ACTIONS */}
            <td className="border px-4 py-3">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
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