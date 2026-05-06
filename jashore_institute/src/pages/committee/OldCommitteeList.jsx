import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../api/AxiosInstance";

export default function OldCommitteeList() {
  const { committeeId } = useParams();

  const [committee, setCommittee] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // FETCH SPECIFIC COMMITTEE DETAILS
    AxiosInstance.get(`admin/committee/committees/${committeeId}/`)
      .then((res) => {
        setCommittee(res.data);
        setMembers(res.data.members || []);
      })
      .catch(console.error);
  }, [committeeId]);

  if (!committee) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-20">
        <p className="text-lg text-gray-600">
          Loading committee data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto bg-white border border-gray-400">
      {/* TITLE */}
      <div className="bg-[#e9e9e9] border-b border-gray-500 px-3 sm:px-5 py-3">
        <h2 className="text-base sm:text-[18px] text-center font-bold text-black break-words">
          {committee.title}
        </h2>
      </div>

      {/* TABLE */}
      <div className="p-2 sm:p-4 overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse border-2 border-black text-xs sm:text-sm md:text-[15px]">
          {/* HEADER */}
          <thead>
            <tr className="bg-[#f1f1f1] text-center font-bold">
              <th className="border border-black px-0 py-4 min-w-[10px]">
                ক্রম.
              </th>

              <th className="border border-black px-3 py-4 min-w-[100px]">
                পদবী
              </th>

              <th className="border border-black px-3 py-4 min-w-[220px]">
                কর্মকর্তার নাম
              </th>

              <th className="border border-black px-3 py-4 min-w-[120px]">
                সদস্য নম্বর
              </th>

              <th className="border border-black px-3 py-4 min-w-[120px]">
                ছবি
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr key={member.id} className="align-middle">
                  {/* SERIAL */}
                  <td className="border border-black text-center py-4">
                    {index + 1}.
                  </td>

                  {/* ROLE */}
                  <td className="border border-black px-3 py-4 leading-relaxed break-words">
                    {member.committee_role}
                  </td>

                  {/* NAME */}
                  <td className="border border-black px-3 py-4 break-words">
                    <div className="flex items-center h-full min-h-[80px]">
                      <p className="leading-relaxed">
                        {member.member_name}
                      </p>
                    </div>
                  </td>

                  {/* MEMBER NUMBER */}
                  <td className="border border-black text-center py-4 break-words">
                    {member.member_number || ""}
                  </td>

                  {/* IMAGE */}
                  <td className="border border-black p-0 text-center align-middle w-20 h-20">
                    {member.image ? (
                      <a
                        href={member.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src={member.image}
                          alt={member.member_name}
                          className="w-full h-full object-cover block"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full bg-white" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-black text-center py-10 text-gray-500"
                >
                  কোনো সদস্য পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}