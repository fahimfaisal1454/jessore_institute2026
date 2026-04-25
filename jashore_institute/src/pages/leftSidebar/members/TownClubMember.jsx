import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import MemberTable from "../../../components/shared/MemberTable";

export default function TownClubMember() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTownMembers = async () => {
      try {
        const res = await AxiosInstance.get("members/town/");

        const formatted = res.data.map((item) => ({
          memberNo: item.member_no,
          name: item.name,
          date: item.date,
          type: "টাউন ক্লাব সদস্য",
          mobile: item.mobile,
          image: item.image,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Town member fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTownMembers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-500">
        Loading Town Club Members...
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
      title="টাউন ক্লাব সদস্য তালিকা"
      data={data}
    />
  );
}