import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import BottomCards from "./BottomCards";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("committee/executive/")
      .then((res) => {
        let data = res.data;

        // handle pagination / object / array
        if (data?.results) data = data.results;
        if (!Array.isArray(data)) data = data ? [data] : [];

        // sort president first
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
  }, []);

  const getTitle = (pos) => {
    if (pos === "president") return "সভাপতি";
    if (pos === "secretary") return "সাধারণ সম্পাদক";
    return pos;
  };

  return (
    <div className="space-y-2 text-[13px]">

      {/* 🔥 DYNAMIC সভাপতি + সম্পাদক */}
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : leaders.length > 0 ? (
        leaders.map((item) => (
          <div
            key={item.id || item.position}  // ✅ FIXED KEY WARNING
            className="border border-gray-300 bg-white"
          >
            <div className="bg-[#0b6b3a] text-white text-center py-[4px] font-semibold">
              {getTitle(item.position)}
            </div>

<div className="p-4 text-center">

  <div className="w-[150px] h-[160px] mx-auto border border-gray-300 bg-white p-1">
    <img
      src={item.image || "/no-image.png"}
      alt={item.position}
      className="w-full h-full object-cover"
    />
  </div>

  <p className="mt-3 font-medium text-gray-800">
    {item.name}
  </p>

</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">
          No executive committee data
        </div>
      )}

      {/* MINI BOXES */}
      <div className="grid grid-cols-3 gap-[2px]">
        {["চাকুরি", "টেন্ডার", "বিজ্ঞাপন"].map((item) => (
          <div
            key={item}  // ✅ FIXED KEY WARNING
            className="border border-gray-300 bg-[#f5f5f5] text-center py-2 hover:bg-gray-200 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>

      {/* BLUE BUTTON LINKS */}
      <div className="space-y-1">
        {[
          {
            label: "কেন্দ্রীয় ই-সেবা",
            link: "https://bangladesh.gov.bd/views/all-eservices-in-bangladesh/",
          },
          { label: "জেলা ই-সেবা কেন্দ্র", link: "#" },
          { label: "আভ্যন্তরীণ ই-সেবা", link: "#" },
          {
            label: "ইনোভেশন কর্নার",
            link: "https://publiclibrary.jessore.gov.bd/pages/innovation-corners/",
          },
          { label: "আপনার মতামত", link: "/contact" },
        ].map((item) =>
          item.link.startsWith("http") ? (
            <a
              key={item.label} // ✅ FIXED KEY
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-300 px-2 py-1 bg-[url('/btn-bg.png')] bg-cover hover:brightness-95"
            >
              <span className="text-purple-700 text-xs">◆</span>
              <span>{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label} // ✅ FIXED KEY
              to={item.link}
              className="flex items-center gap-2 border border-gray-300 px-2 py-1 bg-[url('/btn-bg.png')] bg-cover hover:brightness-95"
            >
              <span className="text-purple-700 text-xs">◆</span>
              <span>{item.label}</span>
            </Link>
          )
        )}
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
      <div className="space-y-2">
        {[
          { label: "উন্মুক্ত স্বাধীনতা মঞ্চ", link: "/open-liberty-stage" },
          { label: "প্রাথমিক বিদ্যালয়", link: "/primary-school" },
          { label: "বার্ষিক প্রতিবেদন", link: "/annual-report" },
        ].map((item) => (
          <Link
            key={item.label} // ✅ FIXED KEY
            to={item.link}
            className="flex items-center gap-2 px-2 py-2 bg-[url('/blue-bg.png')] bg-cover border border-gray-200 hover:brightness-95"
          >
            <img src="/link-icon.png" alt="icon" className="w-5 h-5" />
            <span className="font-medium text-gray-800">
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

        <img src="/ebook.png" alt="ebook" className="w-14 mx-auto" />
      </div>

      <BottomCards />
    </div>
  );
}