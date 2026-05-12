import React from "react";

export default function DataTable({ title, data }) {
  // =========================
  // BASE URL
  // =========================
  const BASE_URL = import.meta.env.VITE_API_BASE_URL_LOCAL.replace(
    "/api/",
    ""
  );

  // =========================
  // REVERSE DISPLAY ORDER
  // =========================
  const reversedData = data ? [...data].reverse() : [];

  // =========================
  // IMAGE URL FIX
  // =========================
  const getImageUrl = (image) => {
    if (!image) return null;

    // If already full URL
    if (image.startsWith("http")) {
      return image;
    }

    // Relative media path
    return `${BASE_URL}${image}`;
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-white border shadow-sm">

        {/* HEADER */}
        <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-center text-sm sm:text-base break-words">
          {title}
        </div>

        {/* TABLE */}
        <div className="p-3 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[650px] text-xs sm:text-sm border">

            {/* HEAD */}
            <thead className="bg-[#d9e3ea]">
              <tr>
                <th className="border px-2 sm:px-3 py-2 text-center w-[60px]">
                  ক্রমিক
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center">
                  নাম
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center w-[150px]">
                  কার্যকাল
                </th>

                <th className="border px-2 sm:px-3 py-2 text-center w-[80px]">
                  ছবি
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {reversedData.length > 0 ? (
                reversedData.map((item, i) => (
                  <tr
                    key={item.id || i}
                    className="hover:bg-gray-100 align-middle"
                  >
                    {/* SERIAL */}
                    <td className="border px-2 sm:px-3 py-2 text-center">
                      {(i + 1).toLocaleString("bn-BD")}
                    </td>

                    {/* NAME */}
                    <td className="border px-2 sm:px-3 py-2 break-words whitespace-pre-line">
                      {item.name}
                    </td>

                    {/* YEAR */}
                    <td className="border px-2 sm:px-3 py-2 text-center break-words">
                      {item.year}
                    </td>

                    {/* IMAGE */}
                    <td className="border px-2 sm:px-3 py-2 text-center">
                      {item.image ? (
                        <a
                          href={getImageUrl(item.image)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={getImageUrl(item.image)}
                            alt="member"
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover mx-auto rounded cursor-pointer hover:scale-110 transition"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500"
                  >
                    No data available
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