export default function BottomInfoCards() {
  const cards = [
    // {
    //   title: "আমাদের সম্পর্কে",
    //   icon: "🏫",
    //   items: ["কর্মকর্তৃবৃন্দ", "কমিটিসমূহ", "প্রশাসনিক কর্মকর্তা", "যোগাযোগ"],
    // },
    // // {
    // //   title: "আইন ও বিধি",
    // //   icon: "⚖️",
    // //   items: ["আইন", "বাজেট", "সার্ভিসেস", "প্রশাসনিক কাঠামো"],
    // // },
    // {
    //   title: "অনলাইন সেবাসমূহ",
    //   icon: "🧾",
    //   items: ["অনলাইন আবেদন", "অনলাইন ফর্ম", "অনলাইন সেবা"],
    // },
    // {
    //   title: "সদস্য তালিকা",
    //   icon: "👥",
    //   items: ["দাতা সদস্য", "আজীবন সদস্য", "সাধারণ সদস্য", "মৃত সদস্য"],
    // },
    // {
    //   title: "প্রকাশনা",
    //   icon: "📄",
    //   items: ["বার্ষিক রিপোর্ট", "প্রকাশনা", "নোটিশ"],
    // },
    // {
    //   title: "নাগরিক সেবা",
    //   icon: "🛠️",
    //   items: ["ই-সেবা", "হেল্পলাইন", "ডাউনলোড"],
    // },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4">

          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{card.icon}</div>
            <h3 className="font-semibold text-gray-800">{card.title}</h3>
          </div>

          {/* List */}
          <ul className="text-[14px] text-gray-600 space-y-1">
            {card.items.map((item, i) => (
              <li key={i} className="hover:text-blue-500 cursor-pointer">
                ▶ {item}
              </li>
            ))}
          </ul>

        </div>
      ))}
    </div>
  );
}