import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function VoterList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await AxiosInstance.get("members/voters/")
        setData(res.data);
      } catch (err) {
        console.error("Voter list fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading voter lists...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load voter lists.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white">

      {/* Title */}
      <h1 className="text-3xl font-bold text-pink-500 text-center mb-6">
        বিগত বছরের ভোটার তালিকা
      </h1>

      {/* List */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center gap-3"
          >

            {/* Year */}
            <div className="border px-4 py-2 rounded-md w-full md:w-1/3 font-semibold">
              ভোটার তালিকা {item.year} খ্রি.
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">

              {item.donor_pdf && (
                <a
                  href={item.donor_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-4 py-1 rounded-md hover:bg-gray-100"
                >
                  দাতা সদস্য
                </a>
              )}

              {item.life_pdf && (
                <a
                  href={item.life_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-4 py-1 rounded-md hover:bg-gray-100"
                >
                  আজীবন সদস্য
                </a>
              )}

              {item.general_pdf && (
                <a
                  href={item.general_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-4 py-1 rounded-md hover:bg-gray-100"
                >
                  সাধারণ সদস্য
                </a>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}