import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  const [leaders, setLeaders] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // EXECUTIVE COMMITTEE
    AxiosInstance.get("committee/executive/")
      .then((res) => {
        let data = res.data;

        if (data?.results) data = data.results;
        if (!Array.isArray(data)) data = data ? [data] : [];

        data.sort((a, b) =>
          a.position === "president" ? -1 : 1
        );

        setLeaders(data);
      })
      .catch((err) => {
        console.error("Executive committee error:", err);
        setLeaders([]);
      })
      .finally(() => setLoading(false));

    // LIBRARIES
    AxiosInstance.get("aboutus/libraries/")
      .then((res) => {
        let data = res.data;

        if (data?.results) {
          setLibraries(data.results);
        } else if (data?.libraries) {
          setLibraries(data.libraries);
        } else if (Array.isArray(data)) {
          setLibraries(data);
        } else {
          setLibraries([]);
        }
      })
      .catch((err) => {
        console.error("Library fetch error:", err);
        setLibraries([]);
      });

  }, []);

  const getTitle = (pos) => {
    if (pos === "president") return "সভাপতি";
    if (pos === "secretary") return "সাধারণ সম্পাদক";
    return pos;
  };

  return (
    <div className="space-y-2 text-[14px]">

{/* EXECUTIVE LEADERS */}
{loading ? (
  <div className="text-center py-4 text-gray-500">
    Loading...
  </div>
) : leaders.length > 0 ? (
  leaders.map((item) => (
    <div
      key={item.id || item.position}
      className="border border-gray-300 bg-white"
    >
      {/* POSITION TITLE */}
      <div className="bg-[#0b6b3a] text-white text-center py-[4px] font-semibold">
        {item.position_display || getTitle(item.position)}
      </div>

      <div className="p-4 text-center">

        {/* IMAGE */}
        <div className="w-[150px] h-[160px] mx-auto border border-gray-300 bg-white p-1">
          <img
            src={item.image || "/no-image.png"}
            alt={item.position}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAME */}
        <p className="mt-3 font-medium text-gray-800">
          {item.name}
        </p>

        {/* DETAILS */}
        {item.details && (
          <p className="mt-2 text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {item.details}
          </p>
        )}

      </div>
    </div>
  ))
) : (
  <div className="text-center py-4 text-gray-500">
    No executive committee data
  </div>
)}

      {/* LIBRARIES OF BANGLADESH */}
      {/* LIBRARIES OF BANGLADESH */}
<div className="border border-gray-300 bg-white p-2">

  <div className="bg-[#0b6b3a] text-white text-center py-[5px] font-semibold mb-2">
    বাংলাদেশের গ্রন্থাগারসমূহ
  </div>

  <div className="space-y-1">

    {libraries.length > 0 ? (
      <>
        {libraries.slice(0, 8).map((library) => (
          <Link
            key={library.id}
            to="/library-details"
            className="flex items-center gap-2 border border-gray-300 px-2 py-2 bg-[#f8f8f8] hover:bg-gray-100"
          >
            <span className="text-purple-700 text-xs">
              ◆
            </span>

            <span className="text-[14px] text-gray-800">
              {library.library_name}
            </span>
          </Link>
        ))}

        {/* SHOW MORE */}
        <div className="text-center pt-2">
          <Link
            to="/library-details"
            className="text-blue-700  text-[14px] font-medium hover:underline"
          >
            Show More...
          </Link>
        </div>
      </>
    ) : (
      <div className="text-center text-gray-500 py-3">
        No library data available
      </div>
    )}

  </div>

      </div>

      {/* CONTACT */}
      <div className="border border-gray-300 bg-white p-2">

        <div className="border border-gray-400 text-center text-blue-700 font-semibold py-1 mb-2">
          সেবা পেতে জরুরী প্রয়োজনে যোগাযোগ করুন
        </div>

        <ul className="list-disc pl-4 text-blue-700 space-y-1">
          <li>অফিস: 02477-761243</li>
          <li>অফিস: 01977-809210</li>
        </ul>

      </div>

      {/* BANNER LINKS */}
      <div className="space-y-2 ">

        {[
          {
            label: "উন্মুক্ত স্বাধীনতা মঞ্চ",
            link: "/open-liberty-stage",
            icon: "🏛️",
          },
          {
            label: "প্রাথমিক বিদ্যালয়",
            link: "/primary-school",
            icon: "🏫",
          },
          {
            label: "বার্ষিক প্রতিবেদন",
            link: "/annual-report",
            icon: "📄",
          },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="flex items-center gap-3 px-3 py-3 bg-[#f8f8f8] border border-gray-300 hover:bg-gray-100"
          >

            <span className="text-[14px]">
              {item.icon}
            </span>

            <span className="font-medium text-gray-800 text-[14px]">
              {item.label}
            </span>

          </Link>
        ))}

      </div>

      {/* E-BOOK */}
      <div className="border border-gray-300 bg-white text-center p-2">

        <div className="bg-[#0b6b3a] text-white py-[4px] font-semibold mb-2">
          ই-বুক
        </div>

        <a
          href="https://www.ebook.com.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90"
        >

          <img
            src="/src/assets/ebook.png"
            alt="ebook"
            className="w-16 mx-auto"
          />

          <p className="text-sm text-blue-700 mt-2 font-medium">
            ই-বুক দেখুন
          </p>

        </a>

      </div>

    </div>
  );
}