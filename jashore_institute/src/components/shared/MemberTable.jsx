export default function MemberTable({ title, data }) {
  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold text-center">
          {title}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">

            {/* Table Head */}
            <thead className="bg-[#d9e3ea] text-xs">
              <tr>
                <th className="border px-0 py-1">ক্রমিক</th>
                {/* <th className="border px-2 py-1">ভোটার নং</th> */}
                <th className="border px-2 py-1">সদস্য নং</th>
                <th className="border px-2 py-1">সদস্যের নাম ও ঠিকানা</th>
                <th className="border px-2 py-1">অন্তর্ভুক্তির তারিখ</th>
                <th className="border px-2 py-1">সদস্যের ধরন</th>
                <th className="border px-2 py-1">মোবাইল</th>
                <th className="border px-2 py-1">ছবি</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-gray-100 align-top">

                  <td className="border px-2 py-1 text-center">{i + 1}</td>
                  {/* <td className="border px-2 py-1 text-center">{item.voterNo}</td> */}
                  <td className="border px-2 py-1 text-center">{item.memberNo}</td>

                  <td className="border px-2 py-1 whitespace-pre-line">
                    {item.name}
                  </td>

                  <td className="border px-2 py-1 text-center">{item.date}</td>
                  <td className="border px-2 py-1 text-center">{item.type}</td>
                  <td className="border px-2 py-1 text-center">{item.mobile || "-"}</td>

                  <td className="border px-2 py-1 text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 object-cover"
                      />
                    ) : "-"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}