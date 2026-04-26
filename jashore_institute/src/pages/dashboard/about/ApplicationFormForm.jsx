import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const ApplicationFormForm = () => {
  const [form, setForm] = useState({
    type: "field",
    title: "",
    file: null,
  });

  const [forms, setForms] = useState([]);

  // ✅ FETCH ALL
  const fetchForms = async () => {
    try {
      const res = await axios.get("/admin/forms/");
      setForms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FILE
  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  // ✅ SUBMIT (CREATE OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Upload file first");
      return;
    }

    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("file", form.file);

    try {
      // check if exists
      const existing = forms.find((f) => f.type === form.type);

      if (existing) {
        await axios.put(`/admin/forms/${existing.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/admin/forms/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        type: "field",
        title: "",
        file: null,
      });

      fetchForms();
    } catch (err) {
      console.error("ERROR:", err.response?.data);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/forms/${id}/`);
      fetchForms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper title="Application Forms">

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="field">Field Application</option>
          <option value="leave">Leave Application</option>
        </select>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        {/* FILE */}
        <input type="file" onChange={handleFile} />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>

      {/* LIST */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="mb-4 font-semibold">Existing Forms</h3>

        {forms.length === 0 && (
          <p className="text-gray-500">No forms found</p>
        )}

        {forms.map((item) => (
          <div
            key={item.id}
            className="border p-3 mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>

            <div className="flex gap-2">
              <a
                href={item.file}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </a>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </FormWrapper>
  );
};

export default ApplicationFormForm;