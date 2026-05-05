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
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Sub Committee Categories
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="">Select Category</option>

        {TYPE_OPTIONS.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <button className="bg-green-600 text-white px-4 py-3 rounded w-full sm:w-auto">
        Add
      </button>

    </form>

    {/* LIST */}
    <div className="space-y-3">

      {data.map((c) => (
        <div
          key={c.id}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border bg-white p-4 rounded shadow-sm"
        >
          <p className="break-words font-medium">
            {c.label}
          </p>

          <button
            onClick={() => handleDelete(c.id)}
            className="text-red-500 w-full sm:w-auto text-left"
          >
            Delete
          </button>
        </div>
      ))}

    </div>

  </div>
);
}