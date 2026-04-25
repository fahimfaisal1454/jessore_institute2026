import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Committee() {
  const [head, setHead] = useState(null);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("committee/")
      .then((res) => {
        setHead(res.data.head);
        setMembers(res.data.members);
        setTitle(res.data.title);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          {title}
        </div>

        {/* HEAD */}
        {head && (
          <div className="flex justify-center py-10">
            <div className="bg-purple-300 p-6 text-center w-[260px] shadow-sm">

              <img
                src={head.image}
                alt={head.name}
                className="w-32 h-36 object-cover mx-auto mb-3 border"
              />

              <p className="font-semibold text-sm">{head.name}</p>
              <p className="text-xs mt-2">{head.role}</p>

            </div>
          </div>
        )}

        {/* MEMBERS */}
        <div className="p-6 grid grid-cols-4 gap-6">

          {members.map((m, i) => (
            <div
              key={i}
              className={`p-4 text-center shadow-sm ${
                i % 2 === 0 ? "bg-blue-200" : "bg-purple-200"
              }`}
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-24 h-28 object-cover mx-auto mb-3 border"
              />

              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs mt-1">{m.role}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}