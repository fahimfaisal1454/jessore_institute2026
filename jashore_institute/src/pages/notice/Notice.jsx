import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    AxiosInstance.get("notice/")
      .then((res) => setNotices(res.data))
      .catch(() => {});
  }, []);

  // Convert English numbers to Bangla
  const toBanglaNumber = (num) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((digit) => banglaDigits[digit] || digit)
      .join("");
  };

  // Format Bangla Date
  const formatBanglaDate = (dateString) => {
    const date = new Date(dateString);
    const day = toBanglaNumber(date.getDate().toString().padStart(2, "0"));
    const month = toBanglaNumber(
      (date.getMonth() + 1).toString().padStart(2, "0")
    );
    const year = toBanglaNumber(date.getFullYear());

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2 py-4">
      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-3 py-2 font-bold text-base">
          নোটিশ বোর্ড
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">

            {/* Header */}
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 px-2 py-2 w-[50px]">
                  নং
                </th>
                <th className="border border-gray-300 px-2 py-2 w-[140px]">
                  প্রকাশের তারিখ
                </th>
                <th className="border border-gray-300 px-3 py-2">
                  শিরোনাম
                </th>
                <th className="border border-gray-300 px-2 py-2 w-[140px]">
                  ফাইল সমূহ
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {notices.slice(0, 20).map((notice, index) => (
                <tr
                  key={notice.id}
                  className="hover:bg-gray-50 align-top"
                >

                  {/* Serial */}
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {toBanglaNumber(index + 1)}
                  </td>

                  {/* Date */}
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">
                    {formatBanglaDate(notice.date)}
                  </td>

                  {/* Title */}
                  <td className="border border-gray-300 px-3 py-2 leading-snug">
                    <p>{notice.title}</p>

                    {/* Details */}
                    {notice.content && (
                      <button
                        onClick={() => setSelected(notice)}
                        className="text-xs text-purple-700 underline mt-1"
                      >
                        বিস্তারিত
                      </button>
                    )}
                  </td>

                  {/* File */}
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">
                    {notice.file ? (
                      <a
                        href={notice.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        PDF / দেখুন
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                </tr>
              ))}

              {/* Empty */}
              {notices.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-6 border"
                  >
                    কোনো নোটিশ পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-[700px] p-6 rounded shadow-lg max-h-[85vh] overflow-y-auto">

            {/* Title */}
            <h2 className="font-bold text-xl mb-2">
              {selected.title}
            </h2>

            {/* Date */}
            <p className="text-sm text-gray-500 mb-4">
              {formatBanglaDate(selected.date)}
            </p>

            {/* Content */}
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {selected.content || "কোনো বিবরণ নেই"}
            </div>

            {/* Close */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}