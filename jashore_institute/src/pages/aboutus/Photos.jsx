import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Photos() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("ছবিঘর");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("aboutus/photos/");

        if (!isMounted) return;

        setImages(res.data?.data || []);
        setTitle(res.data?.title || "ছবিঘর");
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
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          {title}
        </div>

        {/* Gallery */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border p-2 bg-gray-50">
              <img
                src={img.image}
                alt="gallery"
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}