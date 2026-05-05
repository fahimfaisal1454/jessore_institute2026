import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("ভিডিওঘর");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("aboutus/videos/");

        if (!isMounted) return;

        setVideos(res.data?.data || []);
        setTitle(res.data?.title || "ভিডিওঘর");
      } catch (err) {
        if (!isMounted) return;
        setError("ডাটা লোড করা যায়নি");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        Loading...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

 return (
  <div className="max-w-[1100px] mx-auto">
    <div className="bg-white border shadow-sm">

      {/* Header */}
      <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-sm sm:text-base break-words">
        {title}
      </div>

      {/* Video Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="aspect-video rounded overflow-hidden shadow-sm"
          >
            <iframe
              src={video.url}
              title={`video-${video.id}`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}