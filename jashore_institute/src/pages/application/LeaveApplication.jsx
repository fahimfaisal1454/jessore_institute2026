import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function LeaveApplication() {
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("aboutus/form/leave/")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

return (
  <div className="max-w-[1100px] mx-auto">
    <div className="bg-white border shadow-sm">

      {/* Header */}
      <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-sm sm:text-base break-words">
        {data?.title || "ছুটির আবেদন ফরম"}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 text-center space-y-4">

        {/* View Button */}
        {data?.file && (
          <a
            href={data.file}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:inline-block bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            ফরম দেখুন
          </a>
        )}

        {/* Download Button */}
        {data?.file && (
          <a
            href={data.file}
            download
            className="block sm:inline-block bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 w-full sm:w-auto sm:ml-3"
          >
            ফরম ডাউনলোড করুন
          </a>
        )}

        {!data?.file && (
          <div className="text-gray-500">
            ফাইল পাওয়া যায়নি
          </div>
        )}

      </div>

    </div>
  </div>
);
}