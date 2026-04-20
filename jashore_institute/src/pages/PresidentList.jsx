import DataTable from "../components/shared/DataTable";

export default function PresidentList() {
  const data = [
    { id: 1, name: "Mr. A. S. Larkin", year: "1928 - 1929" },
    { id: 2, name: "Mr. S. C. Ghatak", year: "1929 - 11/29" },
    { id: 3, name: "Mr. A. S. Larkin", year: "1929 - 1931" },
    { id: 4, name: "Mr. S.K. Ghosh", year: "1931 - 5/31" },
    { id: 5, name: "Mr. K. G. Morshed", year: "1931 - 1932" },
    { id: 6, name: "Mr. N. K. Sen", year: "1932 - 1935" },
    { id: 7, name: "Mr. M. F. Karim", year: "1935 - 1936" },
    { id: 8, name: "Mr. S. Datta", year: "1936 - 1936" },
    { id: 9, name: "Mr. P. D. Martyn", year: "1936 - 1939" },
    { id: 10, name: "Mr. N. C. Bose", year: "1939 - 1939" },
  ];

  return (
    <DataTable
      title="সভাপতি গণের তালিকা"
      columns={["ক্রমিক", "সভাপতি", "কার্যকাল"]}
      data={data}
    />
  );
}