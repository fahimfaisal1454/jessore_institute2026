import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function SubCommitteeCategoryForm() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const TYPE_OPTIONS = [
    { value: "library", label: "লাইব্রেরি বিভাগ" },
    { value: "sports", label: "ক্রীড়া বিভাগ" },
    { value: "drama", label: "নাট্যকলা সংসদ" },
    { value: "town", label: "টাউন ক্লাব" },
    { value: "issue", label: "ইস্যু বিভাগ" },
  ];

  // 🔥 FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/committee/sub-categories/")
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
      alert("Select category type");
      return;
    }

    AxiosInstance.post("admin/committee/sub-categories/", { type })
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
    AxiosInstance.delete(`admin/committee/sub-categories/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Sub Committee Categories
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

        {data.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center border p-3"
          >
            <p>{c.label}</p>

            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}