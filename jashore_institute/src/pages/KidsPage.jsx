import DataTable from "../components/shared/DataTable";

export default function KidsPage() {
  const data = [
    { name: "মি. রবিউল ইসলাম", year: "১৯৮৫-১৯৯০" },
    { name: "মি. সাইফুল ইসলাম", year: "১৯৯০-১৯৯৫" },
  ];

  return (
    <DataTable
      title="সম্পাদক, শিশু চিত্রাঙ্কন কেন্দ্র"
      columns={["ক্র. নং", "নাম", "কার্যকাল"]}
      data={data}
    />
  );
}