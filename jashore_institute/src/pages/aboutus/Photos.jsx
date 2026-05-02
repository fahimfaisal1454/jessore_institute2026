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

      {/* Main Header Centered */}
      <div className="bg-[#e9e9e9] border-b px-4 py-4">
        <h1 className="text-3xl font-bold text-center text-[#0A3B68]">
          {title}
        </h1>
      </div>

      <div className="p-6">
        {Object.entries(grouped).map(([folder, items]) => (
          <div key={folder} className="mb-12">

            {/* Folder Title Centered */}
            <h2 className="text-2xl font-semibold text-[#0A3B68] mb-6 border-b pb-3 text-center">
              📁 {folder}
              <span className="block text-sm text-gray-500 mt-1">
                ({items.length} ছবি)
              </span>
            </h2>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelected(img)}
                  className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]"
                >
                  <img
                    src={img.image}
                    alt=""
                    className="w-full h-52 object-cover"
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
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt=""
              className="w-full max-h-[80vh] object-contain bg-black"
            />

            <div className="p-4 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}