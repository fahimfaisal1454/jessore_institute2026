import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 20;

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

  // Pagination logic
  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = notices.slice(
    startIndex,
    startIndex + noticesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2 sm:px-3 py-4">
      <div className="bg-white border shadow-sm">
        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-bold text-sm sm:text-base break-words">
          নোটিশ বোর্ড
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse border border-gray-300 text-xs sm:text-sm">
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
              {currentNotices.map((notice, index) => (
                <tr key={notice.id} className="hover:bg-gray-50 align-top">
                  {/* Serial */}
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {toBanglaNumber(startIndex + index + 1)}
                  </td>

                  {/* Date */}
                  <td className="border border-gray-300 px-2 py-2 text-center whitespace-nowrap">
                    {formatBanglaDate(notice.date)}
                  </td>

                  {/* Title */}
                  <td className="border border-gray-300 px-3 py-2 leading-snug break-words">
                    <p>{notice.title}</p>

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

        {/* Pagination Controls */}
        {notices.length > noticesPerPage && (
          <div className="flex flex-wrap justify-center items-center gap-2 py-4 border-t bg-gray-50">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded text-sm ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              পূর্ববর্তী
            </button>

            <span className="text-sm font-medium px-3">
              পৃষ্ঠা {toBanglaNumber(currentPage)} /{" "}
              {toBanglaNumber(totalPages)}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded text-sm ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              পরবর্তী
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3 sm:px-4">
          <div className="relative bg-white w-full max-w-[750px] p-4 sm:p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto">
            {/* CLOSE X */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="font-bold text-lg sm:text-xl mb-2 break-words pr-12">
              {selected.title}
            </h2>

            {/* Date */}
            <p className="text-sm text-gray-500 mb-4">
              {formatBanglaDate(selected.date)}
            </p>

            {/* Content */}
            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base break-words">
              {selected.content || "কোনো বিবরণ নেই"}
            </div>

            {/* File Link */}
            {selected.file && (
              <div className="mt-6">
                <a
                  href={selected.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-center"
                >
                  PDF / দেখুন
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}