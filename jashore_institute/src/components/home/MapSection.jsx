export default function MapSection() {
  return (
    <div className="bg-gray-100 border mt-4">

      {/* Top bar */}
      <div className="px-3 py-2 border-b text-sm text-blue-600 font-medium">
        Maps ↗
      </div>

      {/* Map area */}
      <div className="h-[200px] w-full">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Jashore%20Institute&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}