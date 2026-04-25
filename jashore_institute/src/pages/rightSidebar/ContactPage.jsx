import { useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    AxiosInstance.post("aboutus/contact/", form)
      .then(() => {
        setSuccess("Message sent successfully");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        setError("Failed to send message");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white border border-gray-300 p-4">

      <h2 className="text-xl font-semibold mb-4">যোগাযোগ</h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="নাম"
            className="w-full border p-2"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ইমেইল"
            className="w-full border p-2"
            required
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="ফোন নাম্বার"
            className="w-full border p-2"
          />

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="সাবজেক্ট"
            className="w-full border p-2"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="মেসেজ"
            rows={6}
            className="w-full border p-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}

        </form>

        {/* MAP */}
        <div>
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Jessore%20Institute%20Public%20Library&output=embed"
            className="w-full h-[350px] border"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
}