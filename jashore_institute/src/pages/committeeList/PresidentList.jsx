import DataTable from "../../components/shared/DataTable";

export default function CommitteePresidentList() {
  return (
    <DataTable
      title="সভাপতি তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১33333", year: "2020-2022" },
      ]}
    />
  );
}