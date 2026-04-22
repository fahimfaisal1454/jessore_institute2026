import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-5">

      <div className="max-w-[1100px] mx-auto grid grid-cols-12 gap-5 px-5 py-6">

        {/* About */}
        <div className="col-span-4">
          <h3 className="text-orange-400 font-semibold mb-2">
            যশোর ইনস্টিটিউট
          </h3>

          <p className="text-sm leading-relaxed text-gray-300">
            যশোর পাবলিক লাইব্রেরী ১৮৫৪ সালে প্রতিষ্ঠিত।
            পরবর্তীতে যশোর ইনস্টিটিউট নামে পরিচিত হয়।
            এটি একটি ঐতিহ্যবাহী সাংস্কৃতিক প্রতিষ্ঠান।
          </p>
        </div>

        {/* Departments */}
        <div className="col-span-3">
          <h3 className="text-orange-400 font-semibold mb-2">
            বিভাগসমূহ
          </h3>

          <ul className="text-sm space-y-0">
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

        {/* Activities */}
        <div className="col-span-3">
          <h3 className="text-orange-400 font-semibold mb-2">
            সাম্প্রতিক অনুষ্ঠান
          </h3>

          <ul className="text-sm space-y-1 text-gray-300">
            <li>সাংস্কৃতিক অনুষ্ঠান</li>
            <li>বার্ষিক সভা</li>
            <li>বিজয় দিবস</li>
            <li>পহেলা বৈশাখ</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2">
          <h3 className="text-orange-400 font-semibold mb-2">
            ঠিকানা
          </h3>

          <p className="text-sm text-gray-300">
            যশোর, বাংলাদেশ
          </p>

          <p className="text-sm mt-2 text-gray-300">
            📞 02477-761243
          </p>

          <p className="text-sm text-gray-300">
            📧 info@jashoreinstitute.gov.bd
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="bg-gray-900 text-center text-sm py-2 text-gray-400">
        © 2026 Jashore Institute — All Rights Reserved
      </div>

    </footer>
  );
}