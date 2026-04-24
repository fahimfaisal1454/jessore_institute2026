import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import CommitteeMembers from "../../components/shared/CommitteeMembers";

export default function Drama() {
  const [head, setHead] = useState(null);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(
          "committee/subcommittee/drama/"
        );

        setHead(res?.data?.head || null);
        setMembers(res?.data?.members || []);
        setTitle(res?.data?.title || "");
      } catch (err) {
        setError("ডাটা লোড করা যায়নি");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <CommitteeMembers
      title={title}
      head={
        head
          ? {
              name: head.name,
              role: head.role,
              img: head.image || "/default.png",
            }
          : null
      }
      members={members.map((m) => ({
        name: m.name,
        role: m.role,
        img: m.image || "/default.png",
      }))}
    />
  );
}