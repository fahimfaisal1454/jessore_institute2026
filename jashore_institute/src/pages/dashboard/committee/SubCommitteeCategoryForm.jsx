import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function SubCommitteeCategoryForm() {
  const [data, setData] = useState([]);
  const [subCommittees, setSubCommittees] = useState([]);

  // =========================
  // TITLE MANAGEMENT
  // =========================
  const [subCommitteeTitle, setSubCommitteeTitle] =
    useState("");

  const [editingSubCommitteeId, setEditingSubCommitteeId] =
    useState(null);

  // =========================
  // FORM STATE
  // =========================
  const [selectedSubCommittee, setSelectedSubCommittee] =
    useState("");

  const [type, setType] = useState("");

  // =========================
  // FILTER STATE
  // =========================
  const [filterSubCommittee, setFilterSubCommittee] =
    useState("");

  const TYPE_OPTIONS = [
    { value: "library", label: "লাইব্রেরি বিভাগ" },
    { value: "sports", label: "ক্রীড়া বিভাগ" },
    { value: "drama", label: "নাট্যকলা সংসদ" },
    { value: "town", label: "টাউন ক্লাব" },
    { value: "issue", label: "ইস্যু বিভাগ" },
  ];

  // =========================
  // FETCH SUB COMMITTEES
  // =========================
  const fetchSubCommittees = () => {
    AxiosInstance.get("admin/committee/subcommittees/")
      .then((res) => setSubCommittees(res.data))
      .catch(console.error);
  };

  // =========================
  // FETCH CATEGORY DATA
  // =========================
  const fetchData = () => {
    AxiosInstance.get("admin/committee/sub-categories/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSubCommittees();
    fetchData();
  }, []);

  // =========================
  // SAVE SUB TITLE
  // =========================
  const handleSubCommitteeTitleSave = () => {
    if (!subCommitteeTitle.trim()) return;

    const request = editingSubCommitteeId
      ? AxiosInstance.patch(
          `admin/committee/subcommittees/${editingSubCommitteeId}/`,
          {
            title: subCommitteeTitle,
          }
        )
      : AxiosInstance.post(
          "admin/committee/subcommittees/",
          {
            title: subCommitteeTitle,
            is_active: false,
          }
        );

    request
      .then(() => {
        setSubCommitteeTitle("");
        setEditingSubCommitteeId(null);
        fetchSubCommittees();
      })
      .catch(console.error);
  };

  // =========================
  // SET ACTIVE TITLE
  // =========================
  const handleSetActiveSubCommittee = (id) => {
    const requests = subCommittees.map((sub) =>
      AxiosInstance.patch(
        `admin/committee/subcommittees/${sub.id}/`,
        {
          title: sub.title,
          is_active: sub.id === id,
        }
      )
    );

    Promise.all(requests)
      .then(fetchSubCommittees)
      .catch(console.error);
  };

  // =========================
  // EDIT TITLE
  // =========================
  const handleSubCommitteeEdit = (sub) => {
    setSubCommitteeTitle(sub.title);
    setEditingSubCommitteeId(sub.id);
  };

  // =========================
  // DELETE TITLE
  // =========================
  const handleSubCommitteeDelete = (id) => {
    if (!window.confirm("Delete this title?")) return;

    AxiosInstance.delete(
      `admin/committee/subcommittees/${id}/`
    )
      .then(fetchSubCommittees)
      .catch(console.error);
  };

  // =========================
  // SUBMIT CATEGORY
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubCommittee) {
      alert("Select Sub Committee Title");
      return;
    }

    if (!type) {
      alert("Select category type");
      return;
    }

    AxiosInstance.post(
      "admin/committee/sub-categories/",
      {
        subcommittee: selectedSubCommittee,
        type,
      }
    )
      .then(() => {
        fetchData();
        setSelectedSubCommittee("");
        setType("");
      })
      .catch((err) => {
        alert("Already exists or error");
        console.error(err);
      });
  };

  // =========================
  // DELETE CATEGORY
  // =========================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;

    AxiosInstance.delete(
      `admin/committee/sub-categories/${id}/`
    )
      .then(fetchData)
      .catch(console.error);
  };

  // =========================
  // FILTERED DATA
  // =========================
  const filteredData = filterSubCommittee
    ? data.filter(
        (item) =>
          String(item.subcommittee) ===
          String(filterSubCommittee)
      )
    : data;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Sub Committee Categories
      </h2>

      {/* ========================= */}
      {/* SUB TITLE SECTION */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-md border p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">
          Sub Committee Titles
        </h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={subCommitteeTitle}
            onChange={(e) =>
              setSubCommitteeTitle(e.target.value)
            }
            placeholder="Enter Sub Committee Title"
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            type="button"
            onClick={handleSubCommitteeTitleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            {editingSubCommitteeId
              ? "Update Title"
              : "Add Title"}
          </button>
        </div>

        <div className="space-y-3">
          {subCommittees.map((sub) => (
            <div
              key={sub.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <span>{sub.title}</span>

              <div className="flex gap-4">
                {sub.is_active ? (
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleSetActiveSubCommittee(
                        sub.id
                      )
                    }
                    className="text-purple-600"
                  >
                    Set Active
                  </button>
                )}

                <button
                  onClick={() =>
                    handleSubCommitteeEdit(sub)
                  }
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleSubCommitteeDelete(
                      sub.id
                    )
                  }
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* FORM SECTION */}
      {/* ========================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl shadow-sm p-6 mb-8 space-y-4"
      >
        <h3 className="text-lg font-semibold border-b pb-2">
          Add New Category
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedSubCommittee}
            onChange={(e) =>
              setSelectedSubCommittee(e.target.value)
            }
            className="border rounded-lg p-3 w-full"
          >
            <option value="">
              Select Sub Committee Title
            </option>

            {subCommittees.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="border rounded-lg p-3 w-full"
          >
            <option value="">
              Select Category
            </option>

            {TYPE_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Add Category
        </button>
      </form>

      {/* ========================= */}
      {/* FILTER SECTION */}
      {/* ========================= */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
          Filter by Sub Committee Title
        </h3>

        <select
          value={filterSubCommittee}
          onChange={(e) =>
            setFilterSubCommittee(e.target.value)
          }
          className="border rounded-lg p-3 w-full md:w-1/2"
        >
          <option value="">
            All Sub Committees
          </option>

          {subCommittees.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.title}
            </option>
          ))}
        </select>
      </div>

      {/* ========================= */}
      {/* TABLE SECTION */}
      {/* ========================= */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-4 border-b">#</th>
                <th className="px-6 py-4 border-b">
                  Sub Committee Title
                </th>
                <th className="px-6 py-4 border-b">
                  Category
                </th>
                <th className="px-6 py-4 border-b text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(
                  (item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 border-b">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 border-b font-medium text-gray-800">
                        {
                          item.subcommittee_title
                        }
                      </td>

                      <td className="px-6 py-4 border-b text-gray-600">
                        {item.label}
                      </td>

                      <td className="px-6 py-4 border-b text-center">
                        <button
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}