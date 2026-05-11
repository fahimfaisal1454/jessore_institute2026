import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../api/AxiosInstance";

export default function DramaOld() {
  const [subCommittees, setSubCommittees] =
    useState([]);

  const [title, setTitle] =
    useState("নাট্য বিভাগ-প্রাক্তন");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const navigate =
    useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData =
      async () => {
        try {
          const res =
            await AxiosInstance.get(
              "admin/committee/subcommittees/"
            );

          if (
            !isMounted
          )
            return;

          // ONLY INACTIVE SUBCOMMITTEES
          const oldSubCommittees =
            res.data.filter(
              (
                item
              ) =>
                !item.is_active
            );

          setSubCommittees(
            oldSubCommittees
          );
        } catch (
          err
        ) {
          if (
            !isMounted
          )
            return;

          setError(
            "ডাটা লোড করা যায়নি"
          );
        } finally {
          if (
            isMounted
          ) {
            setLoading(
              false
            );
          }
        }
      };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

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
    <div className="max-w-[1100px] mx-auto text-center">

      {/* TITLE */}
      <h2 className="text-xl sm:text-2xl font-semibold my-6 px-4 break-words">
        {title}
      </h2>

      {/* SUBCOMMITTEE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-6 pb-10">
        {subCommittees.length >
        0 ? (
          subCommittees.map(
            (
              item
            ) => (
              <button
                key={
                  item.id
                }
                onClick={() =>
                  navigate(
                    `/drama-old/${item.id}`
                  )
                }
                className="bg-orange-500 border-4 border-gray-700 py-8 px-4 text-white font-semibold rounded hover:scale-105 transition break-words"
              >
                {
                  item.title
                }
              </button>
            )
          )
        ) : (
          <p className="col-span-full text-gray-500">
            কোনো
            প্রাক্তন
            উপ-কমিটি
            পাওয়া
            যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}