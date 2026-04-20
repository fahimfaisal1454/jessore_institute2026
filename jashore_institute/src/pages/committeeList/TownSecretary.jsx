import DataTable from "../../components/shared/DataTable";

export default function TownSecretary() {
  return (
    <DataTable
      title="টাউন ক্লাব সম্পাদক তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১", year: "2020-2022" },
      ]}
    />
  );
}