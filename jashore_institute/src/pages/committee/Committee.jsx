import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Committee() {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("committee/")
      .then((res) => {
        setMembers(res.data.members);
        setTitle(res.data.title);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto bg-white border border-gray-400">

      {/* SECTION TITLE */}
      <div className="bg-[#e9e9e9] border-b border-gray-500 px-5 py-3">
        <h2 className="text-[18px] font-bold text-black">{title}</h2>
      </div>

      {/* TABLE */}
      <div className="p-4 overflow-x-auto">

        <table className="w-full border-collapse border-2 border-black text-[15px]">

          {/* HEADER */}
          <thead>
            <tr className="bg-[#f1f1f1] text-center font-bold">
              <th className="border border-black px-2 py-4 w-[60px]">
                ক্রম.
              </th>

              <th className="border border-black px-3 py-4 w-[260px]">
                পদবী
              </th>

              <th className="border border-black px-3 py-4">
                কর্মকর্তাবৃন্দ নাম
              </th>

              <th className="border border-black px-3 py-4 w-[140px]">
                সদস্য নম্বর
              </th>

              <th className="border border-black px-3 py-4 w-[120px]">
                ছবি
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className="align-top">

                {/* SERIAL */}
                <td className="border border-black text-center font-bold text-[18px] py-4">
                  {index + 1}.
                </td>

                {/* ROLE */}
                <td className="border border-black px-3 py-4 font-semibold leading-relaxed">
                  {member.committee_role}
                </td>

                {/* NAME */}
                <td className="border border-black px-3 py-4 leading-relaxed">
                  <p className="font-semibold text-[17px]">
                    {member.member_name}
                  </p>
                </td>

                {/* MEMBER NUMBER */}
                <td className="border border-black text-center font-bold text-[18px] py-4">
                  {member.member_number || ""}
                </td>

                {/* IMAGE */}
{/* IMAGE */}
<td className="border border-black py-1 text-center">
  {member.image ? (
    <a
      href={member.image}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={member.image}
        alt={member.member_name}
        className="w-[55px] h-[68px] object-cover mx-auto border border-gray-400 hover:scale-105 transition duration-200 cursor-pointer"
      />
    </a>
  ) : (
    <div className="w-[55px] h-[68px] mx-auto border border-gray-300 bg-white" />
  )}
</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}