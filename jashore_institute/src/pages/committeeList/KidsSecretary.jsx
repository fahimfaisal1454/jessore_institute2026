import DataTable from "../../components/shared/DataTable";

export default function KidsSecretary() {
  return (
    <DataTable
      title="শিশু চিত্তবিনোদন কেন্দ্র সম্পাদক তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১", year: "2020-2022" },
      ]}
    />
  );
}