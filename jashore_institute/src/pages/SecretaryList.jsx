import DataTable from "../components/shared/DataTable";

export default function SecretaryList() {
  const data = [
    { id: 1, name: "রায় বাহাদুর মুনশী মধুসূদন", year: "1928 - 1930" },
    { id: 2, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1931 - 1936" },
    { id: 3, name: "মি. বিজয় কুমার সরকার", year: "1936 - 1937" },
    { id: 4, name: "মি. কিশোর চন্দ্র দত্ত", year: "1937 - 1938" },
    { id: 5, name: "মি. বিজয় কুমার সরকার", year: "1938 - 1939" },
    { id: 6, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1939 - 1940" },
    { id: 7, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1940 - 1941" },
    { id: 8, name: "মি. কিশোর চন্দ্র দত্ত", year: "1941 - 1942" },
    { id: 9, name: "মি. নগেন্দ্রনাথ ঘোষ", year: "1942 - 1946" },
    { id: 10, name: "মি. বেণী মাধব মিত্র", year: "1946 - 1947" },
  ];

  return (
    <DataTable
      title="সাধারণ সম্পাদক তালিকা"
      columns={["ক্রমিক", "সাধারণ সম্পাদক", "কার্যকাল"]}
      data={data}
    />
  );
}