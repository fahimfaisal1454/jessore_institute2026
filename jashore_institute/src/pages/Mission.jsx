import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";

export default function Mission() {
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("aboutus/mission/")
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
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold text-gray-800">
          {data.title}
        </div>

        {/* Content */}
        <div className="p-5 text-[15px] leading-7 text-gray-800 text-justify space-y-4">

          {data.content.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}

        </div>

      </div>

    </div>
  );
}