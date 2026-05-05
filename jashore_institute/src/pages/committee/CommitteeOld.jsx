import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function CommitteeOld() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("committee/old/")
      .then((res) => {
        setData(res.data.data);
        setTitle(res.data.title);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
  <div className="max-w-[1100px] mx-auto text-center">

    {/* Title */}
    <h2 className="text-xl sm:text-2xl font-semibold my-6 px-4 break-words">
      {title}
    </h2>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-6 pb-10">

      {data.map((item, index) => (
        <a
          key={index}
          href={item.file}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 border-4 border-gray-700 py-8 px-4 text-white font-semibold rounded hover:scale-105 transition break-words"
        >
          {item.year}
        </a>
      ))}

    </div>

  </div>
);
}