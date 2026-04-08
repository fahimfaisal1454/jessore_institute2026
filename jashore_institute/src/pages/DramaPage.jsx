import DataTable from "../components/shared/DataTable";

export default function DramaPage() {
  const data = [
    { name: "মি. জসিম উদ্দিন", year: "১৯৮৩-১৯৮৭" },
    { name: "মি. হুমায়ুন কবির", year: "১৯৮৭-১৯৯২" },
  ];

  return (
    <DataTable
      title="সম্পাদক, নাট্যকলা সংসদ"
      columns={["ক্র. নং", "নাম", "কার্যকাল"]}
      data={data}
    />
  );
}