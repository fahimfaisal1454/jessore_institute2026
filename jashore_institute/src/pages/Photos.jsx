export default function Photos() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      {/* Header */}
      <div className="bg-white border shadow-sm">
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          ছবিঘর
        </div>

        {/* Gallery */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="border p-2 bg-gray-50">
              <img
                src={img}
                alt="gallery"
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}