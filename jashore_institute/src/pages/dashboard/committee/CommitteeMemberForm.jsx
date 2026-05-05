import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function CommitteeMemberForm() {
  const [form, setForm] = useState({
    committee_role: "",
    member_name: "",
    member_number: "",
    order: 0,
    image: null,
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // FETCH
  const fetchData = () => {
    AxiosInstance.get("admin/committee/members/")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

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

  // EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      committee_role: item.committee_role,
      member_name: item.member_name,
      member_number: item.member_number || "",
      order: item.order,
      image: null,
    });
  };

  // DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/committee/members/${id}/`)
      .then(fetchData)
      .catch(console.error);
  };

  // RESET
  const resetForm = () => {
    setForm({
      committee_role: "",
      member_name: "",
      member_number: "",
      order: 0,
      image: null,
    });

    setEditingId(null);
  };

  return (
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      {editingId ? "Edit Committee Member" : "Add Committee Member"}
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white border p-4 sm:p-6 rounded shadow-sm space-y-4 mb-10"
    >

      <input
        type="text"
        name="committee_role"
        value={form.committee_role}
        onChange={handleChange}
        placeholder="পদবী / Committee Role"
        className="border p-3 w-full rounded"
        required
      />

      <input
        type="text"
        name="member_name"
        value={form.member_name}
        onChange={handleChange}
        placeholder="কর্মকর্তার নাম / Member Name"
        className="border p-3 w-full rounded"
        required
      />

      <input
        type="text"
        name="member_number"
        value={form.member_number}
        onChange={handleChange}
        placeholder="সদস্য নম্বর / Membership Number"
        className="border p-3 w-full rounded"
      />

      <input
        type="number"
        name="order"
        value={form.order}
        onChange={handleChange}
        placeholder="Display Order"
        className="border p-3 w-full rounded"
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {/* PREVIEW */}
      {form.image && (
        <img
          src={URL.createObjectURL(form.image)}
          alt="Preview"
          className="w-24 h-28 object-cover border rounded"
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full sm:w-auto"
        >
          {editingId ? "Update" : "Save"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-6 py-3 rounded w-full sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>

    </form>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

      {data.map((item, index) => (
        <div
          key={item.id}
          className="border bg-white shadow-sm p-4 rounded"
        >

          <div className="flex flex-col sm:flex-row gap-4">

            <img
              src={item.image || "/no-image.png"}
              alt={item.member_name}
              className="w-24 h-28 sm:w-20 sm:h-24 object-cover border rounded mx-auto sm:mx-0"
            />

            <div className="flex-1">

              <p className="font-bold text-sm break-words">
                {index + 1}. {item.committee_role}
              </p>

              <p className="text-sm mt-2 font-medium break-words">
                {item.member_name}
              </p>

              <p className="text-sm mt-2 break-words">
                Member No: {item.member_number || "-"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Order: {item.order}
              </p>

            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => handleEdit(item)}
              className="text-blue-600 text-sm font-medium w-full sm:w-auto text-left"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 text-sm font-medium w-full sm:w-auto text-left"
            >
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>

  </div>
);
}