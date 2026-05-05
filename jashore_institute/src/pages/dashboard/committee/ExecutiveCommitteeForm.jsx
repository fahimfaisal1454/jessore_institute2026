import { useEffect, useState } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const ExecutiveCommitteeForm = () => {
  const [data, setData] = useState({
    president: { id: null, name: "", image: null, preview: "" },
    secretary: { id: null, name: "", image: null, preview: "" },
  });

  const [loading, setLoading] = useState(false);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const res = await axios.get("/committee/executive/");
      const list = res.data || [];

      const newData = {
        president: { id: null, name: "", image: null, preview: "" },
        secretary: { id: null, name: "", image: null, preview: "" },
      };

      list.forEach((item) => {
        if (item.position === "president") {
          newData.president = {
            id: item.id,
            name: item.name || "",
            image: null,
            preview: item.image || "",
          };
        }

        if (item.position === "secretary") {
          newData.secretary = {
            id: item.id,
            name: item.name || "",
            image: null,
            preview: item.image || "",
          };
        }
      });

      setData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT CHANGE
  const handleChange = (type, field, value) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  // IMAGE CHANGE
  const handleImage = (type, file) => {
    if (!file) return;

    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        image: file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  // SAVE
  const handleSave = async (type) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("position", type);
      formData.append("name", data[type].name);

      // Always append new image if selected
      if (data[type].image) {
        formData.append("image", data[type].image);
      }

      if (data[type].id) {
        // UPDATE
        await axios.put(
          `/admin/committee/executive/${data[type].id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Updated successfully ✅");
      } else {
        // CREATE
        await axios.post(
          `/admin/committee/executive/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Saved successfully ✅");
      }

      // Reset file state
      setData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          image: null,
        },
      }));

      fetchData();
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <FormWrapper title="Executive Committee">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PRESIDENT */}
        <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg">
            President
          </h3>

          <input
            type="text"
            value={data.president.name}
            onChange={(e) =>
              handleChange("president", "name", e.target.value)
            }
            placeholder="Name"
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleImage("president", file);
              }
            }}
            className="w-full text-sm"
          />

          {data.president.preview && (
            <img
              src={data.president.preview}
              className="w-32 h-32 object-cover rounded border"
              alt="President"
            />
          )}

          <button
            onClick={() => handleSave("president")}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* SECRETARY */}
        <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg">
            Secretary
          </h3>

          <input
            type="text"
            value={data.secretary.name}
            onChange={(e) =>
              handleChange("secretary", "name", e.target.value)
            }
            placeholder="Name"
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleImage("secretary", file);
              }
            }}
            className="w-full text-sm"
          />

          {data.secretary.preview && (
            <img
              src={data.secretary.preview}
              className="w-32 h-32 object-cover rounded border"
              alt="Secretary"
            />
          )}

          <button
            onClick={() => handleSave("secretary")}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </FormWrapper>
  );
};

export default ExecutiveCommitteeForm;