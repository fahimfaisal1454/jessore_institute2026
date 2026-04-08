export default function CommitteeOld() {
  const data = [
    {
      year: "2020-2023",
      file: "/pdfs/2020-2023.pdf",
    },
    {
      year: "2023-2026",
      file: "/pdfs/2023-2026.pdf",
    },
    {
      year: "2026-2029",
      file: "/pdfs/2026-2029.pdf",
    },
    {
      year: "2029-2032",
      file: "/pdfs/2029-2032.pdf",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto text-center">

      {/* Title */}
      <h2 className="text-2xl font-semibold my-6">
        পরিচালনা পরিষদ-প্রাক্তন
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 px-6 pb-10">

        {data.map((item, index) => (
          <a
            key={index}
            href={item.file}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 border-4 border-gray-700 py-8 text-white font-semibold hover:scale-105 transition"
          >
            {item.year}
          </a>
        ))}

      </div>

    </div>
  );
}