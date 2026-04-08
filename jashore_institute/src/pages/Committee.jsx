export default function Committee() {
  const head = {
    name: "মোহাম্মদ আব্দুর রহমান",
    role: "জেলা প্রশাসক ও সভাপতি যশোর ইনস্টিটিউট, যশোর",
    img: "/president.jpg",
  };

  const members = [
    {
      name: "মোঃ ইসহাক (এডঃ)",
      role: "সহ-সভাপতি-১",
      img: "/person1.jpg",
    },
    {
      name: "আবু সেলিম রানা (এডঃ)",
      role: "সহ-সভাপতি-২",
      img: "/person2.jpg",
    },
    {
      name: "(এডঃ) মোহাম্মদ হোসেন চৌধুরী টুলু",
      role: "সহ-সভাপতি",
      img: "/person3.jpg",
    },
    {
      name: "ডাঃ মোঃ আবুল কালাম আজাদ লিটু",
      role: "সহ-সভাপতি",
      img: "/person4.jpg",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          পরিচালনা পরিষদ
        </div>

        {/* 🔥 TOP HEAD */}
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

        {/* 🔥 MEMBERS GRID */}
        <div className="p-6 grid grid-cols-4 gap-6">

          {members.map((member, index) => (
            <div
              key={index}
              className={`p-4 text-center shadow-sm ${
                index % 2 === 0 ? "bg-blue-200" : "bg-purple-200"
              }`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-28 object-cover mx-auto mb-3 border"
              />

              <p className="font-semibold text-sm">{member.name}</p>
              <p className="text-xs mt-1">{member.role}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}