import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function AnnualReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("aboutus/annual-report/")
      .then((res) => {
        let data = res.data;
        if (data.results) data = data.results;
        setReports(data);
      })
      .catch((err) => {
        console.error("Annual report error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-white border p-4">

      {/* HEADER */}
      <div className="bg-[#0b6b3a] text-white text-center py-2 font-semibold mb-3">
        বার্ষিক প্রতিবেদন
      </div>

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
          {reports.length > 0 ? (
            reports.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">
                  {new Date(item.publish_date).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}