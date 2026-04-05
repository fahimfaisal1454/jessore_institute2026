import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(null);

  const menu = [
    { name: "হোম", path: "/" },
    {
      name: "আমাদের সম্পর্কে",
      dropdown: ["ইতিহাস", "লক্ষ্য ও উদ্দেশ্য"],
    },
    {
      name: "কমিটিসমূহ",
      dropdown: ["কার্যনির্বাহী কমিটি", "উপদেষ্টা কমিটি"],
    },
    { name: "সম্মানিত সদস্যবৃন্দ", path: "/members" },
    {
      name: "গ্যালারি",
      dropdown: ["ছবি", "ভিডিও"],
    },
    { name: "খবর", path: "/news" },
    { name: "নোটিশ", path: "/notice" },
  ];

  return (
    <div className="bg-gray-300 border-t border-b">
      <div className="max-w-[1100px] mx-auto flex">

        {menu.map((item, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setOpen(index)}
            onMouseLeave={() => setOpen(null)}
          >
            {/* Main Item */}
            {item.path ? (
              <Link
                to={item.path}
                className={`px-5 py-3 block font-medium ${
                  index === 0
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <div
                className="px-5 py-3 cursor-pointer hover:bg-gray-200 flex items-center gap-1"
              >
                {item.name}
                {item.dropdown && <span>▾</span>}
              </div>
            )}

            {/* Dropdown */}
            {item.dropdown && open === index && (
              <div className="absolute left-0 top-full bg-white shadow-md min-w-[180px] z-50">
                {item.dropdown.map((sub, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}