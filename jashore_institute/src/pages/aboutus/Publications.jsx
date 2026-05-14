import React, { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Publication() {
  const [publicationData, setPublicationData] = useState([]);
  const [title, setTitle] = useState("প্রকাশনা");
  const [loading, setLoading] = useState(true);

  // =========================
  // API BASE URL
  // =========================
  const API_BASE =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const BASE_URL = API_BASE.replace(/\/api\/?$/, "/");

  // =========================
  // FETCH PUBLICATION DATA
  // =========================
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const res = await AxiosInstance.get("aboutus/publications/");

        setPublicationData(res.data.publications || []);
        setTitle(res.data.title || "প্রকাশনা");

      } catch (error) {
        console.error("Publication fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, []);

  // =========================
  // FILE URL FIX
  // =========================
  const getFileUrl = (filePath) => {
    if (!filePath) return null;

    if (filePath.startsWith("http")) return filePath;

    return `${BASE_URL}${filePath.replace(/^\/+/, "")}`;
  };

  // =========================
  // FILE NAME EXTRACTOR
  // =========================
  const getFileName = (filePath) => {
    if (!filePath) return "-";

    return filePath.split("/").pop();
  };

  // =========================
  // SORT LATEST FIRST
  // =========================
  const sortedData = publicationData
    ? [...publicationData].sort((a, b) => {
        if (a.id && b.id) {
          return b.id - a.id;
        }

        if (a.created_at && b.created_at) {
          return new Date(b.created_at) - new Date(a.created_at);
        }

        return 0;
      })
    : [];

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="bg-white border shadow-sm">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
        <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-center text-sm sm:text-base break-words">
          {title}
        </div>

        {/* ========================= */}
        {/* TABLE */}
        {/* ========================= */}
        <div className="p-3 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-xs sm:text-sm border">

            {/* HEAD */}
            <thead className="bg-[#d9e3ea]">
              <tr>
                <th className="border px-2 sm:px-3 py-2 text-center w-[60px]">
                  ক্রমিক
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center w-[140px]">
                  তারিখ
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center">
                  ফাইল
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center w-[120px]">
                  লিংক
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center">
                  বিবরণ
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((item, i) => (
                  <tr
                    key={item.id || i}
                    className="hover:bg-gray-100 align-middle"
                  >
                    {/* SERIAL */}
                    <td
                      className="border px-2 sm:px-3 py-2 text-center font-semibold"
                      style={{
                        fontFamily:
                          "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
                      }}
                    >
                      {(sortedData.length - i).toLocaleString("bn-BD")}
                    </td>

                    {/* DATE */}
                    <td className="border px-2 sm:px-3 py-2 text-center whitespace-nowrap">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("bn-BN")
                        : "-"}
                    </td>

{/* FILE */}
<td className="border px-2 sm:px-3 py-2 break-words text-center">
  {item.information ? (
    <a
      href={getFileUrl(item.information)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline font-medium"
    >
      ফাইল দেখুন
    </a>
  ) : (
    "-"
  )}
</td>

                    {/* LINK */}
                    <td className="border px-2 sm:px-3 py-2 text-center">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          দেখুন
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="border px-2 sm:px-3 py-2 break-words whitespace-pre-line">
                      {item.description || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500"
                  >
                    কোনো তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}