export default function Videos() {
  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      {/* Header */}
      <div className="bg-white border shadow-sm">
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          ভিডিওঘর
        </div>

        {/* Video Grid */}
        <div className="p-6 grid grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <div key={i} className="aspect-video">
              <iframe
                src={video}
                title="video"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}