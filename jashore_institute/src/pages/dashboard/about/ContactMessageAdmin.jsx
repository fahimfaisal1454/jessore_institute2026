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

      <div className="bg-white p-4 rounded shadow">

        {messages.length === 0 && (
          <p className="text-gray-500">No messages found</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 mb-3 rounded space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold">{msg.name}</p>
              <button
                onClick={() => handleDelete(msg.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-gray-600">{msg.email}</p>

            {msg.phone && (
              <p className="text-sm text-gray-600">
                Phone: {msg.phone}
              </p>
            )}

            <p className="font-semibold">{msg.subject}</p>

            <p className="text-gray-700 whitespace-pre-line">
              {msg.message}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}

      </div>

    </FormWrapper>
  );
};

export default ContactMessageAdmin;