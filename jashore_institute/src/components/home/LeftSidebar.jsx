import { NavLink } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <div className="space-y-3">

      {/* Founder Section */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          প্রতিষ্ঠাতা
        </div>
        <div className="p-2">
          <img
            src="/founder.jpg"
            alt="Founder"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* National Song */}
      <div className="border bg-white shadow-sm p-2">
        <p className="text-sm font-semibold mb-2">জাতীয় সংগীত</p>
        <audio controls className="w-full">
          <source src="/audio.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* Institute Sections */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          ইনস্টিটিউট বিভাগসমূহ
        </div>

        <ul className="p-2 text-sm space-y-1">
          {[
            { name: "লাইব্রেরি বিভাগ", path: "/library-division" },
            { name: "ক্রীড়া বিভাগ", path: "/sports-division" },
            { name: "নাট্যকলা সংসদ", path: "/drama-division" },
            { name: "টাউন ক্লাব", path: "/townclub-division" },
            { name: "শিশু চিত্ত বিনোদন কেন্দ্র", path: "/kids-division" },
          ].map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-2 py-1 transition ${
                    isActive
                      ? "bg-green-200 text-green-800 font-semibold"
                      : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Members Section (FIXED) */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          ইনস্টিটিউট সদস্য
        </div>

        <ul className="p-2 text-sm space-y-1">
          {[
            { name: "দাতা সদস্য", path: "/life-member" },
            { name: "আজীবন সদস্য", path: "/annual-member" },
            { name: "সাধারণ সদস্য", path: "/general-member" },
            { name: "বিগত বছরের ভোটের তালিকা", path: "/voter-list" },
          ].map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-2 py-1 transition ${
                    isActive
                      ? "bg-green-200 text-green-800 font-semibold"
                      : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Cultural Sections */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          যশোর ইনস্টিটিউট বিভাগীয় সদস্য
        </div>

        <ul className="p-2 text-sm space-y-1">
          {[
            "লাইব্রেরি সদস্য",
            "ক্রীড়া সদস্য",
            "নাট্যকলা সদস্য",
            "টাউন ক্লাব সদস্য",
            "শিশু চিত্তবিনোদন কেন্দ্র সদস্য",
          ].map((item, i) => (
            <li
              key={i}
              className="px-2 py-1 bg-gray-100 hover:bg-green-100 hover:text-green-700 cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}