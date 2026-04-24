import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import CommitteeHistory from "../../components/shared/CommitteeHistory";

export default function IssueOld() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(
          "committee/subcommittee/issue/old/"
        );

        if (!isMounted) return;

        setData(res?.data?.data || []);
        setTitle(res?.data?.title || "");
      } catch (err) {
        if (!isMounted) return;

        setError("ডাটা লোড করা যায়নি");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        Loading...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return <CommitteeHistory title={title} data={data} />;
}