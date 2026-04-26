import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const PhotoForm = () => {
  const [image, setImage] = useState(null);
  const [order, setOrder] = useState(0);
  const [photos, setPhotos] = useState([]);

  // ✅ FETCH PHOTOS
  const fetchPhotos = async () => {
    try {
      const res = await axios.get("/admin/photos/");
      setPhotos(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ✅ UPLOAD PHOTO (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("order", Number(order));

    try {
      await axios.post("/admin/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ FIX FOR 415 ERROR
        },
      });

      setImage(null);
      setOrder(0);
      fetchPhotos();
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
    }
  };

  // ✅ CHANGE ORDER (LOCAL STATE)
  const handleChangeOrder = (id, value) => {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, order: Number(value) } : p
      )
    );
  };

  // ✅ SAVE ORDER (PATCH)
  const handleSaveOrder = async (photo) => {
    try {
      await axios.patch(`/admin/photos/${photo.id}/`, {
        order: photo.order,
      });

      fetchPhotos();
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/photos/${id}/`);
      fetchPhotos();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err);
    }
  };

  return (
    <FormWrapper title="Photo Gallery">

      {/* 🔼 UPLOAD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Order"
          className="border p-2 w-full rounded"
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {/* 📸 LIST */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="mb-4 font-semibold">Photos</h3>

        {photos.length === 0 && (
          <p className="text-gray-500">No photos found</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="border p-2 rounded">

              <img
                src={photo.image}
                alt=""
                className="w-full h-32 object-cover rounded"
              />

              {/* ORDER INPUT */}
              <input
                type="number"
                value={photo.order}
                onChange={(e) =>
                  handleChangeOrder(photo.id, e.target.value)
                }
                className="w-full mt-2 border p-1 rounded"
              />

              {/* BUTTONS */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleSaveOrder(photo)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded text-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => handleDelete(photo.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </FormWrapper>
  );
};

export default PhotoForm;