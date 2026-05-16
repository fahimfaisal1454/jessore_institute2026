import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function OpenLibertyStagePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    AxiosInstance.get("aboutus/info/open_liberty_stage/")
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto">

      {/* HEADER */}
      <div className="bg-[#0b6b3a] text-white text-center py-3 px-4 font-semibold text-base sm:text-lg rounded-t break-words">
        {data.title}
      </div>

      {/* CONTENT BOX */}
      <div className="bg-white border border-gray-300 p-4 sm:p-6 shadow-sm">

        {/* DYNAMIC HTML CONTENT */}
        <div
          className="max-w-none text-gray-800 break-words leading-relaxed
                     [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
                     [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3
                     [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2
                     [&_p]:mb-4
                     [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-4
                     [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-4
                     [&_li]:mb-2
                     [&_strong]:font-bold
                     [&_em]:italic"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />

      </div>

    </div>
  );
}