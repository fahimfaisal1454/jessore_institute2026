export default function AnnualReportPage() {
  return (
    <div className="bg-white border p-4">

      <table className="w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">শিরোনাম</th>
            <th className="border p-2">প্রকাশের তারিখ</th>
            <th className="border p-2">ফাইল</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i}>
              <td className="border p-2">{i}</td>
              <td className="border p-2">বার্ষিক প্রতিবেদন</td>
              <td className="border p-2">২০২৪</td>
              <td className="border p-2 text-blue-600 cursor-pointer">
                Download
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}