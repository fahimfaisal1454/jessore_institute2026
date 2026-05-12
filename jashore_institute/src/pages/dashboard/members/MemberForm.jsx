import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/AxiosInstance";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";

function MemberForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  const [photo, setPhoto] = useState(null);
 
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    member_code: "",
    members_number: "",
    si_no: "",
    member_type: "general",
    include_date: new Date().toISOString().split("T")[0],

    father_name: "",
    mother_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    religion: "",

    birth_certificate_no: "",
    nid_no: "",
    nationality: "Bangladeshi",
    passport_no: "",

    primary_mobile_number: "",
    secondary_mobile_number: "",
    guardian_mobile_number: "",
    email: "",

    present_address: "",
    present_area: "",
    present_thana: "",
    present_district: "",

    permanent_address: "",
    permanent_area: "",
    permanent_thana: "",
    permanent_district: "",

    form_no: "",
    admission: "",
    collateral: "",
    donation: "",

    is_active: true,
    death_date: "",
  });
useEffect(() => {
  if (isEditMode) {
    fetchMemberData();
  }
}, [id]);

const fetchMemberData = async () => {
  try {
    setLoading(true);

    const res = await axiosInstance.get(`/members/${id}/`);
    const member = res.data;

    setFormData({
      name: member.name || "",
      member_code: member.member_code || "",
      members_number: member.members_number || "",
      si_no: member.si_no || "",
      member_type: member.member_type || "general",
      include_date: member.include_date || "",

      father_name: member.father_name || "",
      mother_name: member.mother_name || "",
      date_of_birth: member.date_of_birth || "",
      gender: member.gender || "",
      blood_group: member.blood_group || "",
      religion: member.religion || "",

      birth_certificate_no:
        member.birth_certificate_no || "",
      nid_no: member.nid_no || "",
      nationality:
        member.nationality || "Bangladeshi",
      passport_no: member.passport_no || "",

      primary_mobile_number:
        member.primary_mobile_number || "",
      secondary_mobile_number:
        member.secondary_mobile_number || "",
      guardian_mobile_number:
        member.guardian_mobile_number || "",
      email: member.email || "",

      present_address:
        member.present_address || "",
      present_area: member.present_area || "",
      present_thana:
        member.present_thana || "",
      present_district:
        member.present_district || "",

      permanent_address:
        member.permanent_address || "",
      permanent_area:
        member.permanent_area || "",
      permanent_thana:
        member.permanent_thana || "",
      permanent_district:
        member.permanent_district || "",

      form_no: member.form_no || "",
      admission: member.admission || "",
      collateral: member.collateral || "",
      donation: member.donation || "",

      is_active:
        member.is_active !== undefined
          ? member.is_active
          : true,

      death_date: member.death_date || "",
    });

    if (member.photo) {
      setPhotoPreview(member.photo);
    }

  } catch (err) {
    console.error("FETCH ERROR:", err);
    alert("Failed to fetch member data.");
  } finally {
    setLoading(false);
  }
};
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSameAddress = (e) => {
  const checked = e.target.checked;

  if (checked) {
    setFormData((prev) => ({
      ...prev,
      permanent_address: prev.present_address,
      permanent_area: prev.present_area,
      permanent_thana: prev.present_thana,
      permanent_district: prev.present_district,
    }));
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();

    // =========================
    // NORMAL FORM FIELDS
    // =========================
    Object.keys(formData).forEach((key) => {
      const value = formData[key];

      if (
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        data.append(
          key,
          typeof value === "boolean"
            ? value
              ? "true"
              : "false"
            : value
        );
      }
    });

    // =========================
    // FILE APPEND FIX
    // =========================
    if (photo && photo instanceof File) {
      data.set("photo", photo, photo.name);
    }



    // =========================
    // DEBUG
    // =========================
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    // =========================
    // API REQUEST
    // =========================
if (isEditMode) {
  await axiosInstance.patch(`/members/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  alert("Member Updated Successfully!");
} else {
  await axiosInstance.post("/members/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  alert("Member Registered Successfully!");
}

    alert("Member Registered Successfully!");
    navigate("/dashboard/members/list");
  } catch (err) {
    console.error("UPLOAD ERROR:", err.response?.data || err);

    alert(
      "Error: " +
        JSON.stringify(
          err.response?.data || "Failed to register member"
        )
    );
  } finally {
    setLoading(false);
  }
};

  const handleExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);

    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws);

        if (!rows.length) {
          alert("Excel file is empty.");
          return;
        }

        if (!window.confirm(`Import ${rows.length} members?`)) return;

        let success = 0;
        let failed = 0;

        for (const row of rows) {
          const bulkData = new FormData();

          Object.keys(formData).forEach((field) => {
            let value = row[field];

            if (
              (field === "include_date" || field === "date_of_birth") &&
              value
            ) {
              const d = new Date(value);
              if (!isNaN(d)) value = d.toISOString().split("T")[0];
            }

            if (field === "is_active") {
              value =
                value === true || value === "true" ? "true" : "false";
            }

            if (value !== undefined && value !== null && value !== "") {
              bulkData.append(field, value);
            }
          });

          try {
            await axiosInstance.post("/members/", bulkData);
            success++;
          } catch {
            failed++;
          }
        }

        alert(`Import Complete!\nSuccess: ${success}\nFailed: ${failed}`);

        if (success > 0) navigate("/members");
      } catch {
        alert("Invalid Excel file.");
      } finally {
        setImporting(false);
        e.target.value = null;
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/members/list")}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-sm font-black uppercase text-blue-900">
            {isEditMode ? "Edit Member" : "Member Registration"}
          </h2>
        </div>

        <div className="flex gap-2">
          <label className="cursor-pointer bg-green-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
            {importing ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <FileSpreadsheet size={14} />
            )}
            {importing ? "Importing..." : "Excel Import"}
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleExcelImport}
            />
          </label>

          <button
            form="member-form"
            disabled={loading}
            className="bg-blue-800 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={14} />
                {isEditMode ? "Update" : "Register"}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <form
          id="member-form"
          onSubmit={handleSubmit}
          className="bg-white rounded shadow border overflow-hidden"
        >
          {/* PHOTO */}
          <div className="p-4 border-b grid md:grid-cols-2 gap-4 bg-blue-50">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 border rounded bg-white flex justify-center items-center overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={28} className="text-gray-300" />
                )}
              </div>

              <div className="flex-1">
                <label className="text-xs font-bold block mb-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    if (selectedFile instanceof File) {
                      setPhoto(selectedFile);
                      setPhotoPreview(URL.createObjectURL(selectedFile));
                    } else {
                      setPhoto(null);
                      setPhotoPreview(null);
                    }
                  }}
                />
              </div>
            </div>


          </div>

          {/* MEMBERSHIP INFO */}
          <Section title="Membership Information">
            <FormInput
              label="Full Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Member Code"
              name="member_code"
              value={formData.member_code}
              onChange={handleInputChange}
            />
            <FormInput
              label="Members Number"
              name="members_number"
              value={formData.members_number}
              onChange={handleInputChange}
            />
            <FormInput
              label="SI No *"
              name="si_no"
              value={formData.si_no}
              onChange={handleInputChange}
              required
            />

            <SelectInput
              label="Member Type"
              name="member_type"
              value={formData.member_type}
              onChange={handleInputChange}
              options={[
                ["donor", "দাতা সদস্য"],
                ["lifetime", "আজীবন সদস্য"],
                ["general", "সাধারণ সদস্য"],
                ["library", "লাইব্রেরি সদস্য"],
              ]}
            />

            <FormInput
              label="Include Date"
              type="date"
              name="include_date"
              value={formData.include_date}
              onChange={handleInputChange}
            />
            <FormInput
              label="Form No"
              name="form_no"
              value={formData.form_no}
              onChange={handleInputChange}
            />
          </Section>

          {/* PERSONAL INFO */}
          <Section title="Personal Information">
            <FormInput
              label="Father Name"
              name="father_name"
              value={formData.father_name}
              onChange={handleInputChange}
            />
            <FormInput
              label="Mother Name"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleInputChange}
            />
            <FormInput
              label="Date of Birth"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />

            <SelectInput
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                ["male", "Male"],
                ["female", "Female"],
                ["other", "Other"],
              ]}
            />

            <SelectInput
              label="Blood Group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleInputChange}
              options={[
                ["A+", "A+"],
                ["A-", "A-"],
                ["B+", "B+"],
                ["B-", "B-"],
                ["AB+", "AB+"],
                ["AB-", "AB-"],
                ["O+", "O+"],
                ["O-", "O-"],
              ]}
            />

            <FormInput
              label="Religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
            />
            <FormInput
              label="Birth Certificate No"
              name="birth_certificate_no"
              value={formData.birth_certificate_no}
              onChange={handleInputChange}
            />
            <FormInput
              label="NID No"
              name="nid_no"
              value={formData.nid_no}
              onChange={handleInputChange}
            />
            <FormInput
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
            <FormInput
              label="Passport No"
              name="passport_no"
              value={formData.passport_no}
              onChange={handleInputChange}
            />
          </Section>

          {/* CONTACT INFO */}
          <Section title="Contact Information">
            <FormInput
              label="Primary Mobile"
              name="primary_mobile_number"
              value={formData.primary_mobile_number}
              onChange={handleInputChange}
            />
            <FormInput
              label="Secondary Mobile"
              name="secondary_mobile_number"
              value={formData.secondary_mobile_number}
              onChange={handleInputChange}
            />
            <FormInput
              label="Guardian Mobile"
              name="guardian_mobile_number"
              value={formData.guardian_mobile_number}
              onChange={handleInputChange}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Section>

          {/* PRESENT ADDRESS */}
          <Section title="Present Address">
            <TextareaInput
              label="Address"
              name="present_address"
              value={formData.present_address}
              onChange={handleInputChange}
            />
            <FormInput
              label="Area"
              name="present_area"
              value={formData.present_area}
              onChange={handleInputChange}
            />
            <FormInput
              label="Thana"
              name="present_thana"
              value={formData.present_thana}
              onChange={handleInputChange}
            />
            <FormInput
              label="District"
              name="present_district"
              value={formData.present_district}
              onChange={handleInputChange}
            />
          </Section>

{/* PERMANENT ADDRESS */}
<Section title="Permanent Address">
  <div className="md:col-span-4 flex items-center gap-2 mb-2">
    <input
      type="checkbox"
      id="sameAddress"
      onChange={(e) => {
        if (e.target.checked) {
          setFormData((prev) => ({
            ...prev,
            permanent_address: prev.present_address,
            permanent_area: prev.present_area,
            permanent_thana: prev.present_thana,
            permanent_district: prev.present_district,
          }));
        }
      }}
    />
    <label
      htmlFor="sameAddress"
      className="text-xs font-bold text-blue-800"
    >
      Same as Present Address
    </label>
  </div>

  <TextareaInput
    label="Address"
    name="permanent_address"
    value={formData.permanent_address}
    onChange={handleInputChange}
  />

  <FormInput
    label="Area"
    name="permanent_area"
    value={formData.permanent_area}
    onChange={handleInputChange}
  />

  <FormInput
    label="Thana"
    name="permanent_thana"
    value={formData.permanent_thana}
    onChange={handleInputChange}
  />

  <FormInput
    label="District"
    name="permanent_district"
    value={formData.permanent_district}
    onChange={handleInputChange}
  />
</Section>

          {/* FINANCIAL */}
          <Section title="Financial Information">
            <FormInput
              label="Admission"
              name="admission"
              value={formData.admission}
              onChange={handleInputChange}
            />
            <FormInput
              label="Collateral"
              name="collateral"
              value={formData.collateral}
              onChange={handleInputChange}
            />
            <FormInput
              label="Donation"
              name="donation"
              value={formData.donation}
              onChange={handleInputChange}
            />
            <FormInput
              label="Death Date"
              type="date"
              name="death_date"
              value={formData.death_date}
              onChange={handleInputChange}
            />

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              <label className="text-xs font-bold">Active Member</label>
            </div>
          </Section>
        </form>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="p-4 border-b">
    <h3 className="text-xs font-black uppercase text-gray-500 mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

const FormInput = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold mb-1">{label}</label>
    <input
      {...props}
      className="border rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500"
    />
  </div>
);

const TextareaInput = ({ label, ...props }) => (
  <div className="flex flex-col md:col-span-2">
    <label className="text-xs font-bold mb-1">{label}</label>
    <textarea
      {...props}
      className="border rounded px-2 py-2 text-sm h-20 focus:outline-none focus:border-blue-500"
    />
  </div>
);

const SelectInput = ({ label, options, ...props }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold mb-1">{label}</label>
    <select
      {...props}
      className="border rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500"
    >
      <option value="">Select</option>
      {options.map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
    </select>
  </div>
);

export default MemberForm;