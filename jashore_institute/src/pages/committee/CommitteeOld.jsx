import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../api/AxiosInstance";

export default function CommitteeOld() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("পরিচালনা পরিষদ-প্রাক্তন");

  const navigate = useNavigate();

  useEffect(() => {
    // FETCH ALL COMMITTEES
    AxiosInstance.get("admin/committee/committees/")
      .then((res) => {
        // FILTER ONLY INACTIVE COMMITTEES
        const oldCommittees = res.data.filter(
          (committee) => !committee.is_active
        );

        setData(oldCommittees);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto text-center">
      {/* TITLE */}
      <h2 className="text-xl sm:text-2xl font-semibold my-6 px-4 break-words">
        {title}
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-6 pb-10">
        {data.length > 0 ? (
          data.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                navigate(`/committee-old/${item.id}`)
              }
              className="bg-orange-500 border-4 border-gray-700 py-8 px-4 text-white font-semibold rounded hover:scale-105 transition break-words"
            >
              {item.title}
            </button>
          ))
        ) : (
          <p className="col-span-full text-gray-500">
            কোনো প্রাক্তন কমিটি পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}