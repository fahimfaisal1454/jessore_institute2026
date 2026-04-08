import DataTable from "../components/shared/DataTable";

export default function SportsPage() {
  const data = [
    { name: "মি. শফিকুল ইসলাম", year: "১৯৮২-১৯৮৬" },
    { name: "মি. কামাল হোসেন", year: "১৯৮৬-১৯৯০" },
  ];

  return (
    <DataTable
      title="সম্পাদক, ক্রীড়া সংসদ"
      columns={["ক্র. নং", "নাম", "কার্যকাল"]}
      data={data}
    />
  );
}