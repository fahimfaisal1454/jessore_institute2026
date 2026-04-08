import CommitteeHistory from "../components/shared/CommitteeHistory";

export default function DramaOld() {
  return (
    <CommitteeHistory
      title="নাট্যকলা সংসদ – প্রাক্তন"
      data={[
        { year: "2018-2021", file: "/pdfs/drama1.pdf" },
        { year: "2021-2024", file: "/pdfs/drama2.pdf" },
      ]}
    />
  );
}