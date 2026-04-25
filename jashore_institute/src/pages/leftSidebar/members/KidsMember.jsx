import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import MemberTable from "../../../components/shared/MemberTable";

export default function KidsMember() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchKidsMembers = async () => {
      try {
        const res = await AxiosInstance.get("members/child/");

        // 🔄 format for table
        const formatted = res.data.map((item) => ({
          memberNo: item.member_no,
          name: item.name,
          date: item.date,
          type: "শিশু সদস্য",
          mobile: item.mobile,
          image: item.image,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Kids member fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsMembers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-500">
        Loading Kids Members...
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

  return (
    <MemberTable
      title="শিশু চিত্তবিনোদন কেন্দ্র সদস্য তালিকা"
      data={data}
    />
  );
}