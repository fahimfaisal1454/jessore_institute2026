import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const AnnualReportForm = () => {
  const [form, setForm] = useState({
    title: "",
    publish_date: "",
    file: null,
  });

  const [reports, setReports] = useState([]);

  // ✅ FETCH REPORTS
  const fetchReports = async () => {
    try {
      const res = await axios.get("/admin/reports/");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("publish_date", form.publish_date);
    formData.append("file", form.file);

    try {
      await axios.post("/admin/reports/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        title: "",
        publish_date: "",
        file: null,
      });

      fetchReports();
    } catch (err) {
      console.error("Upload error:", err.response?.data);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/reports/${id}/`);
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper title="Annual Reports">

      {/* 🔼 FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="publish_date"
          value={form.publish_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input type="file" onChange={handleFileChange} />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {/* 📄 LIST */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="mb-4 font-semibold">All Reports</h3>

        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">File</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.length > 0 ? (
              reports.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{index + 1}</td>

                  <td className="border p-2">{item.title}</td>

                  <td className="border p-2">
                    {item.publish_date}
                  </td>

                  <td className="border p-2 text-center">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>

                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </FormWrapper>
  );
};

export default AnnualReportForm;