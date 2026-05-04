import { NavLink } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const departments = [
    { name: "লাইব্রেরি বিভাগ", path: "/library-division" },
    { name: "ক্রীড়া বিভাগ", path: "/sports-division" },
    { name: "নাট্যকলা সংসদ", path: "/drama-division" },
    { name: "টাউন ক্লাব", path: "/townclub-division" },
    { name: "শিশু চিত্ত বিনোদন কেন্দ্র", path: "/kids-division" },
  ];

  const activities = [
    "সাংস্কৃতিক অনুষ্ঠান",
    "বার্ষিক সভা",
    "বিজয় দিবস",
    "পহেলা বৈশাখ",
  ];

  return (
    <footer className="bg-black text-white mt-8 w-full overflow-x-hidden">
      
      {/* MAIN FOOTER */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* ABOUT */}
          <div className="lg:col-span-4">
            <h3 className="text-orange-400 font-semibold text-lg mb-3">
              যশোর ইনস্টিটিউট
            </h3>

            <p className="text-sm md:text-base leading-relaxed text-gray-300">
              যশোর পাবলিক লাইব্রেরী ১৮৫১ সালে প্রতিষ্ঠিত। পরবর্তীতে যশোর
              ইনস্টিটিউট নামে পরিচিত হয়। এটি একটি ঐতিহ্যবাহী সাংস্কৃতিক
              প্রতিষ্ঠান।
            </p>
          </div>

          {/* DEPARTMENTS */}
          <div className="lg:col-span-3">
            <h3 className="text-orange-400 font-semibold text-lg mb-3">
              বিভাগসমূহ
            </h3>

            <ul className="space-y-1">
              {departments.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-sm md:text-base px-2 py-1 rounded transition ${
                        isActive
                          ? "text-orange-400 font-semibold"
                          : "text-gray-300 hover:text-orange-300"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTIVITIES */}
          <div className="lg:col-span-3">
            <h3 className="text-orange-400 font-semibold text-lg mb-3">
              সাম্প্রতিক অনুষ্ঠান
            </h3>

            <ul className="space-y-2">
              {activities.map((activity, i) => (
                <li
                  key={i}
                  className="text-sm md:text-base text-gray-300"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-2">
            <h3 className="text-orange-400 font-semibold text-lg mb-3">
              ঠিকানা
            </h3>

            <div className="space-y-3 text-sm md:text-base text-gray-300">

              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>১৫, এম এম আলি সড়ক, যশোর</span>
              </div>

              <div className="flex items-start gap-2">
                <FaPhoneAlt className="mt-1 flex-shrink-0" />
                <span>02477-761243</span>
              </div>

              <div className="flex items-start gap-2 break-all">
                <FaEnvelope className="mt-1 flex-shrink-0" />
                <span>info@jashoreinstitute.gov.bd</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
            © 2022 Jashore Institute — All rights reserved |
            Powered by Utshab Technology Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}