import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function History() {
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("aboutus/history/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

return (
  <div className="max-w-[1100px] mx-auto">

    {/* Page Box */}
    <div className="bg-white border shadow-sm">

      {/* Header */}
      <div className="bg-[#f5f5f5] border-b px-3 sm:px-4 py-3 font-semibold text-gray-800 text-sm sm:text-base break-words">
        {data.title}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 text-sm sm:text-[15px] leading-7 text-gray-800 text-justify space-y-4">

        {/* Split content into paragraphs */}
        {data.content.split("\n").map((para, index) => (
          <p
            key={index}
            className="break-words whitespace-pre-line"
          >
            {para}
          </p>
        ))}

      </div>

    </div>

  </div>
);
}