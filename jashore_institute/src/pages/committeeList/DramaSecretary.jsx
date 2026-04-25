import DataTable from "../../components/shared/DataTable";

export default function DramaSecretary() {
  return (
    <DataTable
      title="নাট্যকলা সংসদের সম্পাদক তালিকাssss"
      columns={[
        {
          label: "ক্রমিক",
          render: (_, i) => i + 1,
          width: "70px",
          align: "text-center",
        },
        {
          label: "নাম",
          key: "name",
          width: "60%",
        },
        {
          label: "কার্যকাল",
          key: "year",
          width: "200px",
          align: "text-center",
        },
      ]}
      data={[
        { name: "নাম ১", year: "2020-2022" },
      ]}
    />
  );
}