import { NavLink } from "react-router-dom";
import SectionHeader from "../shared/SectionHeader";
import icon from "../../assets/committee.png";
import { FaUser } from "react-icons/fa";

export default function CommitteeList() {
  const topItems = [
    { name: "সভাপতি তালিকা", path: "/president-list" },
    { name: "সাধারণ সম্পাদক তালিকা", path: "/secretary-list" },
  ];

  const bottomItems = [
    { name: "সম্পাদক, লাইব্রেরি বিভাগ", path: "/library-page" },
    { name: "সম্পাদক, ক্রীড়া বিভাগ", path: "/sports-page" },
    { name: "সম্পাদক, নাট্যকলা সংসদ", path: "/drama-page" },
    { name: "সম্পাদক, টাউন ক্লাব", path: "/townclub-page" },
    { name: "সম্পাদক, শিশু চিত্তবিনোদন কেন্দ্র", path: "/kids-page" },
  ];

  return (
    <div className="space-y-4">

      {/* TOP SECTION */}
      <div className="border bg-white">
        <SectionHeader title="প্রাক্তন সভাপতি ও সাধারণ সম্পাদক তালিকা" />

        <div className="flex gap-4 p-3">
          
          {/* LEFT ICON */}
          <div className="w-24 flex justify-center items-start">
            <img src={icon} alt="icon" className="w-16 opacity-80" />
          </div>

          {/* RIGHT LIST */}
          <div className="flex-1 space-y-2">
            {topItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className="flex items-center gap-2 border px-3 py-1
                           bg-[url('/bg-blue.png')] bg-cover 
                           hover:shadow hover:bg-blue-50 transition"
              >
                <FaUser className="text-blue-600" />
                <span className="hover:text-blue-600 font-medium">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border bg-white">
        <SectionHeader title="প্রাক্তন বিভাগীয় সম্পাদক তালিকা" />

        <div className="flex gap-4 p-3">
          
          {/* LEFT ICON */}
          <div className="w-24 flex justify-center items-start">
            <img src={icon} alt="icon" className="w-16 opacity-80" />
          </div>

          {/* RIGHT LIST */}
          <div className="flex-1 space-y-2">
            {bottomItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className="flex items-center gap-2 border px-3 py-1
                           bg-[url('/bg-blue.png')] bg-cover 
                           hover:shadow hover:bg-blue-50 transition"
              >
                <FaUser className="text-blue-600" />
                <span className="hover:text-blue-600 font-medium">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}