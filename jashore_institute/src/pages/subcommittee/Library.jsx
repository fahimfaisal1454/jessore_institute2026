import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import CommitteeMembers from "../../components/shared/CommitteeMembers";

export default function Library() {
  const [title, setTitle] = useState("");
  const [head, setHead] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(
          "committee/subcommittee/library/"
        );

        if (!isMounted) return;

        setTitle(res?.data?.title || "");
        setHead(res?.data?.head || null);
        setMembers(res?.data?.members || []);
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