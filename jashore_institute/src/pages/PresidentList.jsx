export default function PresidentList() {
  const data = [
    { id: 1, name: "Mr. A. S. Larkin", year: "1928 - 1929" },
    { id: 2, name: "Mr. S. C. Ghatak", year: "1929 - 11/29" },
    { id: 3, name: "Mr. A. S. Larkin", year: "1929 - 1931" },
    { id: 4, name: "Mr. S.K. Ghosh", year: "1931 - 5/31" },
    { id: 5, name: "Mr. K. G. Morshed", year: "1931 - 1932" },
    { id: 6, name: "Mr. N. K. Sen", year: "1932 - 1935" },
    { id: 7, name: "Mr. M. F. Karim", year: "1935 - 1936" },
    { id: 8, name: "Mr. S. Datta", year: "1936 - 1936" },
    { id: 9, name: "Mr. P. D. Martyn", year: "1936 - 1939" },
    { id: 10, name: "Mr. N. C. Bose", year: "1939 - 1939" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          সভাপতি গণের তালিকা
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">

            <thead className="bg-[#d9e3ea] text-gray-800">
              <tr>
                <th className="border px-3 py-2 text-left">ক্রমিক</th>
                <th className="border px-3 py-2 text-left">সভাপতি</th>
                <th className="border px-3 py-2 text-left">কার্যকাল</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border px-3 py-2">{item.id}.</td>
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2">{item.year}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}