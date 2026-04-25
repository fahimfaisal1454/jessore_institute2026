import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import DivisionPage from "../../components/shared/DivisionPage";

export default function TownClubDiv() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTown = async () => {
      try {
        const res = await AxiosInstance.get("divisions/town/");
        setData(res.data);
      } catch (err) {
        console.error("TownClub fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTown();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-500">
        Loading Town Club...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load data.
      </div>
    );
  }

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