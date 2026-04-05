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
            "লাইব্রেরি বিভাগ",
            "ক্রীড়া বিভাগ",
            "সাংস্কৃতিক বিভাগ",
            "চিত্রাঙ্কন বিভাগ",
            "সঙ্গীত বিভাগ",
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

      {/* Members Section */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          ইনস্টিটিউট সদস্য
        </div>

        <ul className="p-2 text-sm space-y-1">
          {[
            "জীবন সদস্য",
            "আজীবন সদস্য",
            "সাধারণ সদস্য",
            "বিশেষ সদস্য",
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

      {/* Cultural Sections */}
      <div className="border bg-white shadow-sm">
        <div className="bg-green-700 text-white px-3 py-1 text-sm font-semibold">
          যশোর ইনস্টিটিউট বিভাগীয় সমূহ
        </div>

        <ul className="p-2 text-sm space-y-1">
          {[
            "চারুকলা বিভাগ",
            "ক্রীড়া বিভাগ",
            "নাট্যকলা বিভাগ",
            "সঙ্গীত বিভাগ",
            "শিশু শিক্ষা কেন্দ্র",
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