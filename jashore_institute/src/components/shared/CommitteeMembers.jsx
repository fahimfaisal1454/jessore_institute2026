export default function CommitteeMembers({ title, head, members = [] }) {
  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          {title}
        </div>

        {/* 🔥 Head (optional) */}
        {head && (
          <div className="flex justify-center py-10">
            <div className="bg-purple-300 p-6 text-center w-[260px] shadow-sm">
              <img
                src={head.img}
                alt={head.name}
                className="w-32 h-36 object-cover mx-auto mb-3 border"
              />
              <p className="font-semibold text-sm">{head.name}</p>
              <p className="text-xs mt-2 text-gray-800">{head.role}</p>
            </div>
          </div>
        )}

        {/* 🔥 Members Grid */}
        <div className="p-6 grid grid-cols-4 gap-6">
          {members.length > 0 ? (
            members.map((m, i) => (
              <div
                key={i}
                className={`p-4 text-center shadow-sm ${
                  i % 2 === 0 ? "bg-blue-200" : "bg-purple-200"
                }`}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-24 h-28 object-cover mx-auto mb-3 border"
                />
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs mt-1">{m.role}</p>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No members found
            </p>
          )}
        </div>

      </div>

    </div>
  );
}