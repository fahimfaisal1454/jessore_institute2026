import React, { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const ContactMessageAdmin = () => {
  const [messages, setMessages] = useState([]);

  // ✅ FETCH
  const fetchMessages = async () => {
    try {
      const res = await axios.get("/admin/contactus/");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/contactus/${id}/`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

 return (
  <FormWrapper title="Contact Messages">

    <div className="bg-white p-4 sm:p-6 rounded shadow">

      {messages.length === 0 && (
        <p className="text-gray-500">No messages found</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 rounded space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="font-bold break-words">
                {msg.name}
              </p>

              <button
                onClick={() => handleDelete(msg.id)}
                className="bg-red-500 text-white px-3 py-2 rounded text-sm w-full sm:w-auto"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-gray-600 break-words">
              {msg.email}
            </p>

            {msg.phone && (
              <p className="text-sm text-gray-600 break-words">
                Phone: {msg.phone}
              </p>
            )}

            <p className="font-semibold break-words">
              {msg.subject}
            </p>

            <p className="text-gray-700 whitespace-pre-line break-words">
              {msg.message}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>

  </FormWrapper>
);
};

export default ContactMessageAdmin;