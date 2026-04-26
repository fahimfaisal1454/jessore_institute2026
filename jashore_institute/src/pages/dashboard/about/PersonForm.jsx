import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const PersonForm = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ✅ FETCH EXISTING DATA
  const fetchData = async () => {
    try {
      const res = await axios.get("/admin/person/");
      
      if (res.data.length > 0) {
        const item = res.data[0]; // only one
        setForm({
          title: item.title,
          content: item.content,
        });
        setEditingId(item.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ SUBMIT (CREATE OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/admin/person/${editingId}/`, form);
        alert("Updated successfully");
      } else {
        await axios.post("/admin/person/", form);
        alert("Created successfully");
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper title="Person">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Name"
          value={form.title}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Description"
          value={form.content}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Save"}
        </button>

      </form>
    </FormWrapper>
  );
};

export default PersonForm;