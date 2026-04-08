export default function SecretaryList() {
  const data = [
    { id: 1, name: "রায় বাহাদুর মুনশী মধুসূদন", year: "1928 - 1930" },
    { id: 2, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1931 - 1936" },
    { id: 3, name: "মি. বিজয় কুমার সরকার", year: "1936 - 1937" },
    { id: 4, name: "মি. কিশোর চন্দ্র দত্ত", year: "1937 - 1938" },
    { id: 5, name: "মি. বিজয় কুমার সরকার", year: "1938 - 1939" },
    { id: 6, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1939 - 1940" },
    { id: 7, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1940 - 1941" },
    { id: 8, name: "মি. কিশোর চন্দ্র দত্ত", year: "1941 - 1942" },
    { id: 9, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1942 - 1946" },
    { id: 10, name: "মি. বেণী মাধব মিত্র", year: "1946 - 1947" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          সাধারণ সম্পাদক তালিকা
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">

            <thead className="bg-[#d9e3ea] text-gray-800">
              <tr>
                <th className="border px-3 py-2 text-left">ক্রমিক</th>
                <th className="border px-3 py-2 text-left">সাধারণ সম্পাদক</th>
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