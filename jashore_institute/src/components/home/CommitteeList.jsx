import SectionHeader from "../shared/SectionHeader";

export default function CommitteeList() {
  const items = [
    "সভাপতি তালিকা",
    "সাধারণ সম্পাদক তালিকা",
    "সহ-সভাপতি তালিকা",
    "যুগ্ম সম্পাদক তালিকা",
  ];

  return (
    <div className="grid grid-cols-2 gap-3">

      {/* LEFT BOX */}
      <div className="bg-white border shadow-sm">
        <SectionHeader title="প্রধান... সভাপতি-সাধারণ সম্পাদক এর তালিকা.." />

        <div className="p-3 space-y-2 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 border-b pb-1">
              <span className="text-green-600">🔰</span>
              <p className="cursor-pointer hover:text-blue-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT BOX */}
      <div className="bg-white border shadow-sm">
        <SectionHeader title="প্রধান... বিভাগীয় সম্পাদক এর তালিকা.." />

        <div className="p-3 space-y-2 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 border-b pb-1">
              <span className="text-purple-600">📌</span>
              <p className="cursor-pointer hover:text-blue-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}