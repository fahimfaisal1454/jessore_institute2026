import React, { useState } from "react";

export default function BookEntryForm() {
  const [formData, setFormData] = useState({
    serial: "33170",
    accession_no: "",
    accession_date: "",
    book_name: "",
    author_name: "",
    editor_name: "",
    donor_name: "",
    category: "",
    price: "",
    publisher: "",
    publish_place: "",
    publish_date: "",
    edition: "",
    pages: "",
    medium: "",
    binding: "",
    floor: "",
    shelf: "",
    call_no: "",
    barcode: "33170",
    remarks: "",
  });

  const [showList, setShowList] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", formData);

    alert("Book saved successfully!");
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setFormData({
      serial: "33170",
      accession_no: "",
      accession_date: "",
      book_name: "",
      author_name: "",
      editor_name: "",
      donor_name: "",
      category: "",
      price: "",
      publisher: "",
      publish_place: "",
      publish_date: "",
      edition: "",
      pages: "",
      medium: "",
      binding: "",
      floor: "",
      shelf: "",
      call_no: "",
      barcode: "33170",
      remarks: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP HEADER */}
      <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-semibold">
          Admin Panel
        </h1>

        <div className="text-2xl">
          👤
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        <div className="bg-white border shadow-sm">

          {/* FORM TOP BAR */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-medium">
              Add-Edit বই
            </h2>

            <button
              onClick={() => setShowList(!showList)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              View List
            </button>
          </div>

          {/* FORM BODY */}
          <form
            onSubmit={handleSubmit}
            className="p-6"
          >
            <h3 className="text-md font-semibold mb-4 border-b pb-2">
              বইয়ের তথ্য :
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

              <InputField label="১. ক্রমিক:" name="serial" value={formData.serial} onChange={handleChange} />
              <InputField label="২. সংযোজন সংখ্যা:" name="accession_no" value={formData.accession_no} onChange={handleChange} required />
              <InputField label="৩. সংযোজন তারিখ:" name="accession_date" type="date" value={formData.accession_date} onChange={handleChange} required />
              <InputField label="৪. বইয়ের নাম:" name="book_name" value={formData.book_name} onChange={handleChange} required />
              <InputField label="৫. লেখকের নাম:" name="author_name" value={formData.author_name} onChange={handleChange} />
              <InputField label="৬. সম্পাদকের নাম:" name="editor_name" value={formData.editor_name} onChange={handleChange} />

              <InputField label="৭. অনুদাতার নাম:" name="donor_name" value={formData.donor_name} onChange={handleChange} />

              <SelectField
                label="৮. বইয়ের শ্রেণী:"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  "উপন্যাস",
                  "গবেষণা",
                  "ধর্মীয়",
                  "বিজ্ঞান",
                  "ইতিহাস",
                ]}
              />

              <InputField label="৯. কল নম্বর:" name="call_no" value={formData.call_no} onChange={handleChange} required />
              <InputField label="১০. প্রকাশক:" name="publisher" value={formData.publisher} onChange={handleChange} />
              <InputField label="১১. প্রকাশের স্থান:" name="publish_place" value={formData.publish_place} onChange={handleChange} />
              <InputField label="১২. প্রকাশের তারিখ:" name="publish_date" type="date" value={formData.publish_date} onChange={handleChange} />

              <InputField label="১৩. সংস্করণ:" name="edition" value={formData.edition} onChange={handleChange} />
              <InputField label="১৪. মূল্য/দাম:" name="price" value={formData.price} onChange={handleChange} required />
              <InputField label="১৫. বইয়ের পৃষ্ঠা সংখ্যা:" name="pages" value={formData.pages} onChange={handleChange} />

              <SelectField
                label="১৬. বই সংরক্ষণের মাধ্যম:"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                options={[
                  "হার্ড কপি",
                  "সফট কপি",
                  "লাইব্রেরি",
                ]}
              />

              <InputField label="১৭. বিন্ডিং:" name="binding" value={formData.binding} onChange={handleChange} required />
              <InputField label="১৮. কত তলা:" name="floor" value={formData.floor} onChange={handleChange} required />
              <InputField label="১৯. আলমারি:" name="shelf" value={formData.shelf} onChange={handleChange} required />
              <InputField label="২০. তাক নং:" name="shelf_no" value={formData.shelf_no} onChange={handleChange} required />
              <InputField label="২১. বার কোড:" name="barcode" value={formData.barcode} onChange={handleChange} />

              <div className="lg:col-span-2">
                <label className="block mb-1 font-medium">
                  ২২. মন্তব্য:
                </label>

                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

// =========================
// REUSABLE INPUT FIELD
// =========================
function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

// =========================
// REUSABLE SELECT FIELD
// =========================
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select</option>

        {options.map((option, index) => (
          <option
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}