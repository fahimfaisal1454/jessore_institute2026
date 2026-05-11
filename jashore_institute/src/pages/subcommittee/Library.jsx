import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Library() {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");

  const [subCommittees, setSubCommittees] = useState([]);
  const [selectedSubCommittee, setSelectedSubCommittee] =
    useState("");

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  // =========================
  // FETCH DEFAULT ACTIVE LIBRARY
  // =========================
  const fetchDefaultData = async () => {
    try {
      const res =
        await AxiosInstance.get(
          "committee/subcommittee/library/"
        );

      setTitle(
        res.data.title || ""
      );

      setMembers(
        res.data.members || []
      );
    } catch (err) {
      console.error(err);
      setError(
        "ডাটা লোড করা যায়নি"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ALL SUBCOMMITTEE TITLES
  // =========================
  const fetchSubCommittees =
    async () => {
      try {
        const res =
          await AxiosInstance.get(
            "admin/committee/subcommittees/"
          );

        setSubCommittees(
          res.data
        );

        const active =
          res.data.find(
            (sub) =>
              sub.is_active
          );

        if (active) {
          setSelectedSubCommittee(
            String(
              active.id
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

  // =========================
  // FETCH SPECIFIC SUBCOMMITTEE LIBRARY
  // =========================
  const fetchSpecificSubCommittee =
    async (
      subcommitteeId
    ) => {
      try {
        const res =
          await AxiosInstance.get(
            `committee/subcommittee/library/?subcommittee=${subcommitteeId}`
          );

        setTitle(
          res.data.title || ""
        );

        setMembers(
          res.data.members || []
        );
      } catch (err) {
        console.error(err);
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchDefaultData();
    fetchSubCommittees();
  }, []);

  // =========================
  // ON TITLE CHANGE
  // =========================
  useEffect(() => {
    if (
      selectedSubCommittee
    ) {
      fetchSpecificSubCommittee(
        selectedSubCommittee
      );
    }
  }, [
    selectedSubCommittee,
  ]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10">
        Loading...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto bg-white border border-gray-400">
      {/* SECTION TITLE */}
      <div className="bg-[#e9e9e9] border-b border-gray-500 px-3 sm:px-5 py-3 flex justify-between items-center relative">
        {/* TITLE */}
        <h2 className="flex-1 text-center text-base sm:text-[18px] font-bold text-black break-words">
          {title}
        </h2>

        {/* DROPDOWN BUTTON */}
        <div className="relative">
          <button
            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
            className="ml-3 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition"
          >
            <svg
              className={`w-5 h-5 text-gray-700 transition-transform ${
                showDropdown
                  ? "rotate-180"
                  : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* DROPDOWN MENU */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
              {/* HEADER */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-700">
                  Select Sub Committee
                </p>
              </div>

              {/* OPTIONS */}
              <div className="max-h-80 overflow-y-auto">
                {subCommittees.map(
                  (
                    sub
                  ) => (
                    <button
                      key={
                        sub.id
                      }
                      onClick={() => {
                        setSelectedSubCommittee(
                          String(
                            sub.id
                          )
                        );

                        setShowDropdown(
                          false
                        );
                      }}
                      className={`block w-full text-left px-5 py-3 text-sm font-medium border-b border-gray-100 transition ${
                        String(
                          selectedSubCommittee
                        ) ===
                        String(
                          sub.id
                        )
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      {
                        sub.title
                      }
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="p-2 sm:p-4 overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse border-2 border-black text-xs sm:text-sm md:text-[15px]">
          {/* HEADER */}
          <thead>
            <tr className="bg-[#f1f1f1] text-center font-bold">
              <th className="border border-black py-4 min-w-[70px]">
                ক্রম.
              </th>

              <th className="border border-black px-3 py-4 min-w-[160px]">
                পদবী
              </th>

              <th className="border border-black px-3 py-4 min-w-[250px]">
                কর্মকর্তার নাম
              </th>

              <th className="border border-black px-3 py-4 min-w-[150px]">
                সদস্য নম্বর
              </th>

              <th className="border border-black px-3 py-4 min-w-[150px]">
                ছবি
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {members.length >
            0 ? (
              members.map(
                (
                  member,
                  index
                ) => (
                  <tr
                    key={
                      member.id
                    }
                    className="align-middle"
                  >
                    {/* SERIAL */}
                    <td className="border border-black text-center py-4">
                      {index +
                        1}
                      .
                    </td>

                    {/* ROLE */}
                    <td className="border border-black px-3 py-4 break-words">
                      {
                        member.member_role
                      }
                    </td>

                    {/* NAME */}
                    <td className="border border-black px-3 py-4 break-words">
                      {
                        member.member_name
                      }
                    </td>

                    {/* MEMBER NUMBER */}
                    <td className="border border-black text-center py-4 break-words">
                      {member.member_number ||
                        ""}
                    </td>

                    {/* IMAGE */}
                    <td className="border border-black p-0 text-center align-middle w-20 h-20">
                      {member.image ? (
                        <a
                          href={
                            member.image
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full"
                        >
                          <img
                            src={
                              member.image
                            }
                            alt={
                              member.member_name
                            }
                            className="w-full h-full object-cover block"
                          />
                        </a>
                      ) : (
                        <div className="w-full h-full bg-white" />
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 border border-black"
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