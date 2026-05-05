import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const InfoPageForm = () => {
  const [form, setForm] = useState({
    page_type: "open_liberty_stage",
    title: "",
    content: "",
  });

  const [pages, setPages] = useState([]);

  // ✅ FETCH ALL
  const fetchPages = async () => {
    try {
      const res = await axios.get("/admin/infopages/");
      setPages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT (CREATE OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existing = pages.find(
        (p) => p.page_type === form.page_type
      );

      if (existing) {
        // UPDATE
        await axios.put(`/admin/infopages/${existing.id}/`, form);
      } else {
        // CREATE
        await axios.post("/admin/infopages/", form);
      }

      setForm({
        page_type: "open_liberty_stage",
        title: "",
        content: "",
      });

      fetchPages();
    } catch (err) {
      console.error("ERROR:", err.response?.data);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/infopages/${id}/`);
      fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

 return (
  <FormWrapper title="Info Pages">

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded shadow space-y-4"
    >
      {/* TYPE */}
      <select
        name="page_type"
        value={form.page_type}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="open_liberty_stage">
          Open Liberty Stage
        </option>
        <option value="primary_school">
          Primary School
        </option>
      </select>

      {/* TITLE */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-3 rounded"
      />

      {/* CONTENT */}
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full border p-3 rounded min-h-[180px]"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto">
        Save
      </button>
    </form>

    {/* LIST */}
    <div className="mt-6 bg-white p-4 sm:p-6 rounded shadow">
      <h3 className="mb-4 font-semibold">Existing Pages</h3>

      {pages.length === 0 && (
        <p className="text-gray-500">No pages found</p>
      )}

      <div className="space-y-3">
        {pages.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <div>
              <p className="font-bold break-words">
                {item.title}
              </p>

              <p className="text-sm text-gray-500 break-words">
                {item.page_type}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>

  </FormWrapper>
);
};

export default InfoPageForm;