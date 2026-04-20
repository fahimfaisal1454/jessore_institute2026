export default function DataTable({ title, data }) {
  return (
    <div className="max-w-[800px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold text-center">
          {title}
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">

            {/* Head */}
            <thead className="bg-[#d9e3ea]">
              <tr>
                <th className="border px-3 py-2 text-center w-[60px]">ক্রমিক</th>
                <th className="border px-3 py-2 text-center">নাম</th>
                <th className="border px-3 py-2 text-center w-[150px]">কার্যকাল</th>
                <th className="border px-3 py-2 text-center w-[80px]">ছবি</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-gray-100">

                  <td className="border px-3 py-2 text-center">
                    {i + 1}
                  </td>

                  <td className="border px-3 py-2">
                    {item.name}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {item.year}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="member"
                        className="w-10 h-10 object-cover mx-auto rounded"
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