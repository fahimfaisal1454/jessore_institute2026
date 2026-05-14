import { useEffect, useState, useMemo } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Photos() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("ছবিঘর");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

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

  const grouped = useMemo(() => {
    const groups = {};

    images.forEach((img) => {
      const folder = img.category?.trim() || "Uncategorized";

      if (!groups[folder]) groups[folder] = [];

      groups[folder].push(img);
    });

    return groups;
  }, [images]);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

return (
  <div className="max-w-[1200px] mx-auto bg-white border shadow-sm">

    {/* Main Header */}
    <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-4">
      <h1 className="text-2xl sm:text-xl font-bold text-center text-[#0A3B68] break-words">
        {title}
      </h1>
    </div>

    <div className="p-4 sm:p-6">
      {Object.entries(grouped).map(([folder, items]) => (
        <div key={folder} className="mb-10 sm:mb-12">

          {/* Folder Title */}
          <h2 className="text-xl sm:text-lg font-semibold text-[#0A3B68] mb-6 border-b pb-3 text-center break-words">
            📁 {folder}

            <span className="block text-xs text-gray-500 mt-1">
              ({items.length} ছবি)
            </span>
          </h2>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelected(img)}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]"
              >
                <img
                  src={img.image}
                  alt=""
                  className="w-full h-56 sm:h-52 object-cover"
                />
              </button>
            ))}
          </div>

        </div>
      ))}
    </div>

    {/* Modal */}
{selected && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4"
    onClick={() => setSelected(null)}
  >
    <div
      className="relative bg-white rounded-lg overflow-hidden max-w-5xl w-full"
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelected(null)}
        className="absolute top-3 right-3 z-20 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-black"
      >
        ✕
      </button>

      {/* PREVIOUS BUTTON */}
      <button
        onClick={() => {
          const currentIndex = images.findIndex(
            (img) => img.id === selected.id
          );
          const prevIndex =
            currentIndex === 0
              ? images.length - 1
              : currentIndex - 1;
          setSelected(images[prevIndex]);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-black"
      >
        ‹
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={() => {
          const currentIndex = images.findIndex(
            (img) => img.id === selected.id
          );
          const nextIndex =
            currentIndex === images.length - 1
              ? 0
              : currentIndex + 1;
          setSelected(images[nextIndex]);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-black"
      >
        ›
      </button>

      {/* IMAGE */}
      <img
        src={selected.image}
        alt=""
        className="w-full max-h-[85vh] object-contain bg-black"
      />

    </div>
  </div>
)}

  </div>
);
}