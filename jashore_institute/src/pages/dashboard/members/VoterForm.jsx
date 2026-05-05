import { useState, useEffect } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function VoterForm() {
  const [form, setForm] = useState({
    year: "",
    donor_pdf: null,
    life_pdf: null,
    general_pdf: null,
  });

  const [data, setData] = useState([]);

  // 🔥 FETCH DATA
  const fetchData = () => {
    AxiosInstance.get("admin/members/voters/")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach(key => {
      if (form[key]) {
        fd.append(key, form[key]);
      }
    });

    AxiosInstance.post("admin/members/voters/", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        fetchData();

        // reset form
        setForm({
          year: "",
          donor_pdf: null,
          life_pdf: null,
          general_pdf: null,
        });
      })
      .catch(err => console.error(err.response?.data || err));
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    AxiosInstance.delete(`admin/members/voters/${id}/`)
      .then(fetchData)
      .catch(err => console.error(err));
  };

return (
  <div className="p-4 sm:p-6">

    <h2 className="text-xl sm:text-2xl font-bold mb-6">
      Voter Lists
    </h2>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="space-y-5 mb-8 bg-white border p-4 sm:p-6 rounded shadow-sm"
    >

      <input
        name="year"
        value={form.year}
        placeholder="Year (e.g. 2023-2024)"
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {/* FILE INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm font-medium block mb-2">
            Donor PDF
          </label>

          <input
            type="file"
            name="donor_pdf"
            onChange={handleChange}
            className="border p-3 w-full rounded text-sm"
          />

          {form.donor_pdf && (
            <p className="text-xs mt-2 break-words">
              {form.donor_pdf.name}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Life PDF
          </label>

          <input
            type="file"
            name="life_pdf"
            onChange={handleChange}
            className="border p-3 w-full rounded text-sm"
          />

          {form.life_pdf && (
            <p className="text-xs mt-2 break-words">
              {form.life_pdf.name}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            General PDF
          </label>

          <input
            type="file"
            name="general_pdf"
            onChange={handleChange}
            className="border p-3 w-full rounded text-sm"
          />

          {form.general_pdf && (
            <p className="text-xs mt-2 break-words">
              {form.general_pdf.name}
            </p>
          )}
        </div>

      </div>

      <button className="bg-purple-600 text-white px-4 py-3 rounded w-full sm:w-auto">
        Upload
      </button>

    </form>

    {/* LIST */}
    {data.length === 0 ? (
      <p className="text-gray-500">
        No voter lists found.
      </p>
    ) : (
      <div className="space-y-4">

        {data.map((item) => (
          <div
            key={item.id}
            className="border bg-white p-4 sm:p-5 rounded shadow-sm"
          >

            <h3 className="font-semibold text-lg mb-4 break-words">
              {item.year}
            </h3>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm">

              <a
                href={item.donor_pdf}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Donor
              </a>

              <a
                href={item.life_pdf}
                target="_blank"
                rel="noreferrer"
                className="text-green-600 underline"
              >
                Life
              </a>

              <a
                href={item.general_pdf}
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 underline"
              >
                General
              </a>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 sm:ml-auto text-left"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    )}

  </div>
);
}