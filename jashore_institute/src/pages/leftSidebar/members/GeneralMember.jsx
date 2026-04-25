import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import MemberTable from "../../../components/shared/MemberTable";

export default function GeneralMember() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGeneral = async () => {
      try {
        const res = await AxiosInstance.get("members/general/");

        // 🔄 format for table
        const formatted = res.data.map((item) => ({
          memberNo: item.member_no,
          name: item.name,
          date: item.date,
          type: "সাধারণ সদস্য",
          mobile: item.mobile,
          image: item.image,
        }));

        setData(formatted);
      } catch (err) {
        console.error("General fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneral();
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-500">
        Loading General Members...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load data.
      </div>
    );
  }

  return (
    <MemberTable
      title="সাধারণ সদস্য তালিকা"
      data={data}
    />
  );
}