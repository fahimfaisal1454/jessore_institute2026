import React, { useEffect, useState, useMemo } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const folderKey = (v) => {
  const s = typeof v === "string" ? v.trim() : "";
  return s || "Uncategorized";
};

const PhotoForm = () => {
  const [photos, setPhotos] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFolder, setActiveFolder] = useState("All");

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editForm, setEditForm] = useState({
    order: 0,
    category: "",
    image: null,
  });

  // ✅ Fetch Photos
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/photos/");
      const list = Array.isArray(res.data) ? res.data : [];
      list.sort((a, b) => a.order - b.order);
      setPhotos(list);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ✅ Multiple file selection
  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  // ✅ Remove selected file before upload
  const handleRemoveSelected = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Upload multiple photos
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderName.trim()) {
      alert("Please enter folder name");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const item = selectedFiles[i];

        const formData = new FormData();
        formData.append("image", item.file);
        formData.append("order", i);
        formData.append("category", folderName.trim());

        await axios.post("/admin/photos/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSelectedFiles([]);
      setFolderName("");
      fetchPhotos();
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
    }
  };

  // ✅ Delete photo
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      await axios.delete(`/admin/photos/${id}/`);
      fetchPhotos();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err);
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (photo) => {
    setEditingPhoto(photo);
    setEditForm({
      order: photo.order,
      category: photo.category || "",
      image: null,
    });
    setIsModalOpen(true);
  };

  // ✅ Close Edit Modal
  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
    setEditForm({
      order: 0,
      category: "",
      image: null,
    });
  };

  // ✅ Edit input changes
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setEditForm((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Save Edit
  const handleUpdate = async () => {
    if (!editingPhoto) return;

    try {
      const formData = new FormData();
      formData.append("order", Number(editForm.order));
      formData.append("category", editForm.category);

      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      await axios.patch(`/admin/photos/${editingPhoto.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      closeEditModal();
      fetchPhotos();
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
    }
  };

  // ✅ Folder list
  const folders = useMemo(() => {
    const map = new Map();

    photos.forEach((photo) => {
      const key = folderKey(photo.category);
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [photos]);

  // ✅ Filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeFolder === "All") return photos;

    return photos.filter(
      (photo) => folderKey(photo.category) === activeFolder
    );
  }, [photos, activeFolder]);

return (
  <FormWrapper title="Photo Gallery">
    
    {/* Upload Form */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4 max-w-full overflow-hidden"
    >
      <h2 className="text-lg sm:text-xl font-bold">
        📸 Upload Photos
      </h2>

      {/* Folder Name */}
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Folder Name (e.g. Annual Sports Day)"
        className="border p-3 w-full rounded-lg text-sm sm:text-base"
      />

      {/* Multiple File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesSelect}
        className="border p-3 w-full rounded-lg text-sm"
      />

      {/* Preview Selected */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedFiles.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 relative"
            >
              <img
                src={item.preview}
                alt=""
                className="w-full h-24 sm:h-32 object-cover rounded"
              />

              <button
                type="button"
                onClick={() => handleRemoveSelected(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg w-full sm:w-auto">
        Upload Gallery
      </button>
    </form>

    {/* Folder Filters */}
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFolder("All")}
          className={`px-3 py-2 rounded-full text-sm ${
            activeFolder === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All ({photos.length})
        </button>

        {folders.map(([name, count]) => (
          <button
            key={name}
            onClick={() => setActiveFolder(name)}
            className={`px-3 py-2 rounded-full text-sm ${
              activeFolder === name
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {name} ({count})
          </button>
        ))}
      </div>
    </div>

    {/* Photo List */}
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold text-lg">
        Photos
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : filteredPhotos.length === 0 ? (
        <p className="text-gray-500">No photos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="border rounded-lg p-3 flex flex-col"
            >
              <img
                src={photo.image}
                alt=""
                className="w-full h-40 sm:h-32 object-cover rounded"
              />

              <p className="text-xs text-gray-500 mt-2 break-words">
                📁 {folderKey(photo.category)}
              </p>

              <input
                type="number"
                value={photo.order}
                onChange={(e) =>
                  setPhotos((prev) =>
                    prev.map((p) =>
                      p.id === photo.id
                        ? {
                            ...p,
                            order: Number(e.target.value),
                          }
                        : p
                    )
                  )
                }
                className="w-full mt-2 border p-2 rounded text-sm"
              />

              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <button
                  onClick={() => openEditModal(photo)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(photo.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Edit Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">
            Edit Photo
          </h3>

          <input
            type="number"
            name="order"
            value={editForm.order}
            onChange={handleEditChange}
            placeholder="Order"
            className="border p-3 w-full rounded mb-3"
          />

          <input
            type="text"
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            placeholder="Folder Name"
            className="border p-3 w-full rounded mb-3"
          />

          <input
            type="file"
            name="image"
            onChange={handleEditChange}
            className="mb-4 w-full text-sm"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={closeEditModal}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </FormWrapper>
);
};

export default PhotoForm;