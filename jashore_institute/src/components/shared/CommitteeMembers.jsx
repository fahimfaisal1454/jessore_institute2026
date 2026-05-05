export default function CommitteeMembers({ title, head, members = [] }) {
  return (
  <div className="max-w-[1100px] mx-auto">

    <div className="bg-white border shadow-sm">

      {/* Header */}
      <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-sm sm:text-base break-words">
        {title}
      </div>

      {/* HEAD */}
      {head && (
        <div className="flex justify-center py-6 sm:py-10 px-4">
          <div className="bg-purple-300 p-4 sm:p-6 text-center w-full max-w-[260px] shadow-sm rounded">

            <img
              src={head.img}
              alt={head.name}
              className="w-28 sm:w-32 h-32 sm:h-36 object-cover mx-auto mb-3 border"
            />

            <p className="font-semibold text-sm break-words">
              {head.name}
            </p>

            <p className="text-xs mt-2 text-gray-800 break-words">
              {head.role}
            </p>

          </div>
        </div>
      )}

      {/* MEMBERS GRID */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {members.length > 0 ? (
          members.map((m, i) => (
            <div
              key={i}
              className={`p-4 text-center shadow-sm rounded ${
                i % 2 === 0
                  ? "bg-blue-200"
                  : "bg-purple-200"
              }`}
            >

              <img
                src={m.img}
                alt={m.name}
                className="w-24 h-28 object-cover mx-auto mb-3 border"
              />

              <p className="text-sm font-semibold break-words">
                {m.name}
              </p>

              <p className="text-xs mt-1 break-words">
                {m.role}
              </p>

            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No members found
          </p>
        )}
      </div>

    </div>

  </div>
);
}