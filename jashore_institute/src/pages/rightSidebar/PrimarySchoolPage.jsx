import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function PrimarySchoolPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AxiosInstance.get("aboutus/info/primary_school/")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Primary school fetch error:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto">

      {/* 🔥 HEADER */}
      <div className="bg-[#0b6b3a] text-white text-center py-2 font-semibold text-lg rounded-t">
        {data.title}
      </div>

      {/* 🔥 CONTENT */}
      <div className="bg-white border border-gray-300 p-5 shadow-sm">

        <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
          {data.content}
        </div>

      </div>

    </div>
  );
}