import { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function CommitteeList() {
  const [members, setMembers] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState("");

  // FETCH MEMBERS
  const fetchMembers = () => {
    AxiosInstance.get("admin/committee/members/")
      .then((res) => setMembers(res.data))
      .catch(console.error);
  };

  // FETCH ALL COMMITTEES
  const fetchCommittees = () => {
    AxiosInstance.get("admin/committee/committees/")
      .then((res) => {
        setCommittees(res.data);

        // AUTO SELECT ACTIVE COMMITTEE
        const active = res.data.find(
          (committee) => committee.is_active
        );

        if (active) {
          setSelectedCommittee(String(active.id));
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchMembers();
    fetchCommittees();
  }, []);

  // FILTER MEMBERS BY SELECTED COMMITTEE
  const filteredMembers = selectedCommittee
    ? members.filter(
        (member) =>
          String(member.committee) ===
          String(selectedCommittee)
      )
    : members;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* HEADER + FILTER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-8">
        {/* TITLE */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Committee Member List
          </h2>

          <p className="text-gray-500 mt-2">
            Filter and manage committee members by title
          </p>
        </div>

        {/* RIGHT SIDE FILTER */}
        <div className="w-full sm:w-80">
          <label className="block mb-2 font-semibold text-gray-700">
            Filter By Committee:
          </label>

          <select
            value={selectedCommittee}
            onChange={(e) =>
              setSelectedCommittee(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              All Committees
            </option>

            {committees.map((committee) => (
              <option
                key={committee.id}
                value={committee.id}
              >
                {committee.title}
                {committee.is_active
                  ? " (Active)"
                  : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border text-left">
                #
              </th>
              <th className="p-4 border text-left">
                Committee Title
              </th>
              <th className="p-4 border text-left">
                Role
              </th>
              <th className="p-4 border text-left">
                Member Name
              </th>
              <th className="p-4 border text-left">
                Member Number
              </th>
              <th className="p-4 border text-left">
                Order
              </th>
              <th className="p-4 border text-left">
                Image
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-4 border">
                    {index + 1}
                  </td>

                  <td className="p-4 border font-medium">
                    {item.committee_title || "-"}
                  </td>

                  <td className="p-4 border">
                    {item.committee_role}
                  </td>

                  <td className="p-4 border">
                    {item.member_name}
                  </td>

                  <td className="p-4 border">
                    {item.member_number || "-"}
                  </td>

                  <td className="p-4 border">
                    {item.order}
                  </td>

                  <td className="p-4 border">
                    <img
                      src={
                        item.image ||
                        "/no-image.png"
                      }
                      alt={item.member_name}
                      className="w-16 h-20 object-cover rounded-md border"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No committee members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}