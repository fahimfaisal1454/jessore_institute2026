import DataTable from "../../components/shared/DataTable";

export default function CommitteeSecretaryList() {
  return (
    <DataTable
      title="সম্পাদক তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১2222", year: "2020-2022" },
        { name: "নাম ২", year: "2022-2024" },
      ]}
    />
  );
}