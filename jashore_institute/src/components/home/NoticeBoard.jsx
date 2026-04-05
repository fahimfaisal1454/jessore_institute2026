import SectionHeader from "../shared/SectionHeader";

export default function NoticeBoard() {
  const notices = [
    "মহান বিজয় দিবস উপলক্ষে ছুটির নোটিশ-২০২৫",
    "শ্রী শারদীয় দুর্গাপূজা উপলক্ষে নোটিশ",
    "শিক্ষার্থীদের জরুরি বিজ্ঞপ্তি",
    "স্মরণ সভা সংক্রান্ত বিজ্ঞপ্তি",
    "ভর্তি কার্যক্রম সংক্রান্ত নোটিশ",
    "পরীক্ষার সময়সূচি প্রকাশ",
  ];

  return (
    <div className="bg-white border shadow-sm">

      {/* Header */}
      <SectionHeader title="নোটিশ বোর্ড" />

      {/* Notice List */}
      <div className="p-3 space-y-2 text-sm">
        {notices.map((item, index) => (
          <p
            key={index}
            className="border-b pb-1 cursor-pointer hover:text-blue-600"
          >
            {item}
          </p>
        ))}
      </div>

      {/* Button */}
      <div className="p-3 text-right">
        <button className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700">
          আরও দেখুন
        </button>
      </div>

    </div>
  );
}