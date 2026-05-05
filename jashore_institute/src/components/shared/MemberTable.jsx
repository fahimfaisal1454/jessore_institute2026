export default function MemberTable({ title, data }) {
  return (
  <div className="max-w-[1100px] mx-auto">

    <div className="bg-white border shadow-sm">

      {/* Header */}
      <div className="bg-[#e9e9e9] border-b px-3 sm:px-4 py-3 font-semibold text-center text-sm sm:text-base break-words">
        {title}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-xs sm:text-sm border">

          {/* Table Head */}
          <thead className="bg-[#d9e3ea] text-xs">
            <tr>
              <th className="border px-2 py-2">ক্রমিক</th>
              <th className="border px-2 py-2">সদস্য নং</th>
              <th className="border px-2 py-2">
                সদস্যের নাম ও ঠিকানা
              </th>
              <th className="border px-2 py-2">
                অন্তর্ভুক্তির তারিখ
              </th>
              <th className="border px-2 py-2">
                সদস্যের ধরন
              </th>
              <th className="border px-2 py-2">
                মোবাইল
              </th>
              <th className="border px-2 py-2">
                ছবি
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-gray-100 align-top"
              >

                <td className="border px-2 py-2 text-center">
                  {i + 1}
                </td>

                <td className="border px-2 py-2 text-center break-words">
                  {item.memberNo}
                </td>

                <td className="border px-2 py-2 whitespace-pre-line break-words min-w-[220px]">
                  {item.name}
                </td>

                <td className="border px-2 py-2 text-center break-words">
                  {item.date}
                </td>

                <td className="border px-2 py-2 text-center break-words">
                  {item.type}
                </td>

                <td className="border px-2 py-2 text-center break-words">
                  {item.mobile || "-"}
                </td>

                <td className="border px-2 py-2 text-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover mx-auto border"
                    />
                  ) : (
                    "-"
                  )}
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