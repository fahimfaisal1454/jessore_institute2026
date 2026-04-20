import DataTable from "../../components/shared/DataTable";

export default function SportsSecretary() {
  return (
    <DataTable
      title="ক্রীড়া বিভাগের সম্পাদক তালিকা"
      columns={["ক্রমিক", "নাম", "কার্যকাল"]}
      data={[
        { name: "নাম ১", year: "2020-2022" },
      ]}
    />
  );
}