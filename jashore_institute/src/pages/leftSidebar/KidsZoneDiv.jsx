import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import DivisionPage from "../../components/shared/DivisionPage";

export default function KidsZoneDiv() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("divisions/child/");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load Kids Zone:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-500">
        Loading Kids Zone...
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }

  // ⚠️ Empty data safety
  if (!data) {
    return (
      <div className="text-center py-10 text-gray-500">
        No data available.
      </div>
    );
  }

  return (
    <DivisionPage
      title={data.title || "No Title"}
      author={data.author || ""}
      content={data.content || ""}
      image={data.image || null}
    />
  );
}