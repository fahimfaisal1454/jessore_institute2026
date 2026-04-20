import DataTable from "../../components/shared/DataTable";

export default function LibrarySecretary() {
  return (
    <DataTable
      title="লাইব্রেরি বিভাগের সম্পাদক তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১", year: "2020-2022" },
        { name: "নাম ২", year: "2022-2024" },
      ]}
    />
  );
}