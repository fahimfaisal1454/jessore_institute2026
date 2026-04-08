export default function DataTable({ title, columns, data }) {
  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          {title}
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">

            <thead className="bg-[#d9e3ea]">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="border px-3 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border px-3 py-2">{i + 1}</td>
                  <td className="border px-3 py-2">{row.name}</td>
                  <td className="border px-3 py-2">{row.year}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}