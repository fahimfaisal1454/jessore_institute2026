import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function OldCommitteeCategoryForm() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const TYPE_OPTIONS = [
    { value: "president", label: "সভাপতি গণের তালিকা" },
    { value: "secretary", label: "সাধারণ সম্পাদক তালিকা" },
    { value: "drama", label: "সম্পাদক, নাট্যকলা সংসদ" },
    { value: "sports", label: "সম্পাদক, ক্রীড়া সংসদ" },
    { value: "library", label: "সম্পাদক, লাইব্রেরি বিভাগ" },
    { value: "townclub", label: "সম্পাদক, টাউন ক্লাব" },
    { value: "kids", label: "সম্পাদক, শিশু চিকিৎসা কেন্দ্র" },
  ];

  // 🔥 FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/oldcommittee/old-categories/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 CREATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type) {
      alert("Select category");
      return;
    }

    AxiosInstance.post("admin/oldcommittee/old-categories/", { type })
      .then(() => {
        fetchData();
        setType("");
      })
      .catch((err) => {
        alert("Already exists or error");
        console.error(err);
      });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/oldcommittee/old-categories/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Old Committee Categories
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-4 py-2">
          Add
        </button>

      </form>

      {/* LIST */}
      <div className="space-y-2">

        {data.map((c) => {
          const label =
            TYPE_OPTIONS.find((t) => t.value === c.type)?.label || c.type;

          return (
            <div
              key={c.id}
              className="flex justify-between items-center border p-3"
            >
              <p>{label}</p>

              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          );
        })}

      </div>

    </div>
  );
}