import BottomCards from "./BottomCards";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  return (
    <div className="space-y-2 text-[13px]">

      {/* সভাপতি + সম্পাদক */}
      {[
        {
          title: "সভাপতি",
          name: "মোঃ আব্দুল কাদের",
          img: "/president.jpg",
        },
        {
          title: "সাধারণ সম্পাদক",
          name: "ডাঃ মোঃ আবুল কালাম",
          img: "/secretary.jpg",
        },
      ].map((item, i) => (
        <div key={i} className="border border-gray-300 bg-white">

          <div className="bg-[#0b6b3a] text-white text-center py-[4px] font-semibold">
            {item.title}
          </div>

          <div className="p-2 text-center">
            <img
              src={item.img}
              alt={item.title}
              className="w-24 h-24 mx-auto border border-gray-400 object-cover"
            />
            <p className="mt-1 font-medium">{item.name}</p>
          </div>
        </div>
      ))}

      {/* MINI BOXES */}
      <div className="grid grid-cols-3 gap-[2px]">
        {["চাকুরি", "টেন্ডার", "বিজ্ঞাপন"].map((item, i) => (
          <div
            key={i}
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
          {
            label: "আপনার মতামত",
            link: "/contact",
          },
        ].map((item, i) =>
          item.link.startsWith("http") ? (
            <a
              key={i}
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
              key={i}
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

      {/* BANNER LINKS (FIXED) */}
      <div className="space-y-2">
        {[
          {
            label: "উন্মুক্ত স্বাধীনতা মঞ্চ",
            link: "/open-liberty-stage",
          },
          {
            label: "প্রাথমিক বিদ্যালয়",
            link: "/primary-school",
          },
          {
            label: "বার্ষিক প্রতিবেদন",
            link: "/annual-report",
          },
        ].map((item, i) => (
          <Link
            key={i}
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