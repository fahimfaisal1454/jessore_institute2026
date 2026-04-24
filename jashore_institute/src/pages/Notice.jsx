import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null); // 👈 modal state

  useEffect(() => {
    AxiosInstance.get("notice/")
      .then((res) => setNotices(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          নোটিশ
        </div>

        {/* Notice List */}
        <div className="p-4 space-y-3">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex justify-between items-center border p-3 hover:bg-gray-50"
            >

              {/* Left */}
              <div>
                <p className="font-medium">{notice.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notice.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Right */}
              <div className="space-x-3">

                {/* PDF */}
                {notice.type === "pdf" && notice.file && (
                  <a
                    href={notice.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    দেখুন
                  </a>
                )}

                {/* Image */}
                {notice.type === "image" && notice.file && (
                  <a
                    href={notice.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    ছবি দেখুন
                  </a>
                )}

                {/* Details button (for ALL types if content exists) */}
                {notice.content && (
                  <button
                    onClick={() => setSelected(notice)}
                    className="text-gray-700 underline"
                  >
                    বিস্তারিত
                  </button>
                )}

              </div>

            </div>
          ))}

          {notices.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              কোনো নোটিশ পাওয়া যায়নি
            </div>
          )}

        </div>

      </div>

      {/* 🔥 Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[600px] p-6 rounded shadow-lg">

            <h2 className="font-semibold text-lg mb-2">
              {selected.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {new Date(selected.date).toLocaleDateString("en-GB")}
            </p>

            <div className="text-gray-700 whitespace-pre-line">
              {selected.content || "কোনো বিবরণ নেই"}
            </div>

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