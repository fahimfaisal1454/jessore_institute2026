import BottomCards from "./BottomCards";

export default function RightSidebar() {
  return (
    <div className="space-y-3">

      {/* President Section */}
      <div className="border bg-white shadow-sm text-center">
        <div className="bg-green-700 text-white py-1 text-sm font-semibold">
          সভাপতি
        </div>

        <div className="p-3">
          <img
            src="/president.jpg"
            alt="President"
            className="w-28 h-28 mx-auto object-cover border"
          />

          <p className="text-sm mt-2 font-medium">
            মোঃ আব্দুল কাদের
          </p>
        </div>
      </div>

      {/* General Secretary */}
      <div className="border bg-white shadow-sm text-center">
        <div className="bg-green-700 text-white py-1 text-sm font-semibold">
          সাধারণ সম্পাদক
        </div>

        <div className="p-3">
          <img
            src="/secretary.jpg"
            alt="Secretary"
            className="w-28 h-28 mx-auto object-cover border"
          />

          <p className="text-sm mt-2 font-medium">
            ডাঃ মোঃ আবুল কালাম
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">

        {[
          "ই-সেবা",
          "ডাউনলোড",
          "অনলাইন আবেদন",
          "যোগাযোগ করুন",
        ].map((item, i) => (
          <button
            key={i}
            className="w-full text-left px-3 py-2 text-sm bg-gradient-to-r from-blue-100 to-blue-200 hover:from-green-100 hover:to-green-200 border transition"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Contact Box */}
      <div className="border bg-white shadow-sm p-3 text-sm">
        <p className="font-semibold mb-2">যোগাযোগ</p>

        <p>📞 অফিস: 02477-761243</p>
        <p>📱 মোবাইল: 01977-809210</p>
      </div>

      {/* eBook */}
      <div className="border bg-white shadow-sm text-center p-3">
        <p className="text-sm font-semibold mb-2">ই-বুক</p>

        <img
          src="/ebook.png"
          alt="ebook"
          className="w-16 mx-auto"
        />
      </div>
      <BottomCards />

    </div>
  );
}