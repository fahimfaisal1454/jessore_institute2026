import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function JadunathMajumdar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("aboutus/person/");

        if (!isMounted) return;

        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        Loading...
      </div>
    );
  }

  return (
  <div className="max-w-[1100px] mx-auto">
    <div className="bg-white border shadow-sm">

      {/* HEADER */}
      <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-sm sm:text-base break-words">
        {data?.title}
      </div>

      {/* CONTENT */}
      <div
        className="p-4 sm:p-6 space-y-4 text-sm sm:text-[15px] leading-relaxed text-gray-800 break-words overflow-hidden"
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />

    </div>
  </div>
);
}