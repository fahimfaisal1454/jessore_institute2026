import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const VideoForm = () => {
  const [form, setForm] = useState({
    title: "",
    url: "",
    order: 0,
  });

  const [videos, setVideos] = useState([]);

  // ✅ FETCH
  const fetchVideos = async () => {
    try {
      const res = await axios.get("/admin/videos/");
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD VIDEO
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/admin/videos/", {
        ...form,
        order: Number(form.order),
      });

      setForm({
        title: "",
        url: "",
        order: 0,
      });

      fetchVideos();
    } catch (err) {
      console.error("ERROR:", err.response?.data);
    }
  };

  // ✅ CHANGE ORDER (LOCAL)
  const handleOrderChange = (id, value) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, order: Number(value) } : v
      )
    );
  };

  // ✅ SAVE ORDER
  const handleSaveOrder = async (video) => {
    try {
      await axios.patch(`/admin/videos/${video.id}/`, {
        order: video.order,
      });

      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/videos/${id}/`);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

return (
  <FormWrapper title="Video Gallery">
    
    {/* ADD FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded shadow space-y-4"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title (optional)"
        className="w-full border p-3 rounded"
      />

      <input
        name="url"
        value={form.url}
        onChange={handleChange}
        placeholder="YouTube embed URL"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="order"
        value={form.order}
        onChange={handleChange}
        placeholder="Order"
        className="w-full border p-3 rounded"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded w-full sm:w-auto">
        Add Video
      </button>
    </form>

    {/* VIDEO LIST */}
    <div className="mt-6 bg-white p-4 sm:p-6 rounded shadow">
      <h3 className="mb-4 font-semibold">Videos</h3>

      {videos.length === 0 && (
        <p className="text-gray-500">No videos found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border p-4 rounded space-y-3"
          >
            <iframe
              src={video.url}
              className="w-full h-48 rounded"
              title="video"
              allowFullScreen
            />

            {/* ORDER */}
            <input
              type="number"
              value={video.order}
              onChange={(e) =>
                handleOrderChange(video.id, e.target.value)
              }
              className="w-full border p-2 rounded"
            />

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleSaveOrder(video)}
                className="flex-1 bg-blue-500 text-white py-2 rounded text-sm"
              >
                Save
              </button>

              <button
                onClick={() => handleDelete(video.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
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

export default VideoForm;