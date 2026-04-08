import DataTable from "../components/shared/DataTable";

export default function LibraryPage() {
  const data = [
    { name: "মি. আব্দুল করিম", year: "১৯৮০-১৯৮৫" },
    { name: "মি. রফিকুল ইসলাম", year: "১৯৮৫-১৯৯০" },
  ];

  return (
    <DataTable
      title="সম্পাদক, লাইব্রেরি বিভাগ"
      columns={["ক্র. নং", "নাম", "কার্যকাল"]}
      data={data}
    />
  );
}