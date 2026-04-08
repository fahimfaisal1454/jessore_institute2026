import CommitteeHistory from "../components/shared/CommitteeHistory";

export default function SportsOld() {
  return (
    <CommitteeHistory
      title="ক্রীড়া বিভাগ – প্রাক্তন"
      data={[
        { year: "2019-2022", file: "/pdfs/sports1.pdf" },
        { year: "2022-2025", file: "/pdfs/sports2.pdf" },
      ]}
    />
  );
}