import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import SectionHeader from "../shared/SectionHeader";
import { useNavigate } from "react-router-dom";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await AxiosInstance.get("notice/");
        setNotices(res.data.slice(0, 10)); // ✅ latest 10
      } catch (err) {
        console.error("NoticeBoard error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="bg-white border shadow-sm p-4 text-center text-gray-500 animate-pulse">
        Loading notices...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="bg-white border shadow-sm p-4 text-center text-red-500">
        Failed to load notices.
      </div>
    );
  }

  return (
    <div className="bg-white border shadow-sm">

      {/* Header */}
      <SectionHeader title="নোটিশ বোর্ড" />

      {/* Notice List */}
      <div className="p-3 space-y-2 text-sm">
        {notices.map((notice) => (
          <p
            key={notice.id}
            onClick={() => navigate("/notice")} // 👉 go to full page
            className="border-b pb-1 cursor-pointer hover:text-blue-600"
          >
            {notice.title}
          </p>
        ))}

        {notices.length === 0 && (
          <p className="text-gray-500 text-center py-2">
            কোনো নোটিশ পাওয়া যায়নি
          </p>
        )}
      </div>

      {/* Button */}
      <div className="p-3 text-right">
        <button
          onClick={() => navigate("/notice")}
          className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700"
        >
          আরও দেখুন
        </button>
      </div>

    </div>
  );
}