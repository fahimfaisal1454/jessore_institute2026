import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../api/AxiosInstance";

export default function CommitteeMemberForm() {
  const [form, setForm] = useState({
    committee: "",
    committee_role: "",
    member_name: "",
    member_number: "",
    order: 0,
    image: null,
  });

  const [committeeTitle, setCommitteeTitle] = useState("");
  const [committees, setCommittees] = useState([]);
  const [editingCommitteeId, setEditingCommitteeId] = useState(null);

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [selectedCommittee, setSelectedCommittee] = useState("");

  // FETCH MEMBERS
  const fetchData = () => {
    AxiosInstance.get("admin/committee/members/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  // FETCH COMMITTEES
  const fetchCommittees = () => {
    AxiosInstance.get("admin/committee/committees/")
      .then((res) => setCommittees(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
    fetchCommittees();
  }, []);

  // FORM CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // SAVE / UPDATE TITLE
  const handleCommitteeTitleSave = () => {
    if (!committeeTitle.trim()) return;

    const request = editingCommitteeId
      ? AxiosInstance.patch(
          `admin/committee/committees/${editingCommitteeId}/`,
          {
            title: committeeTitle,
          }
        )
      : AxiosInstance.post(
          "admin/committee/committees/",
          {
            title: committeeTitle,
            is_active: false,
          }
        );

    request
      .then(() => {
        setCommitteeTitle("");
        setEditingCommitteeId(null);
        fetchCommittees();
      })
      .catch(console.error);
  };

  // SET ACTIVE
  const handleSetActiveCommittee = (id) => {
    const requests = committees.map((committee) =>
      AxiosInstance.patch(
        `admin/committee/committees/${committee.id}/`,
        {
          title: committee.title,
          is_active: committee.id === id,
        }
      )
    );

    Promise.all(requests)
      .then(fetchCommittees)
      .catch(console.error);
  };

  // EDIT TITLE
  const handleCommitteeEdit = (committee) => {
    setCommitteeTitle(committee.title);
    setEditingCommitteeId(committee.id);
  };

  // DELETE TITLE
  const handleCommitteeDelete = (id) => {
    AxiosInstance.delete(`admin/committee/committees/${id}/`)
      .then(fetchCommittees)
      .catch(console.error);
  };

  // SUBMIT MEMBER
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("committee", form.committee);
    formData.append("committee_role", form.committee_role);
    formData.append("member_name", form.member_name);
    formData.append("member_number", form.member_number);
    formData.append("order", form.order);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    const request = editingId
      ? AxiosInstance.patch(
          `admin/committee/members/${editingId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      : AxiosInstance.post(
          "admin/committee/members/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

    request
      .then(() => {
        fetchData();
        resetForm();
      })
      .catch(console.error);
  };

  // EDIT MEMBER
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      committee: item.committee || "",
      committee_role: item.committee_role,
      member_name: item.member_name,
      member_number: item.member_number || "",
      order: item.order,
      image: null,
    });
  };

  // DELETE MEMBER
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/committee/members/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      committee: "",
      committee_role: "",
      member_name: "",
      member_number: "",
      order: 0,
      image: null,
    });

    setEditingId(null);
  };

  // FILTER MEMBERS
  const filteredMembers = selectedCommittee
    ? data.filter(
        (member) =>
          String(member.committee) === String(selectedCommittee)
      )
    : data;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Committee Management
          </h2>
          <p className="text-gray-500 mt-1">
            Manage committee titles and members professionally
          </p>
        </div>

        <Link
          to="/dashboard/committee/list"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg shadow font-medium transition"
        >
          View Full Member List
        </Link>
      </div>

      {/* COMMITTEE TITLES */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Committee Titles
        </h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={committeeTitle}
            onChange={(e) => setCommitteeTitle(e.target.value)}
            placeholder="Enter Committee Title"
            className="flex-1 border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="button"
            onClick={handleCommitteeTitleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
          >
            {editingCommitteeId ? "Update Title" : "Add Title"}
          </button>
        </div>

        <div className="grid gap-3">
          {committees.map((committee) => (
            <div
              key={committee.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <span className="font-medium">
                {committee.title}
              </span>

              <div className="flex gap-4 items-center">
                {committee.is_active ? (
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleSetActiveCommittee(committee.id)
                    }
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Set Active
                  </button>
                )}

                <button
                  onClick={() => handleCommitteeEdit(committee)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleCommitteeDelete(committee.id)
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

      {/* MEMBER FORM */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
        <h3 className="text-xl font-semibold mb-6">
          {editingId
            ? "Edit Committee Member"
            : "Add Committee Member"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <select
            name="committee"
            value={form.committee}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Committee</option>
            {committees.map((committee) => (
              <option key={committee.id} value={committee.id}>
                {committee.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="committee_role"
            value={form.committee_role}
            onChange={handleChange}
            placeholder="Committee Role"
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="member_name"
            value={form.member_name}
            onChange={handleChange}
            placeholder="Member Name"
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="member_number"
            value={form.member_number}
            onChange={handleChange}
            placeholder="Membership Number"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            placeholder="Display Order"
            className="border p-3 rounded-lg"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {form.image && (
            <div className="md:col-span-2">
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="w-28 h-32 object-cover rounded-lg border"
              />
            </div>
          )}

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {editingId ? "Update Member" : "Save Member"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* FILTER */}
      <div className="flex justify-end mb-6">
        <select
          value={selectedCommittee}
          onChange={(e) =>
            setSelectedCommittee(e.target.value)
          }
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-80"
        >
          <option value="">All Committees</option>

          {committees.map((committee) => (
            <option key={committee.id} value={committee.id}>
              {committee.title}
            </option>
          ))}
        </select>
      </div>

      {/* MEMBER LIST */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Added Members
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-5"
            >
              <div className="flex gap-4">
                <img
                  src={item.image || "/no-image.png"}
                  alt={item.member_name}
                  className="w-24 h-28 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {item.committee_title || "-"}
                  </p>

                  <h4 className="font-bold text-lg">
                    {index + 1}. {item.committee_role}
                  </h4>

                  <p className="mt-2">{item.member_name}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    Member No: {item.member_number || "-"}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Order: {item.order}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 mt-5 border-t pt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}