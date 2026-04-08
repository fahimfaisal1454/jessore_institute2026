import DataTable from "../components/shared/DataTable";

export default function TownClubPage() {
  const data = [
    { name: "মি. আবুল কালাম", year: "১৯৮৪-১৯৮৮" },
    { name: "মি. জহিরুল ইসলাম", year: "১৯৮৮-১৯৯৩" },
  ];

  return (
    <DataTable
      title="সম্পাদক, টাউন ক্লাব"
      columns={["ক্র. নং", "নাম", "কার্যকাল"]}
      data={data}
    />
  );
}