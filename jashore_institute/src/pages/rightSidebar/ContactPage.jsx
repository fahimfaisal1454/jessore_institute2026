export default function ContactPage() {
  return (
    <div className="bg-white border border-gray-300 p-4">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">
        যোগাযোগ
      </h2>

      {/* Form + Map */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* LEFT: FORM */}
        <div className="space-y-3">

          <input
            type="text"
            placeholder="নাম"
            className="w-full border border-gray-300 p-2"
          />

          <input
            type="email"
            placeholder="ইমেইল"
            className="w-full border border-gray-300 p-2"
          />

          <input
            type="text"
            placeholder="ফোন নাম্বার"
            className="w-full border border-gray-300 p-2"
          />

          <input
            type="text"
            placeholder="সাবজেক্ট"
            className="w-full border border-gray-300 p-2"
          />

          <textarea
            placeholder="মেসেজ"
            rows={6}
            className="w-full border border-gray-300 p-2"
          />

          <button className="bg-blue-600 text-white px-4 py-2">
            Submit
          </button>

        </div>

        {/* RIGHT: MAP */}
        <div className="w-full h-full">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Jessore%20Institute%20Public%20Library&output=embed"
            className="w-full h-[350px] border"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
}