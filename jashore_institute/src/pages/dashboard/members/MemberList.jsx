import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/AxiosInstance";
import * as XLSX from "xlsx";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Users,
} from "lucide-react";

function MemberList() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [memberType, setMemberType] = useState("");
  const [activeStatus, setActiveStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, memberType, activeStatus, members]);

  // =========================
  // FETCH MEMBERS
  // =========================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/members/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setMembers(data);
      setFilteredMembers(data);
    } catch (err) {
      console.error("API ERROR:", err.response || err);
      alert("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER MEMBERS
  // =========================
  const handleFilter = () => {
    let data = [...members];

    if (search) {
      data = data.filter(
        (m) =>
          m.name?.toLowerCase().includes(search.toLowerCase()) ||
          m.member_code?.toLowerCase().includes(search.toLowerCase()) ||
          m.si_no?.toLowerCase().includes(search.toLowerCase()) ||
          m.primary_mobile_number?.includes(search) ||
          m.father_name?.toLowerCase().includes(search.toLowerCase()) ||
          m.mother_name?.toLowerCase().includes(search.toLowerCase()) ||
          m.nid_birth?.includes(search)
      );
    }

    if (memberType) {
      data = data.filter((m) => m.member_type === memberType);
    }

    if (activeStatus !== "") {
      data = data.filter(
        (m) => String(m.is_active) === activeStatus
      );
    }

    setFilteredMembers(data);
    setCurrentPage(1);
  };

  // =========================
  // DELETE MEMBER
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?"))
      return;

    try {
      await axiosInstance.delete(`/members/${id}/`);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete member.");
    }
  };

  // =========================
  // EXPORT FULL EXCEL
  // =========================
  const exportExcel = () => {
    const data = filteredMembers.map((m, index) => ({
      "ক্রমিক": index + 1,
      "সদস্য আইডি": m.si_no || "",
      "সদস্য নং": m.member_code || "",

      "নাম": m.name || "",
      "পিতা": m.father_name || "",
      "মাতা": m.mother_name || "",
      "স্বামী/স্ত্রী": m.spouse_name || "",

      "বর্তমান ঠিকানা": m.present_address || "",
      "বর্তমান এলাকা": m.present_area || "",
      "বর্তমান পোস্ট অফিস": m.present_post_office || "",
      "বর্তমান থানা": m.present_thana || "",
      "বর্তমান জেলা": m.present_district || "",

      "স্থায়ী ঠিকানা": m.permanent_address || "",
      "স্থায়ী এলাকা": m.permanent_area || "",
      "স্থায়ী পোস্ট অফিস": m.permanent_post_office || "",
      "স্থায়ী থানা": m.permanent_thana || "",
      "স্থায়ী জেলা": m.permanent_district || "",

      "প্রাথমিক মোবাইল": m.primary_mobile_number || "",
      "বিকল্প মোবাইল": m.secondary_mobile_number || "",
      "ইমেইল": m.email || "",

      "জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন": m.nid_birth || "",
      "লিঙ্গ": m.gender || "",
      "রক্তের গ্রুপ": m.blood_group || "",
      "জন্ম তারিখ": m.date_of_birth || "",

      "সদস্য ধরন": m.member_type || "",
      "অন্তর্ভুক্তির তারিখ": m.include_date || "",
      "স্ট্যাটাস": m.is_active ? "Active" : "Inactive",

      "পেশা": m.profession || "",
      "শিক্ষাগত যোগ্যতা": m.education || "",
      "রেফারেন্স": m.reference || "",
      "মন্তব্য": m.remarks || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 12 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 35 },
      { wch: 20 },
      { wch: 20 },
      { wch: 18 },
      { wch: 18 },
      { wch: 35 },
      { wch: 20 },
      { wch: 20 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 25 },
      { wch: 25 },
      { wch: 10 },
      { wch: 12 },
      { wch: 15 },
      { wch: 18 },
      { wch: 18 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    XLSX.writeFile(
      workbook,
      `members_full_registry_${new Date()
        .toISOString()
        .split("T")[0]}.xlsx`
    );
  };

  // =========================
  // PAGINATION
  // =========================
  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;

  const currentMembers = filteredMembers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredMembers.length / membersPerPage
  );

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-20 px-4 py-3 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Users className="text-blue-900" size={22} />
          <h2 className="text-lg font-black text-blue-900 uppercase">
            Member Registry List
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={exportExcel}
            className="bg-green-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 hover:bg-green-800"
          >
            <Download size={14} />
            Download Excel
          </button>

          <button
            onClick={() => navigate("/dashboard/members")}
            className="bg-blue-800 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 hover:bg-blue-900"
          >
            <Plus size={14} />
            Add Member
          </button>
        </div>
      </div>

      <div className="p-4 max-w-[1800px] mx-auto">
        {/* FILTERS */}
        <div className="bg-white rounded shadow border p-4 mb-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded pl-10 pr-3 py-2 text-sm"
              />
            </div>

            <select
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Member Types</option>
              <option value="donor">দাতা সদস্য</option>
              <option value="lifetime">আজীবন সদস্য</option>
              <option value="general">সাধারণ সদস্য</option>
              <option value="library">লাইব্রেরি সদস্য</option>
            </select>

            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="text-sm font-semibold flex items-center">
              Total Members: {filteredMembers.length}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-lg border overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-900 text-xs">
            <thead>
              <tr className="bg-blue-900 text-white text-center">
                <th className="border px-2 py-2">ক্রমিক</th>
                <th className="border px-2 py-2">সদস্য আইডি / নং</th>
                <th className="border px-2 py-2">নাম, পিতা, মাতা, স্বামী/স্ত্রী</th>
                <th className="border px-2 py-2">বর্তমান ঠিকানা</th>
                <th className="border px-2 py-2">স্থায়ী ঠিকানা</th>
                <th className="border px-2 py-2">সদস্য তথ্য</th>
                <th className="border px-2 py-2">ছবি</th>
                <th className="border px-2 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    Loading members...
                  </td>
                </tr>
              ) : currentMembers.length > 0 ? (
                currentMembers.map((member, idx) => (
                  <tr key={member.id} className="odd:bg-gray-50 border-b">
                    <td className="border text-center align-top px-2 py-2">
                      {indexOfFirst + idx + 1}
                    </td>

                    <td className="border p-0 align-top">
                      <div className="grid divide-y">
                        <div className="px-2 py-1">
                          সদস্য আইডি: {member.si_no || "Auto"}
                        </div>
                        <div className="px-2 py-1">
                          সদস্য নং: {member.member_code || "Input"}
                        </div>
                      </div>
                    </td>

                    <td className="border p-0 align-top">
                      <div className="grid divide-y">
                        <div className="px-2 py-1">নাম: {member.name || "-"}</div>
                        <div className="px-2 py-1">পিতা: {member.father_name || "-"}</div>
                        <div className="px-2 py-1">মাতা: {member.mother_name || "-"}</div>
                        <div className="px-2 py-1">
                          স্বামী/স্ত্রী: {member.spouse_name || "-"}
                        </div>
                      </div>
                    </td>

                    <td className="border p-0 align-top">
                      <div className="grid divide-y">
                        <div className="px-2 py-1">
                          গ্রাম/রোড: {member.present_address || "-"}
                        </div>
                        <div className="px-2 py-1">
                          পাড়া: {member.present_area || "-"}
                        </div>
                        <div className="px-2 py-1">
                          পোস্ট অফিস: {member.present_post_office || "-"}
                        </div>
                        <div className="px-2 py-1">
                          থানা: {member.present_thana || "-"}, জেলা:{" "}
                          {member.present_district || "-"}
                        </div>
                      </div>
                    </td>

                    <td className="border p-0 align-top">
                      <div className="grid divide-y">
                        <div className="px-2 py-1">
                          গ্রাম/রোড: {member.permanent_address || "-"}
                        </div>
                        <div className="px-2 py-1">
                          পাড়া: {member.permanent_area || "-"}
                        </div>
                        <div className="px-2 py-1">
                          পোস্ট অফিস: {member.permanent_post_office || "-"}
                        </div>
                        <div className="px-2 py-1">
                          থানা: {member.permanent_thana || "-"}, জেলা:{" "}
                          {member.permanent_district || "-"}
                        </div>
                      </div>
                    </td>

                    <td className="border p-0 align-top">
                      <div className="grid divide-y">
                        <div className="px-2 py-1">
                          সদস্য ধরন: {member.member_type || "-"}
                        </div>
                        <div className="px-2 py-1">
                          অন্তর্ভুক্তির তারিখ: {member.include_date || "-"}
                        </div>
                        <div className="px-2 py-1">
                          NID/BR: {member.nid_birth || "-"}
                        </div>
                        <div className="px-2 py-1">
                          লিঙ্গ: {member.gender || "-"}, রক্ত:{" "}
                          {member.blood_group || "-"}
                        </div>
                      </div>
                    </td>

                    <td className="border px-2 py-2 text-center align-top">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500 text-xs">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="border px-2 py-2 text-center align-top">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/members/view/${member.id}`)
                          }
                          className="text-gray-700 hover:text-black"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/dashboard/members/edit/${member.id}`)
                          }
                          className="text-blue-700 hover:text-blue-900"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-700 hover:text-red-900"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="px-3 py-1 border rounded flex items-center gap-1 disabled:opacity-50"
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <span className="text-sm font-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="px-3 py-1 border rounded flex items-center gap-1 disabled:opacity-50"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberList;