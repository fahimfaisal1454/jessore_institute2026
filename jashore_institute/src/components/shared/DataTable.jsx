import React from "react";

export default function DataTable({ title, data }) {

  // ✅ BASE URL from .env (auto removes /api/)
  const BASE_URL = import.meta.env.VITE_API_BASE_URL_LOCAL.replace('/api/', '/');

  return (
    <div className="max-w-[800px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold text-center">
          {title}
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">

            {/* Head */}
            <thead className="bg-[#d9e3ea]">
              <tr>
                <th className="border px-3 py-2 text-center w-[60px]">ক্রমিক</th>
                <th className="border px-3 py-2 text-center">নাম</th>
                <th className="border px-3 py-2 text-center w-[150px]">কার্যকাল</th>
                <th className="border px-3 py-2 text-center w-[80px]">ছবি</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, i) => (
                  <tr key={item.id || i} className="hover:bg-gray-100">

                    {/* Serial */}
                    <td className="border px-3 py-2 text-center">
                      {i + 1}
                    </td>

                    {/* Name */}
                    <td className="border px-3 py-2">
                      {item.name}
                    </td>

                    {/* Year */}
                    <td className="border px-3 py-2 text-center">
                      {item.year}
                    </td>

<td className="border px-3 py-2 text-center">
  {item.image ? (
    <a
      href={`${BASE_URL}${item.image}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${BASE_URL}${item.image}`}
        alt="member"
        className="w-10 h-10 object-cover mx-auto rounded cursor-pointer hover:scale-110 transition"
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
                  <td colSpan="4" className="text-center py-4 text-gray-500">
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