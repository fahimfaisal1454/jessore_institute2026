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

          <ul className="text-sm space-y-1 text-gray-300">
            <li>লাইব্রেরি বিভাগ</li>
            <li>ক্রীড়া বিভাগ</li>
            <li>নাট্যকলা বিভাগ</li>
            <li>সঙ্গীত বিভাগ</li>
            <li>শিশু শিক্ষা কেন্দ্র</li>
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