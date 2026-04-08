export default function CommitteeHistory({ title, data = [] }) {
  return (
    <div className="max-w-[1100px] mx-auto text-center">

      {/* Title */}
      <h2 className="text-2xl font-semibold my-6">
        {title}
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 px-6 pb-10">

        {data.length > 0 ? (
          data.map((item, i) => (
            <a
              key={i}
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 border-4 border-gray-700 py-8 text-white font-semibold hover:scale-105 transition"
            >
              {item.year}
            </a>
          ))
        ) : (
          <p className="col-span-4 text-gray-500">
            No data available
          </p>
        )}

      </div>

    </div>
  );
}